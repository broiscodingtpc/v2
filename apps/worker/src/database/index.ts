import { PrismaClient } from '@prisma/client';
import { config } from '@/config';
import { logger } from '@/utils/logger';

// Extend PrismaClient with custom methods
class DatabaseClient extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: config.database.url,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    // Log database queries in development
    if (config.nodeEnv === 'development') {
      this.$on('query', (e) => {
        logger.debug('Database query executed', {
          query: e.query,
          params: e.params,
          duration: e.duration,
        });
      });
    }

    // Log database errors
    this.$on('error', (e) => {
      logger.error('Database error', {
        error: e.message,
        target: e.target,
      });
    });

    // Log database info
    this.$on('info', (e) => {
      logger.info('Database info', {
        message: e.message,
        target: e.target,
      });
    });

    // Log database warnings
    this.$on('warn', (e) => {
      logger.warn('Database warning', {
        message: e.message,
        target: e.target,
      });
    });
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      logger.error('Database health check failed', { error });
      return false;
    }
  }

  // Get database statistics
  async getStats() {
    try {
      const [
        userCount,
        tokenCount,
        signalCount,
        alertCount,
        jobLogCount,
      ] = await Promise.all([
        this.user.count(),
        this.token.count(),
        this.signal.count({ where: { status: 'active' } }),
        this.alert.count({ where: { isActive: true } }),
        this.jobLog.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
        }),
      ]);

      return {
        users: userCount,
        tokens: tokenCount,
        activeSignals: signalCount,
        activeAlerts: alertCount,
        jobsLast24h: jobLogCount,
      };
    } catch (error) {
      logger.error('Failed to get database stats', { error });
      throw error;
    }
  }

  // Clean up old data
  async cleanup(options: {
    signalRetentionDays?: number;
    metricsRetentionDays?: number;
    jobLogRetentionDays?: number;
  } = {}) {
    const {
      signalRetentionDays = 30,
      metricsRetentionDays = 90,
      jobLogRetentionDays = 7,
    } = options;

    try {
      const now = new Date();
      const signalCutoff = new Date(now.getTime() - signalRetentionDays * 24 * 60 * 60 * 1000);
      const metricsCutoff = new Date(now.getTime() - metricsRetentionDays * 24 * 60 * 60 * 1000);
      const jobLogCutoff = new Date(now.getTime() - jobLogRetentionDays * 24 * 60 * 60 * 1000);

      const [
        expiredSignals,
        oldMetrics,
        oldSocialMetrics,
        oldAnalysis,
        oldJobLogs,
      ] = await Promise.all([
        this.signal.deleteMany({
          where: {
            OR: [
              { status: 'expired' },
              { expiresAt: { lt: now } },
              { createdAt: { lt: signalCutoff } },
            ],
          },
        }),
        this.tokenMetrics.deleteMany({
          where: { timestamp: { lt: metricsCutoff } },
        }),
        this.socialMetrics.deleteMany({
          where: { timestamp: { lt: metricsCutoff } },
        }),
        this.technicalAnalysis.deleteMany({
          where: { timestamp: { lt: metricsCutoff } },
        }),
        this.jobLog.deleteMany({
          where: { createdAt: { lt: jobLogCutoff } },
        }),
      ]);

      logger.info('Database cleanup completed', {
        expiredSignals: expiredSignals.count,
        oldMetrics: oldMetrics.count,
        oldSocialMetrics: oldSocialMetrics.count,
        oldAnalysis: oldAnalysis.count,
        oldJobLogs: oldJobLogs.count,
      });

      return {
        expiredSignals: expiredSignals.count,
        oldMetrics: oldMetrics.count,
        oldSocialMetrics: oldSocialMetrics.count,
        oldAnalysis: oldAnalysis.count,
        oldJobLogs: oldJobLogs.count,
      };
    } catch (error) {
      logger.error('Database cleanup failed', { error });
      throw error;
    }
  }

  // Graceful disconnect
  async gracefulDisconnect() {
    try {
      await this.$disconnect();
      logger.info('Database connection closed gracefully');
    } catch (error) {
      logger.error('Error during database disconnect', { error });
      throw error;
    }
  }
}

// Create singleton instance
export const db = new DatabaseClient();

// Connection management
export async function connectDatabase() {
  try {
    await db.$connect();
    logger.info('Database connected successfully');
    
    // Test connection
    const isHealthy = await db.healthCheck();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }

    return db;
  } catch (error) {
    logger.error('Failed to connect to database', { error });
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await db.gracefulDisconnect();
  } catch (error) {
    logger.error('Failed to disconnect from database', { error });
    throw error;
  }
}

// Database utilities
export class DatabaseUtils {
  static async upsertToken(tokenData: {
    address: string;
    symbol: string;
    name: string;
    network: string;
    price: number;
    priceChange24h?: number;
    volume24h: number;
    marketCap?: number;
    liquidity?: number;
    fdv?: number;
    holders?: number;
  }) {
    return db.token.upsert({
      where: { address: tokenData.address },
      update: {
        symbol: tokenData.symbol,
        name: tokenData.name,
        price: tokenData.price,
        priceChange24h: tokenData.priceChange24h,
        volume24h: tokenData.volume24h,
        marketCap: tokenData.marketCap,
        liquidity: tokenData.liquidity,
        fdv: tokenData.fdv,
        holders: tokenData.holders,
        updatedAt: new Date(),
      },
      create: tokenData,
    });
  }

  static async createTokenMetrics(tokenAddress: string, metrics: {
    price: number;
    volume24h: number;
    marketCap?: number;
    liquidity?: number;
    priceChange1h?: number;
    priceChange24h?: number;
    priceChange7d?: number;
    volumeChange24h?: number;
    liquidityChange24h?: number;
    holderCount?: number;
    holderChange24h?: number;
  }) {
    return db.tokenMetrics.create({
      data: {
        tokenAddress,
        ...metrics,
      },
    });
  }

  static async createSocialMetrics(tokenAddress: string, platform: string, metrics: {
    mentions: number;
    sentiment: number;
    engagement: number;
    followers?: number;
    influencerMentions?: number;
    hashtagCount?: number;
  }) {
    return db.socialMetrics.create({
      data: {
        tokenAddress,
        platform,
        ...metrics,
      },
    });
  }

  static async createSignal(tokenAddress: string, signal: {
    type: string;
    action: string;
    strength: number;
    confidence: number;
    price: number;
    targetPrice?: number;
    stopLoss?: number;
    timeframe: string;
    riskLevel: string;
    description: string;
    reasoning: string;
    metadata?: any;
    expiresAt?: Date;
  }) {
    return db.signal.create({
      data: {
        tokenAddress,
        ...signal,
      },
    });
  }

  static async getActiveSignals(tokenAddress?: string, limit = 50) {
    return db.signal.findMany({
      where: {
        status: 'active',
        ...(tokenAddress && { tokenAddress }),
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      include: {
        token: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  static async getTokensNeedingUpdate(type: 'metrics' | 'social' | 'analysis', hours = 1) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const whereClause = {
      OR: [
        { updatedAt: { lt: cutoff } },
        type === 'metrics' ? { tokenMetrics: { none: { timestamp: { gte: cutoff } } } } :
        type === 'social' ? { socialMetrics: { none: { timestamp: { gte: cutoff } } } } :
        { aiAnalysis: { none: { timestamp: { gte: cutoff } } } },
      ],
    };

    return db.token.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'asc' },
      take: 100,
    });
  }

  static async logJob(jobData: {
    jobId: string;
    jobType: string;
    status: string;
    startedAt?: Date;
    completedAt?: Date;
    duration?: number;
    result?: any;
    error?: string;
    metadata?: any;
  }) {
    return db.jobLog.create({
      data: jobData,
    });
  }

  static async updateJobLog(jobId: string, updates: {
    status?: string;
    completedAt?: Date;
    duration?: number;
    result?: any;
    error?: string;
  }) {
    return db.jobLog.updateMany({
      where: { jobId },
      data: updates,
    });
  }
}

export default db;