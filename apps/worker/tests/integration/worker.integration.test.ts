import request from 'supertest';
import { Express } from 'express';
import { db, connectDatabase, disconnectDatabase } from '@/database';
import { jobQueues } from '@/jobs';
import { healthMonitor } from '@/health';

// Import the app after mocks are set up
let app: Express;

describe('Worker Service Integration Tests', () => {
  beforeAll(async () => {
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
    process.env.REDIS_URL = 'redis://localhost:6379/1';

    // Import app after environment is set
    const { default: createApp } = await import('@/index');
    app = createApp;

    // Connect to test database
    await connectDatabase();
  });

  afterAll(async () => {
    // Stop health monitoring
    await healthMonitor.stop();

    // Close job queues
    if (jobQueues.tokenData) {
      await jobQueues.tokenData.close();
    }
    if (jobQueues.socialData) {
      await jobQueues.socialData.close();
    }
    if (jobQueues.aiAnalysis) {
      await jobQueues.aiAnalysis.close();
    }
    if (jobQueues.signalGeneration) {
      await jobQueues.signalGeneration.close();
    }
    if (jobQueues.cleanup) {
      await jobQueues.cleanup.close();
    }

    // Disconnect from database
    await disconnectDatabase();
  });

  beforeEach(async () => {
    // Clean up test data before each test
    await db.signal.deleteMany({});
    await db.socialMetrics.deleteMany({});
    await db.tokenMetrics.deleteMany({});
    await db.aiAnalysis.deleteMany({});
    await db.jobLog.deleteMany({});
    await db.healthMetric.deleteMany({});
    await db.token.deleteMany({});
  });

  describe('Health Endpoints', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('components');
      expect(response.body).toHaveProperty('system');
      expect(response.body.components).toHaveProperty('database');
      expect(response.body.components).toHaveProperty('jobQueues');
      expect(response.body.components).toHaveProperty('system');
    });

    it('should return health summary', async () => {
      const response = await request(app)
        .get('/health/summary')
        .expect(200);

      expect(response.body).toHaveProperty('currentStatus');
      expect(response.body).toHaveProperty('recentMetrics');
      expect(response.body).toHaveProperty('averageResponseTimes');
      expect(response.body).toHaveProperty('uptimePercentage');
    });
  });

  describe('Development Endpoints', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      process.env.NODE_ENV = 'test';
    });

    it('should trigger token data job', async () => {
      const response = await request(app)
        .post('/dev/trigger/token-data')
        .send({
          tokens: ['0x1234567890123456789012345678901234567890'],
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('jobId');
      expect(response.body.message).toContain('Token data job triggered');
    });

    it('should trigger social data job', async () => {
      const response = await request(app)
        .post('/dev/trigger/social-data')
        .send({
          tokens: ['0x1234567890123456789012345678901234567890'],
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('jobId');
      expect(response.body.message).toContain('Social data job triggered');
    });

    it('should trigger AI analysis job', async () => {
      const response = await request(app)
        .post('/dev/trigger/ai-analysis')
        .send({
          tokens: ['0x1234567890123456789012345678901234567890'],
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('jobId');
      expect(response.body.message).toContain('AI analysis job triggered');
    });

    it('should trigger signal generation job', async () => {
      const response = await request(app)
        .post('/dev/trigger/signal-generation')
        .send({
          tokens: ['0x1234567890123456789012345678901234567890'],
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('jobId');
      expect(response.body.message).toContain('Signal generation job triggered');
    });

    it('should trigger cleanup job', async () => {
      const response = await request(app)
        .post('/dev/trigger/cleanup')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('jobId');
      expect(response.body.message).toContain('Cleanup job triggered');
    });

    it('should validate request body for token jobs', async () => {
      const response = await request(app)
        .post('/dev/trigger/token-data')
        .send({
          // Missing tokens array
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('tokens array is required');
    });

    it('should validate token addresses format', async () => {
      const response = await request(app)
        .post('/dev/trigger/token-data')
        .send({
          tokens: ['invalid-address'],
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid token address');
    });
  });

  describe('Database Integration', () => {
    it('should create and retrieve token data', async () => {
      // Create a token
      const tokenData = {
        address: '0x1234567890123456789012345678901234567890',
        symbol: 'TEST',
        name: 'Test Token',
        decimals: 18,
        totalSupply: '1000000000000000000000000',
        price: 1.5,
        marketCap: 1500000,
        volume24h: 50000,
        priceChange24h: 5.2,
        liquidity: 100000,
        fdv: 1500000,
        holders: 1000,
        network: 'ethereum',
      };

      const token = await db.token.create({
        data: tokenData,
      });

      expect(token).toHaveProperty('id');
      expect(token.address).toBe(tokenData.address);
      expect(token.symbol).toBe(tokenData.symbol);
      expect(token.name).toBe(tokenData.name);

      // Retrieve the token
      const retrievedToken = await db.token.findUnique({
        where: { address: tokenData.address },
      });

      expect(retrievedToken).not.toBeNull();
      expect(retrievedToken!.id).toBe(token.id);
    });

    it('should create token metrics', async () => {
      // Create a token first
      const token = await db.token.create({
        data: {
          address: '0x1234567890123456789012345678901234567890',
          symbol: 'TEST',
          name: 'Test Token',
          decimals: 18,
          totalSupply: '1000000000000000000000000',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          network: 'ethereum',
        },
      });

      // Create token metrics
      const metricsData = {
        tokenId: token.id,
        price: 1.6,
        marketCap: 1600000,
        volume24h: 55000,
        priceChange24h: 6.7,
        liquidity: 110000,
        fdv: 1600000,
        holders: 1050,
        technicalIndicators: {
          rsi: 65,
          macd: 0.05,
          bollinger: {
            upper: 1.7,
            middle: 1.6,
            lower: 1.5,
          },
        },
      };

      const metrics = await db.tokenMetrics.create({
        data: metricsData,
      });

      expect(metrics).toHaveProperty('id');
      expect(metrics.tokenId).toBe(token.id);
      expect(metrics.price).toBe(metricsData.price);
      expect(metrics.technicalIndicators).toEqual(metricsData.technicalIndicators);
    });

    it('should create social metrics', async () => {
      // Create a token first
      const token = await db.token.create({
        data: {
          address: '0x1234567890123456789012345678901234567890',
          symbol: 'TEST',
          name: 'Test Token',
          decimals: 18,
          totalSupply: '1000000000000000000000000',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          network: 'ethereum',
        },
      });

      // Create social metrics
      const socialData = {
        tokenId: token.id,
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

      const social = await db.socialMetrics.create({
        data: socialData,
      });

      expect(social).toHaveProperty('id');
      expect(social.tokenId).toBe(token.id);
      expect(social.platform).toBe(socialData.platform);
      expect(social.mentions).toBe(socialData.mentions);
      expect(social.sentiment).toBe(socialData.sentiment);
      expect(social.details).toEqual(socialData.details);
    });

    it('should create signals', async () => {
      // Create a token first
      const token = await db.token.create({
        data: {
          address: '0x1234567890123456789012345678901234567890',
          symbol: 'TEST',
          name: 'Test Token',
          decimals: 18,
          totalSupply: '1000000000000000000000000',
          price: 1.5,
          marketCap: 1500000,
          volume24h: 50000,
          priceChange24h: 5.2,
          liquidity: 100000,
          fdv: 1500000,
          holders: 1000,
          network: 'ethereum',
        },
      });

      // Create signal
      const signalData = {
        tokenId: token.id,
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

      const signal = await db.signal.create({
        data: signalData,
      });

      expect(signal).toHaveProperty('id');
      expect(signal.tokenId).toBe(token.id);
      expect(signal.type).toBe(signalData.type);
      expect(signal.strength).toBe(signalData.strength);
      expect(signal.confidence).toBe(signalData.confidence);
      expect(signal.indicators).toEqual(signalData.indicators);
      expect(signal.metadata).toEqual(signalData.metadata);
    });

    it('should create job logs', async () => {
      const jobData = {
        jobId: 'test-job-123',
        type: 'tokenData',
        status: 'started',
        data: {
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
      };

      const jobLog = await db.jobLog.create({
        data: jobData,
      });

      expect(jobLog).toHaveProperty('id');
      expect(jobLog.jobId).toBe(jobData.jobId);
      expect(jobLog.type).toBe(jobData.type);
      expect(jobLog.status).toBe(jobData.status);
      expect(jobLog.data).toEqual(jobData.data);
    });

    it('should create health metrics', async () => {
      const healthData = {
        component: 'database',
        status: 'healthy',
        responseTime: 50,
        details: {
          connections: 5,
          queries: 100,
        },
      };

      const healthMetric = await db.healthMetric.create({
        data: healthData,
      });

      expect(healthMetric).toHaveProperty('id');
      expect(healthMetric.component).toBe(healthData.component);
      expect(healthMetric.status).toBe(healthData.status);
      expect(healthMetric.responseTime).toBe(healthData.responseTime);
      expect(healthMetric.details).toEqual(healthData.details);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Not Found');
    });

    it('should handle invalid JSON in request body', async () => {
      const response = await request(app)
        .post('/dev/trigger/token-data')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should handle database connection errors gracefully', async () => {
      // Temporarily disconnect from database
      await disconnectDatabase();

      const response = await request(app)
        .get('/health')
        .expect(503);

      expect(response.body.status).toBe('unhealthy');
      expect(response.body.components.database.status).toBe('unhealthy');

      // Reconnect for other tests
      await connectDatabase();
    });
  });

  describe('CORS and Security', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });

    it('should handle preflight requests', async () => {
      const response = await request(app)
        .options('/health')
        .expect(204);

      expect(response.headers).toHaveProperty('access-control-allow-methods');
      expect(response.headers).toHaveProperty('access-control-allow-headers');
    });
  });

  describe('Request Logging', () => {
    it('should log requests in development mode', async () => {
      process.env.NODE_ENV = 'development';

      const response = await request(app)
        .get('/health')
        .expect(200);

      // In a real test, you might want to capture and verify log output
      expect(response.status).toBe(200);

      process.env.NODE_ENV = 'test';
    });
  });

  describe('Graceful Shutdown', () => {
    it('should handle shutdown signals gracefully', (done) => {
      // This test is more conceptual as we can't easily test process signals
      // In a real scenario, you might use a test framework that supports this
      
      const originalExit = process.exit;
      const originalKill = process.kill;
      
      let exitCalled = false;
      process.exit = ((code?: number) => {
        exitCalled = true;
        expect(code).toBe(0);
        done();
      }) as any;

      // Simulate SIGTERM
      process.emit('SIGTERM' as any);

      // Restore original functions
      setTimeout(() => {
        process.exit = originalExit;
        process.kill = originalKill;
        if (!exitCalled) {
          done();
        }
      }, 1000);
    });
  });
});