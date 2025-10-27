import { processAIAnalysisJob } from '@/jobs/processors/aiAnalysis';
import { aiService } from '@/services/ai';
import { DatabaseUtils } from '@/database';
import { db } from '@/database';
import { createMockToken, createMockTokenMetrics, createMockSocialMetrics } from '../../setup';

// Mock the services
jest.mock('@/services/ai');
jest.mock('@/database');

const mockAiService = aiService as jest.Mocked<typeof aiService>;
const mockDatabaseUtils = DatabaseUtils as jest.Mocked<typeof DatabaseUtils>;
const mockDb = db as jest.Mocked<typeof db>;

describe('AI Analysis Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processAIAnalysisJob', () => {
    it('should process technical analysis successfully', async () => {
      // Arrange
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockMetrics = [createMockTokenMetrics()];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue(mockMetrics);

      mockAiService.generateTechnicalAnalysis.mockResolvedValue({
        analysis: 'Bullish trend detected',
        indicators: {
          rsi: 65,
          macd: 'bullish',
          sma: 'above',
        },
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
      });

      mockDb.technicalAnalysis.create = jest.fn().mockResolvedValue({
        id: 'test-analysis-id',
        tokenAddress: mockToken.address,
        analysis: 'Bullish trend detected',
        indicators: { rsi: 65, macd: 'bullish', sma: 'above' },
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
        createdAt: new Date(),
      });

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        analyses: expect.any(Array),
      });

      expect(mockAiService.generateTechnicalAnalysis).toHaveBeenCalledWith({
        token: mockToken,
        metrics: mockMetrics,
      });
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should process sentiment analysis successfully', async () => {
      // Arrange
      const jobData = {
        type: 'sentiment_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockToken = createMockToken();
      const mockSocialMetrics = [createMockSocialMetrics()];

      mockDb.token.findUnique = jest.fn().mockResolvedValue(mockToken);
      mockDb.socialMetrics.findMany = jest.fn().mockResolvedValue(mockSocialMetrics);

      mockAiService.generateSentimentAnalysis.mockResolvedValue({
        sentiment: 0.7,
        confidence: 0.85,
        summary: 'Positive sentiment detected',
        factors: ['high engagement', 'positive mentions'],
        socialScore: 8.5,
      });

      mockDb.sentimentAnalysis.create = jest.fn().mockResolvedValue({
        id: 'test-sentiment-id',
        tokenAddress: mockToken.address,
        sentiment: 0.7,
        confidence: 0.85,
        summary: 'Positive sentiment detected',
        factors: ['high engagement', 'positive mentions'],
        socialScore: 8.5,
        createdAt: new Date(),
      });

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockAiService.generateSentimentAnalysis).toHaveBeenCalledWith({
        token: mockToken,
        socialMetrics: mockSocialMetrics,
      });
    });

    it('should process comprehensive analysis successfully', async () => {
      // Arrange
      const jobData = {
        type: 'comprehensive_analysis' as const,
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

      const mockAnalysis = {
        overallScore: 8.2,
        technicalScore: 7.5,
        fundamentalScore: 8.0,
        sentimentScore: 9.0,
        riskScore: 6.5,
        summary: 'Strong bullish signals across all metrics',
        keyInsights: ['High social engagement', 'Strong technical indicators'],
        risks: ['Market volatility'],
        opportunities: ['Growing adoption'],
        recommendation: 'buy' as const,
        confidence: 0.85,
        timeHorizon: '1-3 months',
      };

      mockAiService.generateTechnicalAnalysis.mockResolvedValue({
        analysis: 'Technical analysis',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
      });

      mockAiService.generateSentimentAnalysis.mockResolvedValue({
        sentiment: 0.7,
        confidence: 0.85,
        summary: 'Positive sentiment',
        factors: [],
        socialScore: 8.5,
      });

      mockDb.aiAnalysis.create = jest.fn().mockResolvedValue({
        id: 'test-ai-analysis-id',
        tokenAddress: mockToken.address,
        ...mockAnalysis,
        createdAt: new Date(),
      });

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockDb.aiAnalysis.create).toHaveBeenCalled();
    });

    it('should handle AI service errors gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockAiService.generateTechnicalAnalysis.mockRejectedValue(new Error('AI Service Error'));

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 0,
        errors: 1,
        analyses: [],
      });
    });

    it('should handle missing token data', async () => {
      // Arrange
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(null);

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should handle insufficient data for analysis', async () => {
      // Arrange
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([]); // No metrics

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should process market overview successfully', async () => {
      // Arrange
      const jobData = {
        type: 'market_overview' as const,
        limit: 50,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockTokens = [createMockToken(), createMockToken({ address: '0x456' })];
      const mockMetrics = [createMockTokenMetrics(), createMockTokenMetrics()];

      mockDb.token.findMany = jest.fn().mockResolvedValue(mockTokens);
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue(mockMetrics);

      const mockOverview = {
        marketSentiment: 'bullish',
        topPerformers: ['0x123'],
        marketTrends: ['DeFi growth'],
        riskFactors: ['Volatility'],
        opportunities: ['New protocols'],
        summary: 'Market showing strong bullish signals',
        confidence: 0.8,
      };

      mockDb.marketOverview.create = jest.fn().mockResolvedValue({
        id: 'test-overview-id',
        ...mockOverview,
        createdAt: new Date(),
      });

      // Act
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      expect(mockDb.marketOverview.create).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      // Arrange
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockAiService.generateTechnicalAnalysis.mockResolvedValue({
        analysis: 'Test analysis',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
      });
      mockDb.technicalAnalysis.create = jest.fn().mockRejectedValue(new Error('Database Error'));

      // Act
      const result = await processAIAnalysisJob(mockJob);

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
      const result = await processAIAnalysisJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should handle rate limiting for AI service calls', async () => {
      // Arrange
      const tokenAddresses = Array(10).fill(0).map((_, i) => 
        `0x${i.toString().padStart(40, '0')}`
      );

      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockAiService.generateTechnicalAnalysis.mockResolvedValue({
        analysis: 'Test analysis',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
      });
      mockDb.technicalAnalysis.create = jest.fn().mockResolvedValue({
        id: 'test-id',
        tokenAddress: '0x123',
        analysis: 'Test',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
        createdAt: new Date(),
      });

      // Act
      const startTime = Date.now();
      await processAIAnalysisJob(mockJob);
      const endTime = Date.now();

      // Assert
      // Should take some time due to rate limiting
      expect(endTime - startTime).toBeGreaterThan(500);
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should update job progress correctly for multiple tokens', async () => {
      // Arrange
      const tokenAddresses = ['0x123', '0x456', '0x789'];
      const jobData = {
        type: 'technical_analysis' as const,
        tokenAddresses,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDb.token.findUnique = jest.fn().mockResolvedValue(createMockToken());
      mockDb.tokenMetrics.findMany = jest.fn().mockResolvedValue([createMockTokenMetrics()]);
      mockAiService.generateTechnicalAnalysis.mockResolvedValue({
        analysis: 'Test analysis',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
      });
      mockDb.technicalAnalysis.create = jest.fn().mockResolvedValue({
        id: 'test-id',
        tokenAddress: '0x123',
        analysis: 'Test',
        indicators: {},
        recommendation: 'buy',
        confidence: 0.8,
        timeframe: '4h',
        createdAt: new Date(),
      });

      // Act
      await processAIAnalysisJob(mockJob);

      // Assert
      expect(mockJob.progress).toHaveBeenCalledWith(33);
      expect(mockJob.progress).toHaveBeenCalledWith(67);
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });
  });
});