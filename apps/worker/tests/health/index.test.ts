import { HealthMonitor, healthMonitor, handleHealthCheck } from '@/health';
import { db } from '@/database';
import { dexScreenerService } from '@/services/dexscreener';
import { twitterService } from '@/services/twitter';
import { aiService } from '@/services/ai';
import { jobQueues } from '@/jobs';

// Mock all dependencies
jest.mock('@/database');
jest.mock('@/services/dexscreener');
jest.mock('@/services/twitter');
jest.mock('@/services/ai');
jest.mock('@/jobs');

const mockDb = db as jest.Mocked<typeof db>;
const mockDexScreenerService = dexScreenerService as jest.Mocked<typeof dexScreenerService>;
const mockTwitterService = twitterService as jest.Mocked<typeof twitterService>;
const mockAiService = aiService as jest.Mocked<typeof aiService>;
const mockJobQueues = jobQueues as jest.Mocked<typeof jobQueues>;

describe('Health Monitor', () => {
  let monitor: HealthMonitor;

  beforeEach(() => {
    jest.clearAllMocks();
    monitor = new HealthMonitor();
  });

  afterEach(async () => {
    await monitor.stop();
  });

  describe('HealthMonitor', () => {
    it('should start monitoring successfully', async () => {
      // Arrange
      const startSpy = jest.spyOn(monitor, 'start');

      // Act
      await monitor.start();

      // Assert
      expect(startSpy).toHaveBeenCalled();
      expect(monitor.isRunning()).toBe(true);
    });

    it('should stop monitoring successfully', async () => {
      // Arrange
      await monitor.start();
      const stopSpy = jest.spyOn(monitor, 'stop');

      // Act
      await monitor.stop();

      // Assert
      expect(stopSpy).toHaveBeenCalled();
      expect(monitor.isRunning()).toBe(false);
    });

    it('should perform comprehensive health check', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(true);
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 5,
          active: 2,
          completed: 100,
          failed: 1,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 3,
          active: 1,
          completed: 50,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 2,
          active: 0,
          completed: 25,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 1,
          active: 0,
          completed: 15,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 5,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.overallStatus).toBe('healthy');
      expect(result.components).toHaveProperty('database');
      expect(result.components).toHaveProperty('dexscreener');
      expect(result.components).toHaveProperty('twitter');
      expect(result.components).toHaveProperty('ai');
      expect(result.components).toHaveProperty('jobQueues');
      expect(result.components).toHaveProperty('system');
    });

    it('should detect database health issues', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockRejectedValue(new Error('Database connection failed'));

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.components.database.status).toBe('unhealthy');
      expect(result.components.database.error).toContain('Database connection failed');
    });

    it('should detect external service health issues', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(false);
      mockTwitterService.healthCheck = jest.fn().mockRejectedValue(new Error('Twitter API error'));
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.components.dexscreener.status).toBe('unhealthy');
      expect(result.components.twitter.status).toBe('unhealthy');
      expect(result.components.twitter.error).toContain('Twitter API error');
      expect(result.components.ai.status).toBe('healthy');
    });

    it('should detect job queue health issues', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(true);
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      // Mock high failure rate
      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 5,
          active: 2,
          completed: 10,
          failed: 50, // High failure rate
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 100, // High queue backlog
          active: 1,
          completed: 50,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 2,
          active: 0,
          completed: 25,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 1,
          active: 0,
          completed: 15,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 5,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.components.jobQueues.status).toBe('degraded');
      expect(result.components.jobQueues.details).toHaveProperty('tokenData');
      expect(result.components.jobQueues.details).toHaveProperty('socialData');
    });

    it('should calculate overall status correctly', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(false); // Unhealthy
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 5,
          active: 2,
          completed: 100,
          failed: 1,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 3,
          active: 1,
          completed: 50,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 2,
          active: 0,
          completed: 25,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 1,
          active: 0,
          completed: 15,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 5,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.overallStatus).toBe('degraded'); // One unhealthy component
    });

    it('should get system metrics correctly', () => {
      // Act
      const metrics = monitor.getSystemMetrics();

      // Assert
      expect(metrics).toHaveProperty('memory');
      expect(metrics).toHaveProperty('cpu');
      expect(metrics).toHaveProperty('uptime');
      expect(metrics.memory).toHaveProperty('used');
      expect(metrics.memory).toHaveProperty('total');
      expect(metrics.memory).toHaveProperty('percentage');
    });

    it('should get health status correctly', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(true);
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 5,
          active: 2,
          completed: 100,
          failed: 1,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 3,
          active: 1,
          completed: 50,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 2,
          active: 0,
          completed: 25,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 1,
          active: 0,
          completed: 15,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 5,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      const status = await monitor.getHealthStatus();

      // Assert
      expect(status).toHaveProperty('status');
      expect(status).toHaveProperty('timestamp');
      expect(status).toHaveProperty('components');
      expect(status).toHaveProperty('system');
    });

    it('should get health summary correctly', async () => {
      // Arrange
      mockDb.healthMetric.findMany = jest.fn().mockResolvedValue([
        {
          id: '1',
          component: 'database',
          status: 'healthy',
          responseTime: 50,
          details: {},
          createdAt: new Date(Date.now() - 60000), // 1 minute ago
        },
        {
          id: '2',
          component: 'dexscreener',
          status: 'healthy',
          responseTime: 200,
          details: {},
          createdAt: new Date(Date.now() - 120000), // 2 minutes ago
        },
      ]);

      // Act
      const summary = await monitor.getHealthSummary();

      // Assert
      expect(summary).toHaveProperty('currentStatus');
      expect(summary).toHaveProperty('recentMetrics');
      expect(summary).toHaveProperty('averageResponseTimes');
      expect(summary).toHaveProperty('uptimePercentage');
      expect(summary.recentMetrics).toHaveLength(2);
    });

    it('should handle errors in health check gracefully', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockRejectedValue(new Error('Database error'));
      mockDexScreenerService.healthCheck = jest.fn().mockRejectedValue(new Error('API error'));
      mockTwitterService.healthCheck = jest.fn().mockRejectedValue(new Error('Twitter error'));
      mockAiService.healthCheck = jest.fn().mockRejectedValue(new Error('AI error'));

      // Act
      const result = await monitor.performHealthCheck();

      // Assert
      expect(result.overallStatus).toBe('unhealthy');
      expect(result.components.database.status).toBe('unhealthy');
      expect(result.components.dexscreener.status).toBe('unhealthy');
      expect(result.components.twitter.status).toBe('unhealthy');
      expect(result.components.ai.status).toBe('unhealthy');
    });

    it('should store health metrics in database', async () => {
      // Arrange
      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(true);
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      await monitor.performHealthCheck();

      // Assert
      expect(mockDb.healthMetric.create).toHaveBeenCalledTimes(6); // One for each component
    });
  });

  describe('handleHealthCheck', () => {
    it('should handle health check endpoint successfully', async () => {
      // Arrange
      const mockReq = {} as any;
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      mockDb.healthMetric.create = jest.fn().mockResolvedValue({
        id: 'test-health-id',
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {},
        createdAt: new Date(),
      });

      mockDexScreenerService.healthCheck = jest.fn().mockResolvedValue(true);
      mockTwitterService.healthCheck = jest.fn().mockResolvedValue(true);
      mockAiService.healthCheck = jest.fn().mockResolvedValue(true);

      mockJobQueues.tokenData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.socialData = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.aiAnalysis = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.signalGeneration = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      mockJobQueues.cleanup = {
        getJobCounts: jest.fn().mockResolvedValue({
          waiting: 0,
          active: 0,
          completed: 10,
          failed: 0,
          delayed: 0,
        }),
      } as any;

      // Act
      await handleHealthCheck(mockReq, mockRes);

      // Assert
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'healthy',
          timestamp: expect.any(String),
          components: expect.any(Object),
          system: expect.any(Object),
        })
      );
    });

    it('should handle health check errors', async () => {
      // Arrange
      const mockReq = {} as any;
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      // Mock all services to fail
      mockDb.healthMetric.create = jest.fn().mockRejectedValue(new Error('Database error'));
      mockDexScreenerService.healthCheck = jest.fn().mockRejectedValue(new Error('API error'));
      mockTwitterService.healthCheck = jest.fn().mockRejectedValue(new Error('Twitter error'));
      mockAiService.healthCheck = jest.fn().mockRejectedValue(new Error('AI error'));

      // Act
      await handleHealthCheck(mockReq, mockRes);

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(503);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'unhealthy',
        })
      );
    });
  });

  describe('Singleton healthMonitor', () => {
    it('should export a singleton instance', () => {
      expect(healthMonitor).toBeInstanceOf(HealthMonitor);
    });

    it('should be the same instance when imported multiple times', () => {
      const { healthMonitor: healthMonitor2 } = require('@/health');
      expect(healthMonitor).toBe(healthMonitor2);
    });
  });
});