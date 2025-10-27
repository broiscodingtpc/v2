import { config } from '@/config';
import { db } from '@/database';
import { logger } from '@/utils/logger';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/metapulse_test';
process.env.REDIS_URL = 'redis://localhost:6379/1';
process.env.GROQ_API_KEY = 'test-groq-key';
process.env.GEMINI_API_KEY = 'test-gemini-key';
process.env.TWITTER_BEARER_TOKEN = 'test-twitter-token';

// Mock external services
jest.mock('@/services/dexscreener', () => ({
  dexScreenerService: {
    getTokenPairs: jest.fn(),
    getPairData: jest.fn(),
    searchTokens: jest.fn(),
    getTrendingTokens: jest.fn(),
    getTopGainers: jest.fn(),
    batchFetchTokenData: jest.fn(),
    healthCheck: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock('@/services/twitter', () => ({
  twitterService: {
    searchTweets: jest.fn(),
    extractTokenMentions: jest.fn(),
    getTokenSocialMetrics: jest.fn(),
    getTrendingTopics: jest.fn(),
    getInfluencerTweets: jest.fn(),
    healthCheck: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock('@/services/ai', () => ({
  aiService: {
    generateTechnicalAnalysis: jest.fn(),
    generateSentimentAnalysis: jest.fn(),
    generateTradingSignal: jest.fn(),
    healthCheck: jest.fn().mockResolvedValue(true),
    getStatus: jest.fn().mockResolvedValue({
      groq: { status: 'healthy' },
      gemini: { status: 'healthy' },
    }),
  },
}));

// Mock Redis/Bull queues
jest.mock('bull', () => {
  return jest.fn().mockImplementation(() => ({
    add: jest.fn().mockResolvedValue({ id: 'test-job-id' }),
    process: jest.fn(),
    on: jest.fn(),
    getJobs: jest.fn().mockResolvedValue([]),
    getJobCounts: jest.fn().mockResolvedValue({
      waiting: 0,
      active: 0,
      completed: 0,
      failed: 0,
      delayed: 0,
    }),
    pause: jest.fn(),
    resume: jest.fn(),
    clean: jest.fn(),
    close: jest.fn(),
  }));
});

// Mock logger to reduce noise in tests
jest.mock('@/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    job: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    token: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    api: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    performance: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    health: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
    startup: jest.fn(() => ({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
  },
}));

// Global test setup
beforeAll(async () => {
  // Set test timeout
  jest.setTimeout(30000);
});

afterAll(async () => {
  // Clean up database connections
  try {
    await db.$disconnect();
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
});

// Clean up after each test
afterEach(async () => {
  // Clear all mocks
  jest.clearAllMocks();
  
  // Clean up test data if needed
  try {
    // Only clean up if we're actually connected to a test database
    if (process.env.DATABASE_URL?.includes('test')) {
      await db.signal.deleteMany({});
      await db.tokenMetrics.deleteMany({});
      await db.socialMetrics.deleteMany({});
      await db.technicalAnalysis.deleteMany({});
      await db.aiAnalysis.deleteMany({});
      await db.jobLog.deleteMany({});
      await db.healthMetric.deleteMany({});
      await db.token.deleteMany({});
    }
  } catch (error) {
    // Ignore cleanup errors in tests
  }
});

// Helper functions for tests
export const createMockToken = (overrides = {}) => ({
  id: 'test-token-id',
  address: '0x1234567890123456789012345678901234567890',
  symbol: 'TEST',
  name: 'Test Token',
  network: 'ethereum',
  price: 1.0,
  priceChange24h: 5.0,
  volume24h: 1000000,
  marketCap: 10000000,
  liquidity: 500000,
  fdv: 15000000,
  holders: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createMockTokenMetrics = (overrides = {}) => ({
  id: 'test-metrics-id',
  tokenAddress: '0x1234567890123456789012345678901234567890',
  price: 1.0,
  volume24h: 1000000,
  marketCap: 10000000,
  liquidity: 500000,
  priceChange1h: 1.0,
  priceChange24h: 5.0,
  priceChange7d: 10.0,
  volumeChange24h: 15.0,
  liquidityChange24h: 2.0,
  holderCount: 1000,
  holderChange24h: 50,
  timestamp: new Date(),
  ...overrides,
});

export const createMockSocialMetrics = (overrides = {}) => ({
  id: 'test-social-id',
  tokenAddress: '0x1234567890123456789012345678901234567890',
  platform: 'twitter',
  mentions: 100,
  sentiment: 0.5,
  engagement: 1000,
  followers: 5000,
  influencerMentions: 5,
  hashtagCount: 20,
  timestamp: new Date(),
  ...overrides,
});

export const createMockSignal = (overrides = {}) => ({
  id: 'test-signal-id',
  tokenAddress: '0x1234567890123456789012345678901234567890',
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
  status: 'active',
  createdAt: new Date(),
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  ...overrides,
});

export const createMockJobData = (overrides = {}) => ({
  jobId: 'test-job-id',
  jobType: 'token-data',
  status: 'completed',
  startedAt: new Date(),
  completedAt: new Date(),
  duration: 1000,
  result: { processed: 10 },
  error: null,
  metadata: {},
  createdAt: new Date(),
  ...overrides,
});

// Wait helper for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockDexScreenerResponse = {
  pairs: [
    {
      chainId: 'ethereum',
      dexId: 'uniswap',
      url: 'https://dexscreener.com/ethereum/0x123',
      pairAddress: '0x123',
      baseToken: {
        address: '0x1234567890123456789012345678901234567890',
        name: 'Test Token',
        symbol: 'TEST',
      },
      quoteToken: {
        address: '0xA0b86a33E6441b8C4505B8C4505B8C4505B8C4505',
        name: 'USD Coin',
        symbol: 'USDC',
      },
      priceNative: '1.0',
      priceUsd: '1.0',
      volume: { h24: 1000000 },
      priceChange: { h24: 5.0 },
      liquidity: { usd: 500000 },
      fdv: 15000000,
      marketCap: 10000000,
    },
  ],
};

export const mockTwitterResponse = {
  data: [
    {
      id: '1234567890',
      text: 'Test tweet about $TEST token',
      created_at: '2024-01-01T00:00:00.000Z',
      author_id: '123456789',
      public_metrics: {
        retweet_count: 10,
        like_count: 50,
        reply_count: 5,
        quote_count: 2,
      },
    },
  ],
  includes: {
    users: [
      {
        id: '123456789',
        username: 'testuser',
        name: 'Test User',
        public_metrics: {
          followers_count: 1000,
          following_count: 500,
        },
      },
    ],
  },
};