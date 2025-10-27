import 'dotenv/config';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import { connectDatabase, disconnectDatabase } from '@/database';
import { healthMonitor } from '@/health';
import { 
  initializeQueues, 
  scheduleRecurringJobs, 
  gracefulShutdown as shutdownQueues,
  addTokenDataJob,
  addSocialDataJob,
  addAIAnalysisJob,
  addSignalGenerationJob,
  addCleanupJob
} from '@/jobs';
import express from 'express';
import cors from 'cors';

class WorkerService {
  private app: express.Application;
  private server: any;
  private isShuttingDown = false;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  // Setup Express middleware
  private setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging middleware
    this.app.use((req, res, next) => {
      logger.info('HTTP Request', {
        method: req.method,
        url: req.url,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
      });
      next();
    });
  }

  // Setup API routes
  private setupRoutes() {
    // Health check endpoint
    this.app.get('/health', async (req, res) => {
      try {
        const health = await healthMonitor.performHealthCheck();
        const statusCode = health.status === 'healthy' ? 200 : 
                          health.status === 'degraded' ? 503 : 500;
        
        res.status(statusCode).json(health);
      } catch (error) {
        logger.error('Health check endpoint failed', { error });
        res.status(500).json({
          status: 'unhealthy',
          error: 'Health check failed',
          timestamp: new Date(),
        });
      }
    });

    // Health summary endpoint
    this.app.get('/health/summary', (req, res) => {
      try {
        const summary = healthMonitor.getHealthSummary();
        res.json(summary);
      } catch (error) {
        logger.error('Health summary endpoint failed', { error });
        res.status(500).json({
          error: 'Failed to get health summary',
          timestamp: new Date(),
        });
      }
    });

    // Manual job triggers (for debugging/testing)
    if (config.nodeEnv === 'development') {
      this.app.post('/jobs/token-data', async (req, res) => {
        try {
          await addTokenDataJob({ type: 'popular' });
          res.json({ message: 'Token data job added' });
        } catch (error) {
          logger.error('Failed to add token data job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/social-data', async (req, res) => {
        try {
          await addSocialDataJob({ type: 'trending' });
          res.json({ message: 'Social data job added' });
        } catch (error) {
          logger.error('Failed to add social data job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/ai-analysis', async (req, res) => {
        try {
          await addAIAnalysisJob({ type: 'comprehensive' });
          res.json({ message: 'AI analysis job added' });
        } catch (error) {
          logger.error('Failed to add AI analysis job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/signals', async (req, res) => {
        try {
          await addSignalGenerationJob({});
          res.json({ message: 'Signal generation job added' });
        } catch (error) {
          logger.error('Failed to add signal generation job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/cleanup', async (req, res) => {
        try {
          await addCleanupJob({ type: 'full' });
          res.json({ message: 'Cleanup job added' });
        } catch (error) {
          logger.error('Failed to add cleanup job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });
    }

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found',
        timestamp: new Date(),
      });
    });
  }

  // Setup error handling
  private setupErrorHandling() {
    // Global error handler
    this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error('Unhandled HTTP error', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
      });

      res.status(500).json({
        error: 'Internal Server Error',
        message: config.nodeEnv === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date(),
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
      this.gracefulShutdown('SIGTERM');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection', { reason, promise });
      this.gracefulShutdown('SIGTERM');
    });

    // Handle process signals
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));
  }

  // Initialize all services
  async initialize() {
    try {
      logger.info('Initializing MetaPulse Worker Service', {
        nodeEnv: config.nodeEnv,
        version: process.env.npm_package_version || '1.0.0',
      });

      // Connect to database
      logger.info('Connecting to database...');
      await connectDatabase();
      logger.info('Database connected successfully');

      // Initialize job queues
      logger.info('Initializing job queues...');
      await initializeQueues();
      logger.info('Job queues initialized successfully');

      // Schedule recurring jobs
      if (config.jobs.enableScheduledJobs) {
        logger.info('Scheduling recurring jobs...');
        await scheduleRecurringJobs();
        logger.info('Recurring jobs scheduled successfully');
      }

      // Start health monitoring
      logger.info('Starting health monitoring...');
      healthMonitor.startMonitoring();
      logger.info('Health monitoring started');

      // Start HTTP server
      await this.startServer();

      logger.info('MetaPulse Worker Service initialized successfully', {
        port: config.server.port,
        host: config.server.host,
      });

      // Add initial jobs to kickstart the system
      await this.addInitialJobs();

    } catch (error) {
      logger.error('Failed to initialize worker service', { error });
      throw error;
    }
  }

  // Start HTTP server
  private async startServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(config.server.port, config.server.host, () => {
        logger.info('HTTP server started', {
          port: config.server.port,
          host: config.server.host,
        });
        resolve();
      });

      this.server.on('error', (error: any) => {
        logger.error('HTTP server error', { error });
        reject(error);
      });
    });
  }

  // Add initial jobs to kickstart the system
  private async addInitialJobs() {
    try {
      logger.info('Adding initial jobs...');

      // Add token data collection job
      await addTokenDataJob({ type: 'popular' });
      
      // Add social data collection job
      await addSocialDataJob({ type: 'trending' });
      
      // Add AI analysis job
      await addAIAnalysisJob({ type: 'comprehensive' });

      logger.info('Initial jobs added successfully');
    } catch (error) {
      logger.error('Failed to add initial jobs', { error });
      // Don't throw here, let the service continue
    }
  }

  // Graceful shutdown
  async gracefulShutdown(signal: string) {
    if (this.isShuttingDown) {
      logger.warn('Shutdown already in progress, forcing exit...');
      process.exit(1);
    }

    this.isShuttingDown = true;
    logger.info(`Received ${signal}, starting graceful shutdown...`);

    const shutdownTimeout = setTimeout(() => {
      logger.error('Graceful shutdown timeout, forcing exit');
      process.exit(1);
    }, 30000); // 30 second timeout

    try {
      // Stop accepting new requests
      if (this.server) {
        logger.info('Closing HTTP server...');
        await new Promise<void>((resolve) => {
          this.server.close(() => {
            logger.info('HTTP server closed');
            resolve();
          });
        });
      }

      // Stop health monitoring
      logger.info('Stopping health monitoring...');
      healthMonitor.stopMonitoring();

      // Shutdown job queues
      logger.info('Shutting down job queues...');
      await shutdownQueues();
      logger.info('Job queues shut down');

      // Disconnect from database
      logger.info('Disconnecting from database...');
      await disconnectDatabase();
      logger.info('Database disconnected');

      clearTimeout(shutdownTimeout);
      logger.info('Graceful shutdown completed');
      process.exit(0);

    } catch (error) {
      logger.error('Error during graceful shutdown', { error });
      clearTimeout(shutdownTimeout);
      process.exit(1);
    }
  }
}

// Create and start the worker service
async function main() {
  try {
    const workerService = new WorkerService();
    await workerService.initialize();
  } catch (error) {
    logger.error('Failed to start worker service', { error });
    process.exit(1);
  }
}

// Start the service
if (require.main === module) {
  main().catch((error) => {
    logger.error('Unhandled error in main', { error });
    process.exit(1);
  });
}

export default WorkerService;