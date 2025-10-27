import { processCleanupJob } from '@/jobs/processors/cleanup';
import { db } from '@/database';
import { config } from '@/config';

// Mock the database
jest.mock('@/database');

const mockDb = db as jest.Mocked<typeof db>;

describe('Cleanup Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processCleanupJob', () => {
    it('should clean expired signals successfully', async () => {
      // Arrange
      const jobData = {
        type: 'expired_signals' as const,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 10 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result).toEqual({
        cleaned: 10,
        errors: 0,
        details: {
          expiredSignals: 10,
        },
      });

      expect(mockDb.signal.deleteMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { expiresAt: { lt: expect.any(Date) } },
            { status: 'expired' },
          ],
        },
      });
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should clean old token metrics successfully', async () => {
      // Arrange
      const jobData = {
        type: 'old_metrics' as const,
        olderThanDays: 30,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 50 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result).toEqual({
        cleaned: 50,
        errors: 0,
        details: {
          oldTokenMetrics: 50,
        },
      });

      expect(mockDb.tokenMetrics.deleteMany).toHaveBeenCalledWith({
        where: {
          timestamp: {
            lt: expect.any(Date),
          },
        },
      });
    });

    it('should clean old social data successfully', async () => {
      // Arrange
      const jobData = {
        type: 'old_social_data' as const,
        olderThanDays: 7,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 25 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result).toEqual({
        cleaned: 25,
        errors: 0,
        details: {
          oldSocialData: 25,
        },
      });

      expect(mockDb.socialMetrics.deleteMany).toHaveBeenCalledWith({
        where: {
          timestamp: {
            lt: expect.any(Date),
          },
        },
      });
    });

    it('should clean old AI analyses successfully', async () => {
      // Arrange
      const jobData = {
        type: 'old_ai_analyses' as const,
        olderThanDays: 14,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.technicalAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 15 });
      mockDb.sentimentAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 12 });
      mockDb.aiAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 8 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result).toEqual({
        cleaned: 35, // 15 + 12 + 8
        errors: 0,
        details: {
          oldTechnicalAnalyses: 15,
          oldSentimentAnalyses: 12,
          oldAIAnalyses: 8,
        },
      });
    });

    it('should clean inactive tokens successfully', async () => {
      // Arrange
      const jobData = {
        type: 'inactive_tokens' as const,
        inactiveDays: 30,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock finding inactive tokens
      mockDb.token.findMany = jest.fn().mockResolvedValue([
        { address: '0x123', updatedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000) },
        { address: '0x456', updatedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) },
      ]);

      // Mock deletion counts
      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 5 });
      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 10 });
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 8 });
      mockDb.technicalAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 3 });
      mockDb.aiAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 2 });
      mockDb.token.deleteMany = jest.fn().mockResolvedValue({ count: 2 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(30); // Sum of all deletions
      expect(result.details.inactiveTokens).toBe(2);
    });

    it('should remove duplicate records successfully', async () => {
      // Arrange
      const jobData = {
        type: 'duplicates' as const,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock finding duplicates
      mockDb.$queryRaw = jest.fn()
        .mockResolvedValueOnce([{ id: 'dup1' }, { id: 'dup2' }]) // Token metrics duplicates
        .mockResolvedValueOnce([{ id: 'dup3' }]) // Social metrics duplicates
        .mockResolvedValueOnce([{ id: 'dup4' }, { id: 'dup5' }]); // Signal duplicates

      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 2 });
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 1 });
      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 2 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(5);
      expect(result.details.duplicateTokenMetrics).toBe(2);
      expect(result.details.duplicateSocialMetrics).toBe(1);
      expect(result.details.duplicateSignals).toBe(2);
    });

    it('should clean orphaned data successfully', async () => {
      // Arrange
      const jobData = {
        type: 'orphaned_data' as const,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock finding orphaned records
      mockDb.$queryRaw = jest.fn()
        .mockResolvedValueOnce([{ tokenAddress: '0x123' }]) // Orphaned metrics
        .mockResolvedValueOnce([{ tokenAddress: '0x456' }]) // Orphaned social
        .mockResolvedValueOnce([{ tokenAddress: '0x789' }]); // Orphaned signals

      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 5 });
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 3 });
      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 7 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(15);
      expect(result.details.orphanedTokenMetrics).toBe(5);
      expect(result.details.orphanedSocialMetrics).toBe(3);
      expect(result.details.orphanedSignals).toBe(7);
    });

    it('should perform database optimization successfully', async () => {
      // Arrange
      const jobData = {
        type: 'optimize_database' as const,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.$executeRaw = jest.fn().mockResolvedValue(1);

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(1);
      expect(result.details.optimized).toBe(true);
      expect(mockDb.$executeRaw).toHaveBeenCalledWith(
        expect.stringContaining('VACUUM ANALYZE')
      );
    });

    it('should handle comprehensive cleanup successfully', async () => {
      // Arrange
      const jobData = {
        type: 'comprehensive' as const,
        olderThanDays: 30,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock all cleanup operations
      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 10 });
      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 50 });
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 25 });
      mockDb.technicalAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 15 });
      mockDb.sentimentAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 12 });
      mockDb.aiAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 8 });
      mockDb.jobLog.deleteMany = jest.fn().mockResolvedValue({ count: 100 });
      mockDb.healthMetric.deleteMany = jest.fn().mockResolvedValue({ count: 200 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(420); // Sum of all deletions
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'expired_signals' as const,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.signal.deleteMany = jest.fn().mockRejectedValue(new Error('Database Error'));

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result).toEqual({
        cleaned: 0,
        errors: 1,
        details: {},
      });
    });

    it('should validate job data', async () => {
      // Arrange
      const invalidJobData = {
        type: 'invalid_type' as any,
      };

      const mockJob = {
        id: 'test-job-id',
        data: invalidJobData,
        progress: jest.fn(),
      } as any;

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.cleaned).toBe(0);
    });

    it('should respect configuration limits', async () => {
      // Arrange
      const jobData = {
        type: 'old_metrics' as const,
        olderThanDays: 1, // Very short retention
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock config to have minimum retention
      const originalConfig = config.cleanup;
      config.cleanup = {
        ...originalConfig,
        minRetentionDays: 7, // Minimum 7 days
      };

      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 10 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      // Should use minimum retention instead of requested 1 day
      expect(mockDb.tokenMetrics.deleteMany).toHaveBeenCalledWith({
        where: {
          timestamp: {
            lt: expect.any(Date),
          },
        },
      });

      // Restore original config
      config.cleanup = originalConfig;
    });

    it('should update progress correctly for multi-step cleanup', async () => {
      // Arrange
      const jobData = {
        type: 'comprehensive' as const,
        olderThanDays: 30,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 10 });
      mockDb.tokenMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 50 });
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 25 });
      mockDb.technicalAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 15 });
      mockDb.sentimentAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 12 });
      mockDb.aiAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 8 });
      mockDb.jobLog.deleteMany = jest.fn().mockResolvedValue({ count: 100 });
      mockDb.healthMetric.deleteMany = jest.fn().mockResolvedValue({ count: 200 });

      // Act
      await processCleanupJob(mockJob);

      // Assert
      // Should update progress multiple times during comprehensive cleanup
      expect(mockJob.progress).toHaveBeenCalledTimes(9); // 8 steps + final 100%
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should handle partial failures in comprehensive cleanup', async () => {
      // Arrange
      const jobData = {
        type: 'comprehensive' as const,
        olderThanDays: 30,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Some operations succeed, some fail
      mockDb.signal.deleteMany = jest.fn().mockResolvedValue({ count: 10 });
      mockDb.tokenMetrics.deleteMany = jest.fn().mockRejectedValue(new Error('DB Error'));
      mockDb.socialMetrics.deleteMany = jest.fn().mockResolvedValue({ count: 25 });
      mockDb.technicalAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 15 });
      mockDb.sentimentAnalysis.deleteMany = jest.fn().mockRejectedValue(new Error('DB Error'));
      mockDb.aiAnalysis.deleteMany = jest.fn().mockResolvedValue({ count: 8 });
      mockDb.jobLog.deleteMany = jest.fn().mockResolvedValue({ count: 100 });
      mockDb.healthMetric.deleteMany = jest.fn().mockResolvedValue({ count: 200 });

      // Act
      const result = await processCleanupJob(mockJob);

      // Assert
      expect(result.cleaned).toBe(358); // Sum of successful deletions
      expect(result.errors).toBe(2); // Two failed operations
    });
  });
});