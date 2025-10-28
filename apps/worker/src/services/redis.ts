import IORedis from 'ioredis';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';

const log = createLogger('redis');

export function makeRedis(): IORedis {
  const useTLS = process.env.REDIS_TLS === 'true';
  
  log.info('Creating Redis connection', {
    url: config.REDIS_URL.replace(/\/\/.*@/, '//***@'), // Hide password in logs
    tls: useTLS
  });

  return new IORedis(config.REDIS_URL, {
    // Avoid request-level hard fails causing unhandled rejections during boot
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    
    // Keep trying with a modest backoff
    retryStrategy: (times) => {
      const delay = Math.min(50 * times, 2000);
      log.warn(`Redis connection retry ${times}, delay: ${delay}ms`);
      return delay;
    },
    
    // Always reconnect on errors (useful on managed providers)
    reconnectOnError: (err) => {
      log.warn('Redis reconnecting on error:', err.message);
      return true;
    },
    
    // Connection options
    connectTimeout: config.REDIS_CONNECT_TIMEOUT,
    commandTimeout: config.REDIS_COMMAND_TIMEOUT,
    lazyConnect: true,
    keepAlive: 30000,
    family: 4,
    
    // TLS configuration
    tls: useTLS ? {} : undefined,
    
    // Event handlers
    onConnect: () => {
      log.info('Redis connected successfully');
    },
    
    onReady: () => {
      log.info('Redis ready for commands');
    },
    
    onError: (err) => {
      log.error('Redis connection error:', err);
    },
    
    onClose: () => {
      log.warn('Redis connection closed');
    },
    
    onReconnecting: () => {
      log.info('Redis reconnecting...');
    }
  });
}

export async function ensureRedisReady(): Promise<boolean> {
  try {
    const redis = makeRedis();
    await redis.ping();
    redis.disconnect();
    log.info('Redis health check passed');
    return true;
  } catch (error) {
    log.error('Redis health check failed:', error);
    return false;
  }
}

export async function testRedisConnection(): Promise<boolean> {
  try {
    const redis = makeRedis();
    await redis.ping();
    const info = await redis.info('server');
    log.info('Redis connection test successful', {
      version: info.split('\n').find(line => line.startsWith('redis_version:'))?.split(':')[1]?.trim()
    });
    redis.disconnect();
    return true;
  } catch (error) {
    log.error('Redis connection test failed:', error);
    return false;
  }
}
