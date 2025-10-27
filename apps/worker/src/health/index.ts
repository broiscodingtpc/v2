import { config } from '@/config';
import { logger } from '@/utils/logger';
import { db } from '@/database';
import { dexScreenerService } from '@/services/dexscreener';
import { twitterService } from '@/services/twitter';
import { aiService } from '@/services/ai';
import { getQueueStats } from '@/jobs';
import { HealthStatus, HealthMetric } from '@/types';

export class HealthMonitor {
  private healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date(),
    services: {},
    metrics: {},
  };

  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.startMonitoring();
  }

  // Start health monitoring
  startMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(
      () => this.performHealthCheck(),
      config.monitoring.healthCheckInterval
    );

    logger.info('Health monitoring started', {
      interval: config.monitoring.healthCheckInterval,
    });
  }

  // Stop health monitoring
  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info('Health monitoring stopped');
    }
  }

  // Perform comprehensive health check
  async performHealthCheck(): Promise<HealthStatus> {
    const startTime = Date.now();
    
    try {
      logger.debug('Starting health check');

      // Check all services in parallel
      const [
        databaseHealth,
        dexScreenerHealth,
        twitterHealth,
        aiHealth,
        queueHealth,
        systemHealth,
      ] = await Promise.allSettled([
        this.checkDatabase(),
        this.checkDexScreener(),
        this.checkTwitter(),
        this.checkAI(),
        this.checkQueues(),
        this.checkSystem(),
      ]);

      // Process results
      const services = {
        database: this.processHealthResult(databaseHealth),
        dexscreener: this.processHealthResult(dexScreenerHealth),
        twitter: this.processHealthResult(twitterHealth),
        ai: this.processHealthResult(aiHealth),
        queues: this.processHealthResult(queueHealth),
        system: this.processHealthResult(systemHealth),
      };

      // Calculate overall status
      const overallStatus = this.calculateOverallStatus(services);
      
      // Get system metrics
      const metrics = await this.getSystemMetrics();

      this.healthStatus = {
        status: overallStatus,
        timestamp: new Date(),
        services,
        metrics,
        responseTime: Date.now() - startTime,
      };

      // Log health status
      if (overallStatus !== 'healthy') {
        logger.warn('Health check completed with issues', {
          status: overallStatus,
          services,
          responseTime: this.healthStatus.responseTime,
        });
      } else {
        logger.debug('Health check completed successfully', {
          responseTime: this.healthStatus.responseTime,
        });
      }

      // Store health metrics in database
      await this.storeHealthMetrics();

      return this.healthStatus;
    } catch (error) {
      logger.error('Health check failed', { error });
      
      this.healthStatus = {
        status: 'unhealthy',
        timestamp: new Date(),
        services: {},
        metrics: {},
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime,
      };

      return this.healthStatus;
    }
  }

  // Check database health
  private async checkDatabase() {
    const startTime = Date.now();
    
    try {
      const isHealthy = await db.healthCheck();
      const stats = await db.getStats();
      
      return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        responseTime: Date.now() - startTime,
        details: stats,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Database check failed',
      };
    }
  }

  // Check DexScreener API health
  private async checkDexScreener() {
    const startTime = Date.now();
    
    try {
      const isHealthy = await dexScreenerService.healthCheck();
      
      return {
        status: isHealthy ? 'healthy' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'DexScreener check failed',
      };
    }
  }

  // Check Twitter API health
  private async checkTwitter() {
    const startTime = Date.now();
    
    try {
      const isHealthy = await twitterService.healthCheck();
      
      return {
        status: isHealthy ? 'healthy' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Twitter check failed',
      };
    }
  }

  // Check AI services health
  private async checkAI() {
    const startTime = Date.now();
    
    try {
      const status = await aiService.getStatus();
      const isHealthy = status.groq.status === 'healthy' && status.gemini.status === 'healthy';
      
      return {
        status: isHealthy ? 'healthy' : 'degraded',
        responseTime: Date.now() - startTime,
        details: status,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'AI services check failed',
      };
    }
  }

  // Check job queues health
  private async checkQueues() {
    const startTime = Date.now();
    
    try {
      const stats = await getQueueStats();
      const hasFailedJobs = Object.values(stats).some(queue => queue.failed > 0);
      
      return {
        status: hasFailedJobs ? 'degraded' : 'healthy',
        responseTime: Date.now() - startTime,
        details: stats,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Queue check failed',
      };
    }
  }

  // Check system resources
  private async checkSystem() {
    const startTime = Date.now();
    
    try {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();
      const uptime = process.uptime();

      // Convert to MB
      const memoryMB = {
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
      };

      // Check if memory usage is too high (>80% of heap)
      const memoryUsagePercent = (memoryMB.heapUsed / memoryMB.heapTotal) * 100;
      const status = memoryUsagePercent > 80 ? 'degraded' : 'healthy';

      return {
        status,
        responseTime: Date.now() - startTime,
        details: {
          memory: memoryMB,
          memoryUsagePercent: Math.round(memoryUsagePercent),
          cpu: cpuUsage,
          uptime: Math.round(uptime),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'System check failed',
      };
    }
  }

  // Process health check result
  private processHealthResult(result: PromiseSettledResult<any>) {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        status: 'unhealthy' as const,
        error: result.reason?.message || 'Health check failed',
      };
    }
  }

  // Calculate overall health status
  private calculateOverallStatus(services: Record<string, any>): 'healthy' | 'degraded' | 'unhealthy' {
    const statuses = Object.values(services).map(service => service.status);
    
    if (statuses.includes('unhealthy')) {
      return 'unhealthy';
    } else if (statuses.includes('degraded')) {
      return 'degraded';
    } else {
      return 'healthy';
    }
  }

  // Get system metrics
  private async getSystemMetrics(): Promise<Record<string, HealthMetric>> {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    return {
      memoryUsed: {
        value: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        unit: 'MB',
        status: memoryUsage.heapUsed / memoryUsage.heapTotal > 0.8 ? 'critical' : 'healthy',
      },
      memoryTotal: {
        value: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        unit: 'MB',
        status: 'healthy',
      },
      uptime: {
        value: Math.round(process.uptime()),
        unit: 'seconds',
        status: 'healthy',
      },
      cpuUser: {
        value: Math.round(cpuUsage.user / 1000),
        unit: 'ms',
        status: 'healthy',
      },
      cpuSystem: {
        value: Math.round(cpuUsage.system / 1000),
        unit: 'ms',
        status: 'healthy',
      },
    };
  }

  // Store health metrics in database
  private async storeHealthMetrics() {
    try {
      const metrics = this.healthStatus.metrics;
      if (!metrics) return;

      const healthMetrics = Object.entries(metrics).map(([metric, data]) => ({
        service: 'worker',
        metric,
        value: data.value,
        unit: data.unit,
        status: data.status,
        timestamp: new Date(),
      }));

      // Store in batches to avoid overwhelming the database
      for (const metric of healthMetrics) {
        await db.healthMetric.create({ data: metric });
      }
    } catch (error) {
      logger.error('Failed to store health metrics', { error });
    }
  }

  // Get current health status
  getHealthStatus(): HealthStatus {
    return this.healthStatus;
  }

  // Get health summary
  getHealthSummary() {
    return {
      status: this.healthStatus.status,
      timestamp: this.healthStatus.timestamp,
      responseTime: this.healthStatus.responseTime,
      servicesHealthy: Object.values(this.healthStatus.services || {})
        .filter(service => service.status === 'healthy').length,
      totalServices: Object.keys(this.healthStatus.services || {}).length,
    };
  }
}

// Create singleton instance
export const healthMonitor = new HealthMonitor();

// Health check endpoint handler
export async function handleHealthCheck() {
  try {
    const health = await healthMonitor.performHealthCheck();
    return {
      status: health.status === 'healthy' ? 200 : health.status === 'degraded' ? 503 : 500,
      data: health,
    };
  } catch (error) {
    logger.error('Health check endpoint failed', { error });
    return {
      status: 500,
      data: {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Health check failed',
        timestamp: new Date(),
      },
    };
  }
}

export default healthMonitor;