import { processTokenDataJob } from '@/jobs/processors/tokenData';
import { dexScreenerService } from '@/services/dexscreener';
import { DatabaseUtils } from '@/database';
import { logger } from '@/utils/logger';
import { createMockToken, createMockTokenMetrics, mockDexScreenerResponse } from '../../setup';

// Mock the services
jest.mock('@/services/dexscreener');
jest.mock('@/database');

const mockDexScreenerService = dexScreenerService as jest.Mocked<typeof dexScreenerService>;
const mockDatabaseUtils = DatabaseUtils as jest.Mocked<typeof DatabaseUtils>;

describe('Token Data Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processTokenDataJob', () => {
    it('should process token data successfully', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 10,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDexScreenerService.getTrendingTokens.mockResolvedValue(mockDexScreenerResponse);
      mockDatabaseUtils.upsertToken.mockResolvedValue(createMockToken());
      mockDatabaseUtils.createTokenMetrics.mockResolvedValue(createMockTokenMetrics());

      // Act
      const result = await processTokenDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        tokens: expect.any(Array),
      });

      expect(mockDexScreenerService.getTrendingTokens).toHaveBeenCalledWith(10);
      expect(mockDatabaseUtils.upsertToken).toHaveBeenCalled();
      expect(mockDatabaseUtils.createTokenMetrics).toHaveBeenCalled();
      expect(mockJob.progress).toHaveBeenCalled();
    });

    it('should handle specific token addresses', async () => {
      // Arrange
      const jobData = {
        type: 'specific_tokens' as const,
        addresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDexScreenerService.batchFetchTokenData.mockResolvedValue([mockDexScreenerResponse.pairs[0]]);
      mockDatabaseUtils.upsertToken.mockResolvedValue(createMockToken());
      mockDatabaseUtils.createTokenMetrics.mockResolvedValue(createMockTokenMetrics());

      // Act
      const result = await processTokenDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        tokens: expect.any(Array),
      });

      expect(mockDexScreenerService.batchFetchTokenData).toHaveBeenCalledWith(
        ['0x1234567890123456789012345678901234567890']
      );
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 10,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDexScreenerService.getTrendingTokens.mockRejectedValue(new Error('API Error'));

      // Act
      const result = await processTokenDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 0,
        errors: 1,
        tokens: [],
      });
    });

    it('should calculate technical indicators correctly', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 1,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockPairData = {
        ...mockDexScreenerResponse.pairs[0],
        priceChange: { h1: 2.0, h24: 5.0, h6: 3.0, h12: 4.0 },
        volume: { h24: 1000000, h6: 250000 },
      };

      mockDexScreenerService.getTrendingTokens.mockResolvedValue({
        pairs: [mockPairData],
      });
      mockDatabaseUtils.upsertToken.mockResolvedValue(createMockToken());
      mockDatabaseUtils.createTokenMetrics.mockResolvedValue(createMockTokenMetrics());

      // Act
      await processTokenDataJob(mockJob);

      // Assert
      expect(mockDatabaseUtils.createTokenMetrics).toHaveBeenCalledWith(
        expect.objectContaining({
          priceChange1h: 2.0,
          priceChange24h: 5.0,
          volumeChange24h: expect.any(Number),
        })
      );
    });

    it('should handle missing price data', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 1,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockPairData = {
        ...mockDexScreenerResponse.pairs[0],
        priceUsd: null,
        volume: null,
        liquidity: null,
      };

      mockDexScreenerService.getTrendingTokens.mockResolvedValue({
        pairs: [mockPairData],
      });

      // Act
      const result = await processTokenDataJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should update job progress correctly', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 3,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockResponse = {
        pairs: [
          mockDexScreenerResponse.pairs[0],
          { ...mockDexScreenerResponse.pairs[0], pairAddress: '0x456' },
          { ...mockDexScreenerResponse.pairs[0], pairAddress: '0x789' },
        ],
      };

      mockDexScreenerService.getTrendingTokens.mockResolvedValue(mockResponse);
      mockDatabaseUtils.upsertToken.mockResolvedValue(createMockToken());
      mockDatabaseUtils.createTokenMetrics.mockResolvedValue(createMockTokenMetrics());

      // Act
      await processTokenDataJob(mockJob);

      // Assert
      expect(mockJob.progress).toHaveBeenCalledWith(33);
      expect(mockJob.progress).toHaveBeenCalledWith(67);
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should handle database errors', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 1,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDexScreenerService.getTrendingTokens.mockResolvedValue(mockDexScreenerResponse);
      mockDatabaseUtils.upsertToken.mockRejectedValue(new Error('Database Error'));

      // Act
      const result = await processTokenDataJob(mockJob);

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
      const result = await processTokenDataJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should handle rate limiting', async () => {
      // Arrange
      const jobData = {
        type: 'popular_tokens' as const,
        limit: 100, // Large number to test rate limiting
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockDexScreenerService.getTrendingTokens.mockResolvedValue({
        pairs: Array(100).fill(mockDexScreenerResponse.pairs[0]).map((pair, index) => ({
          ...pair,
          pairAddress: `0x${index.toString().padStart(40, '0')}`,
        })),
      });

      mockDatabaseUtils.upsertToken.mockResolvedValue(createMockToken());
      mockDatabaseUtils.createTokenMetrics.mockResolvedValue(createMockTokenMetrics());

      // Act
      const startTime = Date.now();
      await processTokenDataJob(mockJob);
      const endTime = Date.now();

      // Assert
      // Should take some time due to rate limiting (at least 1 second for 100 tokens with 10/second limit)
      expect(endTime - startTime).toBeGreaterThan(500);
    });
  });
});