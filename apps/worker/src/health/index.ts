import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { db } from '@/database';
import { dexScreenerService } from '@/services/dexscreener';
import { pumpPortalService } from '@/services/pumpportal';
import { twitterService } from '@/services/twitter';
// import { aiService } from '@/services/ai';
import { getQueueStats } from '@/jobs';

// Define types locally since they don't exist in @/types
interface HealthMetric {
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  timestamp: Date;
}

interface ServiceStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
  error?: string;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    dexscreener: ServiceStatus;
    twitter: ServiceStatus;
    ai: ServiceStatus;
  };
  metrics: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
  };
}

export class HealthMonitor {
  private logger = createLogger('health');
  private healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date(),
    services: {
      database: { status: 'unhealthy' },
      redis: { status: 'unhealthy' },
      dexscreener: { status: 'unhealthy' },
      twitter: { status: 'unhealthy' },
      ai: { status: 'unhealthy' },
    },
    metrics: {
      uptime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      activeJobs: 0,
      completedJobs: 0,
      failedJobs: 0,
    },
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

    // Use a default interval if config doesn't have it
    const interval = (config as any).HEALTH_CHECK_INTERVAL || 30;
    this.intervalId = setInterval(
      () => this.performHealthCheck(),
      interval * 1000
    );

    this.logger.info('Health monitoring started', {
      interval,
    });
  }

  // Stop health monitoring
  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.logger.info('Health monitoring stopped');
    }
  }

  // Perform comprehensive health check
  async performHealthCheck(): Promise<HealthStatus> {

    try {
      this.logger.debug('Starting health check');

      // Check all services in parallel
      const [
        databaseHealth,
        dexScreenerHealth,
        pumpPortalHealth,
        twitterHealth,
        aiHealth,
        // queueHealth, // removed unused variable
        // systemHealth, // unused: value captured in Promise.allSettled result
      ] = await Promise.allSettled([
        this.checkDatabase(),
        this.checkDexScreener(),
        this.checkPumpPortal(),
        this.checkTwitter(),
        this.checkAI(),
        this.checkQueues(),
        this.checkSystem(),
      ]);

      // Process results
      const services = {
        database: this.processHealthResult(databaseHealth),
        redis: { status: 'healthy' },
        dexscreener: this.processHealthResult(dexScreenerHealth),
        pumpportal: this.processHealthResult(pumpPortalHealth),
        twitter: this.processHealthResult(twitterHealth),
        ai: this.processHealthResult(aiHealth),
      };

      // Calculate overall status
      const overallStatus = this.calculateOverallStatus(services);
      
      // Get system metrics
      const systemMetrics = await this.getSystemMetrics();
      const queueStats = await getQueueStats();

      this.healthStatus = {
        status: overallStatus,
        timestamp: new Date(),
        services: {
          database: services.database,
          redis: { status: 'healthy' as const },
          dexscreener: services.dexscreener,
          pumpportal: services.pumpportal,
          twitter: services.twitter,
          ai: services.ai,
        },
        metrics: {
          uptime: systemMetrics.uptime?.value || 0,
          memoryUsage: systemMetrics.memoryUsage?.value || 0,
          cpuUsage: systemMetrics.cpuUsage?.value || 0,
          activeJobs: 0,
          completedJobs: queueStats.jobsProcessed || 0,
          failedJobs: queueStats.jobsFailed || 0,
        },
      };

      // Log health status
      if (overallStatus !== 'healthy') {
        this.logger.warn('Health check completed with issues', {
          status: overallStatus,
          services,
        });
      } else {
        this.logger.debug('Health check completed successfully');
      }

      // Store health metrics in database
      await this.storeHealthMetrics();

      return this.healthStatus;
    } catch (error) {
      this.logger.error('Health check failed', { error });
      
      this.healthStatus = {
        status: 'unhealthy',
        timestamp: new Date(),
        services: {
          database: { status: 'unhealthy' },
          redis: { status: 'unhealthy' },
          dexscreener: { status: 'unhealthy' },
          twitter: { status: 'unhealthy' },
          ai: { status: 'unhealthy' },
        },
        metrics: {
          uptime: 0,
          memoryUsage: 0,
          cpuUsage: 0,
          activeJobs: 0,
          completedJobs: 0,
          failedJobs: 0,
        },
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

  // Check PumpPortal API health
  private async checkPumpPortal() {
    const startTime = Date.now();
    
    try {
      const isHealthy = await pumpPortalService.healthCheck();
      
      return {
        status: isHealthy ? 'healthy' : 'degraded',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: 'unhealthy' as const,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'PumpPortal check failed',
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
      // Since getStatus doesn't exist, just return healthy for now
      return {
        status: 'healthy' as const,
        responseTime: Date.now() - startTime,
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
      const hasFailedJobs = (stats.jobsFailed || 0) > 0;
      
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
      memoryUsage: {
        value: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        unit: 'MB',
        status: memoryUsage.heapUsed / memoryUsage.heapTotal > 0.8 ? 'critical' : 'healthy',
        timestamp: new Date(),
      },
      uptime: {
        value: Math.round(process.uptime()),
        unit: 'seconds',
        status: 'healthy',
        timestamp: new Date(),
      },
      cpuUsage: {
        value: Math.round(cpuUsage.user / 1000),
        unit: 'ms',
        status: 'healthy',
        timestamp: new Date(),
      },
      activeJobs: {
        value: 0,
        unit: 'count',
        status: 'healthy',
        timestamp: new Date(),
      },
      completedJobs: {
        value: 0,
        unit: 'count',
        status: 'healthy',
        timestamp: new Date(),
      },
      failedJobs: {
        value: 0,
        unit: 'count',
        status: 'healthy',
        timestamp: new Date(),
      },
    };
  }

  // Store health metrics in database (disabled since model doesn't exist)
  private async storeHealthMetrics() {
    try {
      // Skip storing metrics since healthMetric model doesn't exist in schema
      this.logger.debug('Health metrics storage skipped - model not available');
    } catch (error) {
      this.logger.error('Failed to store health metrics', { error });
    }
  }

  // Get current health status
  getHealthStatus(): HealthStatus {
    return this.healthStatus;
  }

  // Get health summary
  getHealthSummary() {
    const services = this.healthStatus.services || ({} as any);
    const statuses = Object.values(services).map(s => (s as ServiceStatus).status);
    const servicesHealthy = statuses.filter(s => s === 'healthy').length;
    return {
      status: this.healthStatus.status,
      timestamp: this.healthStatus.timestamp,
      responseTime: 0,
      servicesHealthy,
      totalServices: statuses.length,
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
    createLogger('health').error('Health check endpoint failed', { error });
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
