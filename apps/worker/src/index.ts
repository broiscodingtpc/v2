import 'dotenv/config';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { connectDatabase, disconnectDatabase } from '@/database';
import { healthMonitor } from '@/health';
import { 
  initializeJobProcessors, 
  scheduleRecurringJobs, 
  addTokenDataJob,
  addSocialDataJob,
  addAIAnalysisJob,
  addSignalGenerationJob,
  addCleanupJob,
  shutdownQueues
} from '@/jobs';
import express from 'express';
import cors from 'cors';

class WorkerService {
  private logger = createLogger('worker');
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
    this.app.use((req, _res, next) => {
      this.logger.info('HTTP Request', {
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
    this.app.get('/health', async (_req, res) => {
      try {
        const health = await healthMonitor.performHealthCheck();
        const statusCode = health.status === 'healthy' ? 200 : 
                          health.status === 'degraded' ? 503 : 500;
        
        res.status(statusCode).json(health);
      } catch (error) {
        this.logger.error('Health check endpoint failed', { error });
        res.status(500).json({
          status: 'unhealthy',
          error: 'Health check failed',
          timestamp: new Date(),
        });
      }
    });

    // Health summary endpoint
    this.app.get('/health/summary', (_req, res) => {
      try {
        const summary = healthMonitor.getHealthSummary();
        res.json(summary);
      } catch (error) {
        this.logger.error('Health summary endpoint failed', { error });
        res.status(500).json({
          error: 'Failed to get health summary',
          timestamp: new Date(),
        });
      }
    });

    // Manual job triggers (for debugging/testing)
    if (config.NODE_ENV === 'development') {
      this.app.post('/jobs/token-data', async (req, res) => {
        try {
          const { tokenAddresses = [], network = 'solana', priority = 0, delay = 0 } = (req.body || {});
          await addTokenDataJob(tokenAddresses, network, priority, delay);
          res.json({ message: 'Token data job added', tokenCount: tokenAddresses.length, network });
        } catch (error) {
          this.logger.error('Failed to add token data job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/social-data', async (req, res) => {
        try {
          const { tokens = [], platform = 'twitter', keywords = [], priority = 0, delay = 0 } = (req.body || {});
          await addSocialDataJob(tokens, platform, keywords, priority, delay);
          res.json({ message: 'Social data job added', tokenCount: tokens.length, platform, keywords });
        } catch (error) {
          this.logger.error('Failed to add social data job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/ai-analysis', async (req, res) => {
        try {
          const { tokenId, analysisType = 'technical', data = {}, priority = 0, delay = 0 } = (req.body || {});
          if (!tokenId) {
            res.status(400).json({ error: 'tokenId is required' });
            return;
          }
          const allowedTypes = ['technical', 'fundamental', 'sentiment', 'social'] as const;
          const safeType = allowedTypes.includes(analysisType as any)
            ? (analysisType as typeof allowedTypes[number])
            : 'technical';
          await addAIAnalysisJob(tokenId, safeType, data, priority, delay);
          res.json({ message: 'AI analysis job added', tokenId, analysisType });
        } catch (error) {
          this.logger.error('Failed to add AI analysis job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/signals', async (req, res) => {
        try {
          const { tokenId, analyses = [], marketData = {}, socialData = [], priority = 1, delay = 0 } = (req.body || {});
          if (!tokenId) {
            res.status(400).json({ error: 'tokenId is required' });
            return;
          }
          await addSignalGenerationJob(tokenId, analyses, marketData, socialData, priority, delay);
          res.json({ message: 'Signal generation job added', tokenId });
        } catch (error) {
          this.logger.error('Failed to add signal generation job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });

      this.app.post('/jobs/cleanup', async (req, res) => {
        try {
          const { type = 'old_data', olderThanDays = 30, priority = -1 } = (req.body || {});
          const allowedTypes = ['old_data', 'expired_signals', 'logs'] as const;
          if (!allowedTypes.includes(type as any)) {
            res.status(400).json({ error: `type must be one of ${allowedTypes.join(', ')}` });
            return;
          }
          const safeType = type as typeof allowedTypes[number];
          await addCleanupJob(safeType, olderThanDays, priority);
          res.json({ message: 'Cleanup job added', type, olderThanDays });
        } catch (error) {
          this.logger.error('Failed to add cleanup job', { error });
          res.status(500).json({ error: 'Failed to add job' });
        }
      });
    }

    // 404 handler
    this.app.use('*', (_req, res) => {
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
    this.app.use((error: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
      this.logger.error('Unhandled HTTP error', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
      });

      res.status(500).json({
        error: 'Internal Server Error',
        message: config.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date(),
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      this.logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
      this.gracefulShutdown('SIGTERM');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error('Unhandled Rejection', { reason, promise });
      this.gracefulShutdown('SIGTERM');
    });

    // Handle process signals
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));
  }

  // Initialize all services
  async initialize() {
    try {
      this.logger.info('Initializing MetaPulse Worker Service', {
        nodeEnv: config.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0',
      });

      // Connect to database
      this.logger.info('Connecting to database...');
      await connectDatabase();
      this.logger.info('Database connected successfully');

      // Initialize job queues
      this.logger.info('Initializing job queues...');
      await initializeJobProcessors();
      this.logger.info('Job queues initialized successfully');

      // Schedule recurring jobs
      this.logger.info('Scheduling recurring jobs...');
      await scheduleRecurringJobs();
      this.logger.info('Recurring jobs scheduled successfully');

      // Start health monitoring
      this.logger.info('Starting health monitoring...');
      healthMonitor.startMonitoring();
      this.logger.info('Health monitoring started');

      // Start HTTP server
      await this.startServer();

      this.logger.info('MetaPulse Worker Service initialized successfully', {
        port: config.PORT,
      });

      // Add initial jobs to kickstart the system
      await this.addInitialJobs();

    } catch (error) {
      this.logger.error('Failed to initialize worker service', { error });
      throw error;
    }
  }

  // Start HTTP server
  private async startServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(config.PORT, () => {
        this.logger.info('HTTP server started', {
          port: config.PORT,
        });
        resolve();
      });

      this.server.on('error', (error: any) => {
        this.logger.error('HTTP server error', { error });
        reject(error);
      });
    });
  }

  // Add initial jobs to kickstart the system
  private async addInitialJobs() {
    try {
      this.logger.info('Adding initial jobs...');

      // Add token data collection job
      await addTokenDataJob([], 'solana');
      
      // Add social data collection job
      await addSocialDataJob([], 'twitter', []);
      
      // Add AI analysis job
      // Skipping initial AI analysis job due to missing tokenId context

      this.logger.info('Initial jobs added successfully');
    } catch (error) {
      this.logger.error('Failed to add initial jobs', { error });
      // Don't throw here, let the service continue
    }
  }

  // Graceful shutdown
  async gracefulShutdown(signal: string) {
    if (this.isShuttingDown) {
      this.logger.warn('Shutdown already in progress, forcing exit...');
      process.exit(1);
    }

    this.isShuttingDown = true;
    this.logger.info(`Received ${signal}, starting graceful shutdown...`);

    const shutdownTimeout = setTimeout(() => {
      this.logger.error('Graceful shutdown timeout, forcing exit');
      process.exit(1);
    }, 30000); // 30 second timeout

    try {
      // Stop accepting new requests
      if (this.server) {
        this.logger.info('Closing HTTP server...');
        await new Promise<void>((resolve) => {
          this.server.close(() => {
            this.logger.info('HTTP server closed');
            resolve();
          });
        });
      }

      // Stop health monitoring
      this.logger.info('Stopping health monitoring...');
      healthMonitor.stopMonitoring();

      // Shutdown job queues
      this.logger.info('Shutting down job queues...');
      await shutdownQueues();
      this.logger.info('Job queues shut down');

      // Disconnect from database
      this.logger.info('Disconnecting from database...');
      await disconnectDatabase();
      this.logger.info('Database disconnected');

      clearTimeout(shutdownTimeout);
      this.logger.info('Graceful shutdown completed');
      process.exit(0);

    } catch (error) {
      this.logger.error('Error during graceful shutdown', { error });
      clearTimeout(shutdownTimeout);
      process.exit(1);
    }
  }
}

// Create and start the worker service
async function main() {
  const logger = createLogger('main');
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
    const logger = createLogger('main');
    logger.error('Unhandled error in main', { error });
    process.exit(1);
  });
}

export default WorkerService;
