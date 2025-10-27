import { db, connectDatabase, disconnectDatabase, DatabaseUtils } from '@/database';
import { PrismaClient } from '@prisma/client';

// Mock Prisma Client
jest.mock('@prisma/client');

const mockPrismaClient = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $queryRaw: jest.fn(),
  token: {
    upsert: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  tokenMetrics: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  socialMetrics: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  signal: {
    create: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  jobLog: {
    create: jest.fn(),
    update: jest.fn(),
  },
  healthMetric: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  aiAnalysis: {
    deleteMany: jest.fn(),
  },
  $transaction: jest.fn(),
} as any;

// Mock the db instance
(db as any) = mockPrismaClient;

describe('Database', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Connection Management', () => {
    it('should connect to database successfully', async () => {
      // Arrange
      mockPrismaClient.$connect.mockResolvedValue(undefined);

      // Act
      await connectDatabase();

      // Assert
      expect(mockPrismaClient.$connect).toHaveBeenCalled();
    });

    it('should handle connection errors', async () => {
      // Arrange
      const error = new Error('Connection failed');
      mockPrismaClient.$connect.mockRejectedValue(error);

      // Act & Assert
      await expect(connectDatabase()).rejects.toThrow('Connection failed');
    });

    it('should disconnect from database successfully', async () => {
      // Arrange
      mockPrismaClient.$disconnect.mockResolvedValue(undefined);

      // Act
      await disconnectDatabase();

      // Assert
      expect(mockPrismaClient.$disconnect).toHaveBeenCalled();
    });

    it('should handle disconnection errors', async () => {
      // Arrange
      const error = new Error('Disconnection failed');
      mockPrismaClient.$disconnect.mockRejectedValue(error);

      // Act & Assert
      await expect(disconnectDatabase()).rejects.toThrow('Disconnection failed');
    });
  });

  describe('DatabaseUtils', () => {
    describe('upsertToken', () => {
      it('should upsert token successfully', async () => {
        // Arrange
        const tokenData = {
          address: '0x123',
          symbol: 'TEST',
          name: 'Test Token',
          decimals: 18,
          totalSupply: '1000000',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          network: 'ethereum',
        };

        const expectedToken = {
          id: 'token-id',
          ...tokenData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockPrismaClient.token.upsert.mockResolvedValue(expectedToken);

        // Act
        const result = await DatabaseUtils.upsertToken(tokenData);

        // Assert
        expect(mockPrismaClient.token.upsert).toHaveBeenCalledWith({
          where: { address: tokenData.address },
          update: expect.objectContaining({
            symbol: tokenData.symbol,
            name: tokenData.name,
            price: tokenData.price,
            marketCap: tokenData.marketCap,
            volume24h: tokenData.volume24h,
            priceChange24h: tokenData.priceChange24h,
            liquidity: tokenData.liquidity,
            fdv: tokenData.fdv,
            holders: tokenData.holders,
          }),
          create: expect.objectContaining(tokenData),
        });
        expect(result).toEqual(expectedToken);
      });

      it('should handle upsert errors', async () => {
        // Arrange
        const tokenData = {
          address: '0x123',
          symbol: 'TEST',
          name: 'Test Token',
          decimals: 18,
          totalSupply: '1000000',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          network: 'ethereum',
        };

        const error = new Error('Database error');
        mockPrismaClient.token.upsert.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.upsertToken(tokenData)).rejects.toThrow('Database error');
      });
    });

    describe('createTokenMetrics', () => {
      it('should create token metrics successfully', async () => {
        // Arrange
        const metricsData = {
          tokenId: 'token-id',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          technicalIndicators: {
            rsi: 65,
            macd: 0.05,
            bollinger: { upper: 1.6, middle: 1.5, lower: 1.4 },
          },
        };

        const expectedMetrics = {
          id: 'metrics-id',
          ...metricsData,
          createdAt: new Date(),
        };

        mockPrismaClient.tokenMetrics.create.mockResolvedValue(expectedMetrics);

        // Act
        const result = await DatabaseUtils.createTokenMetrics(metricsData);

        // Assert
        expect(mockPrismaClient.tokenMetrics.create).toHaveBeenCalledWith({
          data: metricsData,
        });
        expect(result).toEqual(expectedMetrics);
      });

      it('should handle create metrics errors', async () => {
        // Arrange
        const metricsData = {
          tokenId: 'token-id',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          technicalIndicators: {},
        };

        const error = new Error('Database error');
        mockPrismaClient.tokenMetrics.create.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.createTokenMetrics(metricsData)).rejects.toThrow('Database error');
      });
    });

    describe('createSocialMetrics', () => {
      it('should create social metrics successfully', async () => {
        // Arrange
        const socialData = {
          tokenId: 'token-id',
          platform: 'twitter',
          mentions: 100,
          sentiment: 0.7,
          influenceScore: 85,
          trendingScore: 90,
          socialVolume: 1000,
          socialDominance: 5.5,
          socialContributors: 50,
          details: {
            hashtags: ['#crypto', '#defi'],
            topInfluencers: ['@crypto_guru'],
          },
        };

        const expectedSocial = {
          id: 'social-id',
          ...socialData,
          createdAt: new Date(),
        };

        mockPrismaClient.socialMetrics.create.mockResolvedValue(expectedSocial);

        // Act
        const result = await DatabaseUtils.createSocialMetrics(socialData);

        // Assert
        expect(mockPrismaClient.socialMetrics.create).toHaveBeenCalledWith({
          data: socialData,
        });
        expect(result).toEqual(expectedSocial);
      });

      it('should handle create social metrics errors', async () => {
        // Arrange
        const socialData = {
          tokenId: 'token-id',
          platform: 'twitter',
          mentions: 100,
          sentiment: 0.7,
          influenceScore: 85,
          trendingScore: 90,
          socialVolume: 1000,
          socialDominance: 5.5,
          socialContributors: 50,
          details: {},
        };

        const error = new Error('Database error');
        mockPrismaClient.socialMetrics.create.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.createSocialMetrics(socialData)).rejects.toThrow('Database error');
      });
    });

    describe('createSignal', () => {
      it('should create signal successfully', async () => {
        // Arrange
        const signalData = {
          tokenId: 'token-id',
          type: 'BUY',
          strength: 8.5,
          confidence: 0.85,
          source: 'technical_analysis',
          indicators: ['rsi_oversold', 'volume_spike'],
          description: 'Strong buy signal based on technical indicators',
          metadata: {
            rsi: 25,
            volume_ratio: 3.5,
          },
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        };

        const expectedSignal = {
          id: 'signal-id',
          ...signalData,
          createdAt: new Date(),
        };

        mockPrismaClient.signal.create.mockResolvedValue(expectedSignal);

        // Act
        const result = await DatabaseUtils.createSignal(signalData);

        // Assert
        expect(mockPrismaClient.signal.create).toHaveBeenCalledWith({
          data: signalData,
        });
        expect(result).toEqual(expectedSignal);
      });

      it('should handle create signal errors', async () => {
        // Arrange
        const signalData = {
          tokenId: 'token-id',
          type: 'BUY',
          strength: 8.5,
          confidence: 0.85,
          source: 'technical_analysis',
          indicators: ['rsi_oversold'],
          description: 'Buy signal',
          metadata: {},
          expiresAt: new Date(),
        };

        const error = new Error('Database error');
        mockPrismaClient.signal.create.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.createSignal(signalData)).rejects.toThrow('Database error');
      });
    });

    describe('getActiveSignals', () => {
      it('should get active signals successfully', async () => {
        // Arrange
        const expectedSignals = [
          {
            id: 'signal-1',
            tokenId: 'token-1',
            type: 'BUY',
            strength: 8.5,
            confidence: 0.85,
            source: 'technical_analysis',
            indicators: ['rsi_oversold'],
            description: 'Buy signal',
            metadata: {},
            expiresAt: new Date(Date.now() + 60000),
            createdAt: new Date(),
          },
          {
            id: 'signal-2',
            tokenId: 'token-2',
            type: 'SELL',
            strength: 7.0,
            confidence: 0.75,
            source: 'social_analysis',
            indicators: ['negative_sentiment'],
            description: 'Sell signal',
            metadata: {},
            expiresAt: new Date(Date.now() + 120000),
            createdAt: new Date(),
          },
        ];

        mockPrismaClient.signal.findMany.mockResolvedValue(expectedSignals);

        // Act
        const result = await DatabaseUtils.getActiveSignals();

        // Assert
        expect(mockPrismaClient.signal.findMany).toHaveBeenCalledWith({
          where: {
            expiresAt: {
              gt: expect.any(Date),
            },
          },
          orderBy: [
            { strength: 'desc' },
            { confidence: 'desc' },
            { createdAt: 'desc' },
          ],
          include: {
            token: true,
          },
        });
        expect(result).toEqual(expectedSignals);
      });

      it('should handle get active signals errors', async () => {
        // Arrange
        const error = new Error('Database error');
        mockPrismaClient.signal.findMany.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.getActiveSignals()).rejects.toThrow('Database error');
      });
    });

    describe('getTokensNeedingUpdate', () => {
      it('should get tokens needing update successfully', async () => {
        // Arrange
        const expectedTokens = [
          {
            id: 'token-1',
            address: '0x123',
            symbol: 'TEST1',
            name: 'Test Token 1',
            updatedAt: new Date(Date.now() - 60000), // 1 minute ago
          },
          {
            id: 'token-2',
            address: '0x456',
            symbol: 'TEST2',
            name: 'Test Token 2',
            updatedAt: new Date(Date.now() - 120000), // 2 minutes ago
          },
        ];

        mockPrismaClient.token.findMany.mockResolvedValue(expectedTokens);

        // Act
        const result = await DatabaseUtils.getTokensNeedingUpdate(30); // 30 minutes

        // Assert
        expect(mockPrismaClient.token.findMany).toHaveBeenCalledWith({
          where: {
            updatedAt: {
              lt: expect.any(Date),
            },
          },
          orderBy: {
            updatedAt: 'asc',
          },
          take: 100,
        });
        expect(result).toEqual(expectedTokens);
      });

      it('should handle get tokens needing update errors', async () => {
        // Arrange
        const error = new Error('Database error');
        mockPrismaClient.token.findMany.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.getTokensNeedingUpdate(30)).rejects.toThrow('Database error');
      });
    });

    describe('logJob', () => {
      it('should log job successfully', async () => {
        // Arrange
        const jobData = {
          jobId: 'job-123',
          type: 'tokenData',
          status: 'started',
          data: { tokenAddress: '0x123' },
        };

        const expectedJobLog = {
          id: 'log-id',
          ...jobData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockPrismaClient.jobLog.create.mockResolvedValue(expectedJobLog);

        // Act
        const result = await DatabaseUtils.logJob(jobData);

        // Assert
        expect(mockPrismaClient.jobLog.create).toHaveBeenCalledWith({
          data: jobData,
        });
        expect(result).toEqual(expectedJobLog);
      });

      it('should handle log job errors', async () => {
        // Arrange
        const jobData = {
          jobId: 'job-123',
          type: 'tokenData',
          status: 'started',
          data: {},
        };

        const error = new Error('Database error');
        mockPrismaClient.jobLog.create.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.logJob(jobData)).rejects.toThrow('Database error');
      });
    });

    describe('updateJobLog', () => {
      it('should update job log successfully', async () => {
        // Arrange
        const jobId = 'job-123';
        const updateData = {
          status: 'completed',
          result: { processed: 5 },
          completedAt: new Date(),
        };

        const expectedJobLog = {
          id: 'log-id',
          jobId,
          type: 'tokenData',
          ...updateData,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockPrismaClient.jobLog.update.mockResolvedValue(expectedJobLog);

        // Act
        const result = await DatabaseUtils.updateJobLog(jobId, updateData);

        // Assert
        expect(mockPrismaClient.jobLog.update).toHaveBeenCalledWith({
          where: { jobId },
          data: updateData,
        });
        expect(result).toEqual(expectedJobLog);
      });

      it('should handle update job log errors', async () => {
        // Arrange
        const jobId = 'job-123';
        const updateData = {
          status: 'failed',
          error: 'Processing failed',
        };

        const error = new Error('Database error');
        mockPrismaClient.jobLog.update.mockRejectedValue(error);

        // Act & Assert
        await expect(DatabaseUtils.updateJobLog(jobId, updateData)).rejects.toThrow('Database error');
      });
    });
  });

  describe('Database Health Check', () => {
    it('should perform health check successfully', async () => {
      // Arrange
      mockPrismaClient.$queryRaw.mockResolvedValue([{ result: 1 }]);

      // Act
      const isHealthy = await db.healthCheck();

      // Assert
      expect(mockPrismaClient.$queryRaw).toHaveBeenCalledWith`SELECT 1 as result`;
      expect(isHealthy).toBe(true);
    });

    it('should handle health check errors', async () => {
      // Arrange
      const error = new Error('Database connection failed');
      mockPrismaClient.$queryRaw.mockRejectedValue(error);

      // Act
      const isHealthy = await db.healthCheck();

      // Assert
      expect(isHealthy).toBe(false);
    });
  });

  describe('Database Statistics', () => {
    it('should get database stats successfully', async () => {
      // Arrange
      mockPrismaClient.token.count.mockResolvedValue(100);
      mockPrismaClient.tokenMetrics.count.mockResolvedValue(1000);
      mockPrismaClient.socialMetrics.count.mockResolvedValue(500);
      mockPrismaClient.signal.count.mockResolvedValue(50);
      mockPrismaClient.jobLog.count.mockResolvedValue(2000);

      // Act
      const stats = await db.getStats();

      // Assert
      expect(stats).toEqual({
        tokens: 100,
        tokenMetrics: 1000,
        socialMetrics: 500,
        signals: 50,
        jobLogs: 2000,
      });
    });

    it('should handle get stats errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPrismaClient.token.count.mockRejectedValue(error);

      // Act & Assert
      await expect(db.getStats()).rejects.toThrow('Database error');
    });
  });

  describe('Database Cleanup', () => {
    it('should cleanup old data successfully', async () => {
      // Arrange
      const daysToKeep = 30;
      const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

      mockPrismaClient.tokenMetrics.deleteMany.mockResolvedValue({ count: 100 });
      mockPrismaClient.socialMetrics.deleteMany.mockResolvedValue({ count: 50 });
      mockPrismaClient.signal.deleteMany.mockResolvedValue({ count: 25 });
      mockPrismaClient.healthMetric.deleteMany.mockResolvedValue({ count: 200 });
      mockPrismaClient.aiAnalysis.deleteMany.mockResolvedValue({ count: 75 });

      // Act
      const result = await db.cleanup(daysToKeep);

      // Assert
      expect(mockPrismaClient.tokenMetrics.deleteMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            lt: expect.any(Date),
          },
        },
      });
      expect(mockPrismaClient.socialMetrics.deleteMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            lt: expect.any(Date),
          },
        },
      });
      expect(mockPrismaClient.signal.deleteMany).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              expiresAt: {
                lt: expect.any(Date),
              },
            },
            {
              createdAt: {
                lt: expect.any(Date),
              },
            },
          ],
        },
      });
      expect(result).toEqual({
        tokenMetrics: 100,
        socialMetrics: 50,
        signals: 25,
        healthMetrics: 200,
        aiAnalyses: 75,
      });
    });

    it('should handle cleanup errors', async () => {
      // Arrange
      const error = new Error('Database error');
      mockPrismaClient.tokenMetrics.deleteMany.mockRejectedValue(error);

      // Act & Assert
      await expect(db.cleanup(30)).rejects.toThrow('Database error');
    });
  });

  describe('Graceful Disconnect', () => {
    it('should disconnect gracefully', async () => {
      // Arrange
      mockPrismaClient.$disconnect.mockResolvedValue(undefined);

      // Act
      await db.gracefulDisconnect();

      // Assert
      expect(mockPrismaClient.$disconnect).toHaveBeenCalled();
    });

    it('should handle graceful disconnect errors', async () => {
      // Arrange
      const error = new Error('Disconnect error');
      mockPrismaClient.$disconnect.mockRejectedValue(error);

      // Act & Assert
      await expect(db.gracefulDisconnect()).rejects.toThrow('Disconnect error');
    });
  });
});