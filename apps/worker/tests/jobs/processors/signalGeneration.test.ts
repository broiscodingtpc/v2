import { processSignalGenerationJob } from '@/jobs/processors/signalGeneration';
import { aiService } from '@/services/ai';
import { DatabaseUtils } from '@/database';
import { db } from '@/database';
import { createMockToken, createMockTokenMetrics, createMockSocialMetrics, createMockSignal } from '../../setup';

// Mock the services
jest.mock('@/services/ai');
jest.mock('@/database');

const mockAiService = aiService as jest.Mocked<typeof aiService>;
const mockDatabaseUtils = DatabaseUtils as jest.Mocked<typeof DatabaseUtils>;
const mockDb = db as jest.Mocked<typeof db>;

describe('Signal Generation Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processSignalGenerationJob', () => {
    it('should generate technical signals successfully', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockMetrics = [createMockTokenMetrics()];
      const mockSocialMetrics = [createMockSocialMetrics()];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue(mockMetrics);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue(mockSocialMetrics);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'technical',
        action: 'buy',
        strength: 0.8,
        confidence: 0.9,
        price: 1.0,
        targetPrice: 1.2,
        stopLoss: 0.9,
        timeframe: '4h',
        riskLevel: 'medium',
        description: 'Strong bullish momentum',
        reasoning: 'RSI oversold, MACD bullish crossover',
        metadata: { rsi: 30, macd: 'bullish' },
      });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal());

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        signals: expect.any(Array),
      });

      expect(mockAiService.generateTradingSignal).toHaveBeenCalled();
      expect(mockDatabaseUtils.createSignal).toHaveBeenCalled();
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should generate momentum signals successfully', async () => {
      // Arrange
      const jobData = {
        type: 'momentum_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockMetrics = [
        createMockTokenMetrics({ priceChange24h: 15.0, volumeChange24h: 50.0 }),
      ];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue(mockMetrics);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'momentum',
        action: 'buy',
        strength: 0.9,
        confidence: 0.85,
        price: 1.0,
        targetPrice: 1.3,
        stopLoss: 0.95,
        timeframe: '1h',
        riskLevel: 'high',
        description: 'Strong momentum breakout',
        reasoning: 'High price and volume increase',
        metadata: { priceChange: 15.0, volumeChange: 50.0 },
      });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal({
        type: 'momentum',
        strength: 0.9,
      }));

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockAiService.generateTradingSignal).toHaveBeenCalledWith(
        expect.objectContaining({
          signalType: 'momentum',
        })
      );
    });

    it('should generate volume signals successfully', async () => {
      // Arrange
      const jobData = {
        type: 'volume_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockMetrics = [
        createMockTokenMetrics({ volume24h: 5000000, volumeChange24h: 200.0 }),
      ];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue(mockMetrics);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'volume',
        action: 'buy',
        strength: 0.85,
        confidence: 0.8,
        price: 1.0,
        targetPrice: 1.15,
        stopLoss: 0.92,
        timeframe: '2h',
        riskLevel: 'medium',
        description: 'Volume spike detected',
        reasoning: 'Unusual volume increase indicates interest',
        metadata: { volumeSpike: 200.0 },
      });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal({
        type: 'volume',
      }));

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockAiService.generateTradingSignal).toHaveBeenCalledWith(
        expect.objectContaining({
          signalType: 'volume',
        })
      );
    });

    it('should generate social signals successfully', async () => {
      // Arrange
      const jobData = {
        type: 'social_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockSocialMetrics = [
        createMockSocialMetrics({ mentions: 1000, sentiment: 0.8, engagement: 5000 }),
      ];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue(mockSocialMetrics);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'social',
        action: 'buy',
        strength: 0.75,
        confidence: 0.7,
        price: 1.0,
        targetPrice: 1.1,
        stopLoss: 0.95,
        timeframe: '6h',
        riskLevel: 'low',
        description: 'Positive social sentiment',
        reasoning: 'High engagement and positive sentiment',
        metadata: { socialScore: 8.5 },
      });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal({
        type: 'social',
      }));

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockAiService.generateTradingSignal).toHaveBeenCalledWith(
        expect.objectContaining({
          signalType: 'social',
        })
      );
    });

    it('should handle AI service errors gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockRejectedValue(new Error('AI Service Error'));

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 0,
        errors: 1,
        signals: [],
      });
    });

    it('should filter duplicate signals', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const existingSignal = createMockSignal({
        type: 'technical',
        action: 'buy',
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      });

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([existingSignal]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'technical',
        action: 'buy', // Same as existing signal
        strength: 0.8,
        confidence: 0.9,
        price: 1.0,
        targetPrice: 1.2,
        stopLoss: 0.9,
        timeframe: '4h',
        riskLevel: 'medium',
        description: 'Duplicate signal',
        reasoning: 'Same as existing',
        metadata: {},
      });

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.processed).toBe(0); // Should be filtered out
      expect(mockDatabaseUtils.createSignal).not.toHaveBeenCalled();
    });

    it('should handle missing token data', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(null);

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should handle insufficient data for signal generation', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([]); // No metrics
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should rank signals by strength and confidence', async () => {
      // Arrange
      const jobData = {
        type: 'ai_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([createMockSocialMetrics()]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      // Mock multiple signals with different strengths
      mockAiService.generateTradingSignal
        .mockResolvedValueOnce({
          type: 'ai',
          action: 'buy',
          strength: 0.6, // Lower strength
          confidence: 0.7,
          price: 1.0,
          targetPrice: 1.1,
          stopLoss: 0.95,
          timeframe: '4h',
          riskLevel: 'low',
          description: 'Weak signal',
          reasoning: 'Low confidence',
          metadata: {},
        })
        .mockResolvedValueOnce({
          type: 'ai',
          action: 'buy',
          strength: 0.9, // Higher strength
          confidence: 0.95,
          price: 1.0,
          targetPrice: 1.3,
          stopLoss: 0.9,
          timeframe: '4h',
          riskLevel: 'high',
          description: 'Strong signal',
          reasoning: 'High confidence',
          metadata: {},
        });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal());

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.processed).toBeGreaterThan(0);
      // The stronger signal should be processed first
    });

    it('should handle database errors', async () => {
      // Arrange
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'technical',
        action: 'buy',
        strength: 0.8,
        confidence: 0.9,
        price: 1.0,
        targetPrice: 1.2,
        stopLoss: 0.9,
        timeframe: '4h',
        riskLevel: 'medium',
        description: 'Test signal',
        reasoning: 'Test reasoning',
        metadata: {},
      });

      mockDatabaseUtils.createSignal.mockRejectedValue(new Error('Database Error'));

      // Act
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
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
      const result = await processSignalGenerationJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should update job progress correctly for multiple tokens', async () => {
      // Arrange
      const tokenAddresses = ['0x123', '0x456', '0x789'];
      const jobData = {
        type: 'technical_signals' as const,
        tokenAddresses,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue([]);
      mockDb.technicalAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.aiAnalysis.findMany = jest.fn().mockResolvedValue([]);
      mockDb.signal.findMany = jest.fn().mockResolvedValue([]);

      mockAiService.generateTradingSignal.mockResolvedValue({
        type: 'technical',
        action: 'buy',
        strength: 0.8,
        confidence: 0.9,
        price: 1.0,
        targetPrice: 1.2,
        stopLoss: 0.9,
        timeframe: '4h',
        riskLevel: 'medium',
        description: 'Test signal',
        reasoning: 'Test reasoning',
        metadata: {},
      });

      mockDatabaseUtils.createSignal.mockResolvedValue(createMockSignal());

      // Act
      await processSignalGenerationJob(mockJob);

      // Assert
      expect(mockJob.progress).toHaveBeenCalledWith(33);
      expect(mockJob.progress).toHaveBeenCalledWith(67);
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });
  });
});