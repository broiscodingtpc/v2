import { processSocialDataJob } from '@/jobs/processors/socialData';
import { twitterService } from '@/services/twitter';
import { DatabaseUtils } from '@/database';
import { createMockSocialMetrics, mockTwitterResponse } from '../../setup';

// Mock the services
jest.mock('@/services/twitter');
jest.mock('@/database');

const mockTwitterService = twitterService as jest.Mocked<typeof twitterService>;
const mockDatabaseUtils = DatabaseUtils as jest.Mocked<typeof DatabaseUtils>;

describe('Social Data Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processSocialDataJob', () => {
    it('should process social data for tokens successfully', async () => {
      // Arrange
      const jobData = {
        type: 'token_social' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTokenSocialMetrics.mockResolvedValue({
        mentions: 100,
        sentiment: 0.5,
        engagement: 1000,
        influencerMentions: 5,
        hashtagCount: 20,
        topTweets: [],
      });

      mockDatabaseUtils.createSocialMetrics.mockResolvedValue(createMockSocialMetrics());

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        socialMetrics: expect.any(Array),
      });

      expect(mockTwitterService.getTokenSocialMetrics).toHaveBeenCalledWith(
        '0x1234567890123456789012345678901234567890'
      );
      expect(mockDatabaseUtils.createSocialMetrics).toHaveBeenCalled();
      expect(mockJob.progress).toHaveBeenCalledWith(100);
    });

    it('should process trending topics successfully', async () => {
      // Arrange
      const jobData = {
        type: 'trending_topics' as const,
        limit: 10,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTrendingTopics.mockResolvedValue([
        {
          topic: '#DeFi',
          volume: 1000,
          sentiment: 0.6,
          relatedTokens: ['0x123'],
        },
      ]);

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 1,
        errors: 0,
        socialMetrics: [],
        trendingTopics: expect.any(Array),
      });

      expect(mockTwitterService.getTrendingTopics).toHaveBeenCalledWith(10);
    });

    it('should process custom keywords successfully', async () => {
      // Arrange
      const jobData = {
        type: 'custom_keywords' as const,
        keywords: ['DeFi', 'NFT', 'Web3'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.searchTweets.mockResolvedValue(mockTwitterResponse);
      mockTwitterService.extractTokenMentions.mockResolvedValue(['0x123', '0x456']);

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result.processed).toBeGreaterThan(0);
      expect(mockTwitterService.searchTweets).toHaveBeenCalledTimes(3); // Once for each keyword
    });

    it('should handle Twitter API errors gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'token_social' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTokenSocialMetrics.mockRejectedValue(new Error('Twitter API Error'));

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 0,
        errors: 1,
        socialMetrics: [],
      });
    });

    it('should calculate social influence score correctly', async () => {
      // Arrange
      const jobData = {
        type: 'token_social' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockSocialData = {
        mentions: 500,
        sentiment: 0.8,
        engagement: 5000,
        influencerMentions: 10,
        hashtagCount: 50,
        topTweets: [],
      };

      mockTwitterService.getTokenSocialMetrics.mockResolvedValue(mockSocialData);
      mockDatabaseUtils.createSocialMetrics.mockResolvedValue(createMockSocialMetrics());

      // Act
      await processSocialDataJob(mockJob);

      // Assert
      expect(mockDatabaseUtils.createSocialMetrics).toHaveBeenCalledWith(
        expect.objectContaining({
          mentions: 500,
          sentiment: 0.8,
          engagement: 5000,
          influencerMentions: 10,
          hashtagCount: 50,
        })
      );
    });

    it('should handle database errors', async () => {
      // Arrange
      const jobData = {
        type: 'token_social' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTokenSocialMetrics.mockResolvedValue({
        mentions: 100,
        sentiment: 0.5,
        engagement: 1000,
        influencerMentions: 5,
        hashtagCount: 20,
        topTweets: [],
      });

      mockDatabaseUtils.createSocialMetrics.mockRejectedValue(new Error('Database Error'));

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should detect social anomalies', async () => {
      // Arrange
      const jobData = {
        type: 'token_social' as const,
        tokenAddresses: ['0x1234567890123456789012345678901234567890'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      // Mock high engagement anomaly
      const mockSocialData = {
        mentions: 10000, // Very high mentions
        sentiment: 0.9,
        engagement: 50000, // Very high engagement
        influencerMentions: 50,
        hashtagCount: 200,
        topTweets: [],
      };

      mockTwitterService.getTokenSocialMetrics.mockResolvedValue(mockSocialData);
      mockDatabaseUtils.createSocialMetrics.mockResolvedValue(createMockSocialMetrics());

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result.processed).toBe(1);
      // Should detect anomaly and potentially create additional records
    });

    it('should handle rate limiting for multiple tokens', async () => {
      // Arrange
      const tokenAddresses = Array(20).fill(0).map((_, i) => 
        `0x${i.toString().padStart(40, '0')}`
      );

      const jobData = {
        type: 'token_social' as const,
        tokenAddresses,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTokenSocialMetrics.mockResolvedValue({
        mentions: 100,
        sentiment: 0.5,
        engagement: 1000,
        influencerMentions: 5,
        hashtagCount: 20,
        topTweets: [],
      });

      mockDatabaseUtils.createSocialMetrics.mockResolvedValue(createMockSocialMetrics());

      // Act
      const startTime = Date.now();
      await processSocialDataJob(mockJob);
      const endTime = Date.now();

      // Assert
      // Should take some time due to rate limiting
      expect(endTime - startTime).toBeGreaterThan(1000);
      expect(mockJob.progress).toHaveBeenCalledWith(100);
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
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result.errors).toBe(1);
      expect(result.processed).toBe(0);
    });

    it('should handle empty results gracefully', async () => {
      // Arrange
      const jobData = {
        type: 'trending_topics' as const,
        limit: 10,
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      mockTwitterService.getTrendingTopics.mockResolvedValue([]);

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(result).toEqual({
        processed: 0,
        errors: 0,
        socialMetrics: [],
        trendingTopics: [],
      });
    });

    it('should extract token mentions from tweets correctly', async () => {
      // Arrange
      const jobData = {
        type: 'custom_keywords' as const,
        keywords: ['DeFi'],
      };

      const mockJob = {
        id: 'test-job-id',
        data: jobData,
        progress: jest.fn(),
      } as any;

      const mockTweets = {
        ...mockTwitterResponse,
        data: [
          {
            ...mockTwitterResponse.data[0],
            text: 'Check out this amazing $ETH and $BTC opportunity! #DeFi',
          },
        ],
      };

      mockTwitterService.searchTweets.mockResolvedValue(mockTweets);
      mockTwitterService.extractTokenMentions.mockResolvedValue(['ETH', 'BTC']);

      // Act
      const result = await processSocialDataJob(mockJob);

      // Assert
      expect(mockTwitterService.extractTokenMentions).toHaveBeenCalledWith(
        'Check out this amazing $ETH and $BTC opportunity! #DeFi'
      );
      expect(result.processed).toBeGreaterThan(0);
    });
  });
});