import { PrismaClient } from '@prisma/client';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';

// Extend PrismaClient with custom methods
class DatabaseClient extends PrismaClient {
  private logger = createLogger('database');

  constructor() {
    super({
      datasources: {
        db: {
          url: config.DATABASE_URL,
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
    if (config.NODE_ENV === 'development') {
      (this as any).$on('query', (e: any) => {
        this.logger.debug('Database query executed', {
          query: e.query,
          params: e.params,
          duration: e.duration,
        });
      });
    }

    // Log database errors
    (this as any).$on('error', (e: any) => {
      this.logger.error('Database error', {
        error: e.message,
        target: e.target,
      });
    });

    // Log database info
    (this as any).$on('info', (e: any) => {
      this.logger.info('Database info', {
        message: e.message,
        target: e.target,
      });
    });

    // Log database warnings
    (this as any).$on('warn', (e: any) => {
      this.logger.warn('Database warning', {
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
      this.logger.error('Database health check failed', { error });
      return false;
    }
  }

  // Get database statistics
  async getStats() {
    try {
      const [
        userCount,
        tokenCount,
        activeSignalsCount,
        signalsLast24hCount,
      ] = await Promise.all([
        this.user.count(),
        this.token.count(),
        this.signal.count({ where: { status: 'active' } }),
        this.signal.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

      return {
        users: userCount,
        tokens: tokenCount,
        activeSignals: activeSignalsCount,
        signalsLast24h: signalsLast24hCount,
      };
    } catch (error) {
      this.logger.error('Failed to get database stats', { error });
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
    } = options;

    try {
      const now = new Date();
      const signalCutoff = new Date(now.getTime() - signalRetentionDays * 24 * 60 * 60 * 1000);
      const metricsCutoff = new Date(now.getTime() - metricsRetentionDays * 24 * 60 * 60 * 1000);
      // jobLogRetentionDays retained for future log cleanup configuration

      const [
        expiredSignals,
        oldTokenMetrics,
      ] = await Promise.all([
        this.signal.deleteMany({
          where: {
            OR: [
              { expiresAt: { lt: now } },
              { createdAt: { lt: signalCutoff }, status: 'expired' },
            ],
          },
        }),
        this.tokenMetrics.deleteMany({
          where: { timestamp: { lt: metricsCutoff } },
        }),
      ]);

      this.logger.info('Database cleanup completed', {
        expiredSignals: expiredSignals.count,
        oldTokenMetrics: oldTokenMetrics.count,
      });

      return {
        expiredSignals: expiredSignals.count,
        oldTokenMetrics: oldTokenMetrics.count,
      };
    } catch (error) {
      this.logger.error('Database cleanup failed', { error });
      throw error;
    }
  }

  // Graceful disconnect
  async gracefulDisconnect() {
    try {
      await this.$disconnect();
      this.logger.info('Database connection closed gracefully');
    } catch (error) {
      this.logger.error('Error during database disconnect', { error });
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
    const logger = createLogger('database');
    logger.info('Database connected successfully');
    
    // Test connection
    const isHealthy = await db.healthCheck();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }

    return db;
  } catch (error) {
    const logger = createLogger('database');
    logger.error('Failed to connect to database', { error });
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await db.gracefulDisconnect();
  } catch (error) {
    const logger = createLogger('database');
    logger.error('Failed to disconnect from database', { error });
    throw error;
  }
}

// Database utilities
export class DatabaseUtils {
  static async createSignal(data: {
    tokenAddress: string;
    type: string;
    action: string;
    strength: number;
    confidence: number;
    price: number;
    targetPrice?: number | null;
    stopLoss?: number | null;
    timeframe: string;
    riskLevel: string;
    reasoning?: string;
    metadata?: any;
    status?: string;
    expiresAt?: Date | null;
  }) {
    return db.signal.create({
      data: {
        tokenAddress: data.tokenAddress,
        type: data.type,
        action: data.action,
        strength: data.strength,
        confidence: data.confidence,
        price: data.price,
        targetPrice: data.targetPrice ?? null,
        stopLoss: data.stopLoss ?? null,
        timeframe: data.timeframe,
        riskLevel: data.riskLevel,
        description: data.reasoning || '',
        reasoning: data.reasoning || '',
        metadata: data.metadata || {},
        status: data.status || 'active',
        expiresAt: data.expiresAt ?? null,
      },
    });
  }

  static async getTokensNeedingUpdate(hours = 1) {
    const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    return db.token.findMany({
      where: {
        updatedAt: { lt: cutoff },
      },
      orderBy: { updatedAt: 'asc' },
      take: 100,
    });
  }

  // Remove jobLog methods as the model doesn't exist in schema
}

export default db;
