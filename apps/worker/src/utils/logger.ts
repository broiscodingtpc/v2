import winston from 'winston';
import { config } from '@/config';

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, service, jobId, tokenId, ...meta }) => {
    let logMessage = `${timestamp} [${level.toUpperCase()}]`;
    
    if (service) logMessage += ` [${service}]`;
    if (jobId) logMessage += ` [Job:${jobId}]`;
    if (tokenId) logMessage += ` [Token:${tokenId}]`;
    
    logMessage += `: ${message}`;
    
    if (Object.keys(meta).length > 0) {
      logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    return logMessage;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: logFormat,
  defaultMeta: { service: 'metapulse-worker' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ],
  
  // Handle exceptions and rejections
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ]
});

// Enhanced logging methods with context
export const createLogger = (service: string) => {
  return {
    info: (message: string, meta?: any) => {
      logger.info(message, { service, ...meta });
    },
    
    warn: (message: string, meta?: any) => {
      logger.warn(message, { service, ...meta });
    },
    
    error: (message: string, error?: Error | any, meta?: any) => {
      const errorMeta = error instanceof Error ? {
        error: error.message,
        stack: error.stack,
        ...meta
      } : { error, ...meta };
      
      logger.error(message, { service, ...errorMeta });
    },
    
    debug: (message: string, meta?: any) => {
      logger.debug(message, { service, ...meta });
    },
    
    // Job-specific logging
    jobStart: (jobId: string, jobType: string, meta?: any) => {
      logger.info(`Job started: ${jobType}`, { 
        service, 
        jobId, 
        jobType,
        ...meta 
      });
    },
    
    jobComplete: (jobId: string, jobType: string, duration: number, meta?: any) => {
      logger.info(`Job completed: ${jobType}`, { 
        service, 
        jobId, 
        jobType,
        duration: `${duration}ms`,
        ...meta 
      });
    },
    
    jobFailed: (jobId: string, jobType: string, error: Error, meta?: any) => {
      logger.error(`Job failed: ${jobType}`, error, { 
        service, 
        jobId, 
        jobType,
        ...meta 
      });
    },
    
    // Token-specific logging
    tokenProcessed: (tokenId: string, action: string, meta?: any) => {
      logger.info(`Token ${action}`, { 
        service, 
        tokenId, 
        action,
        ...meta 
      });
    },
    
    tokenError: (tokenId: string, action: string, error: Error, meta?: any) => {
      logger.error(`Token ${action} failed`, error, { 
        service, 
        tokenId, 
        action,
        ...meta 
      });
    },
    
    // API call logging
    apiCall: (endpoint: string, method: string, status: number, duration: number, meta?: any) => {
      const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info';
      logger.log(level, `API call: ${method} ${endpoint}`, {
        service,
        endpoint,
        method,
        status,
        duration: `${duration}ms`,
        ...meta
      });
    },
    
    // Performance logging
    performance: (operation: string, duration: number, meta?: any) => {
      const level = duration > 5000 ? 'warn' : 'info';
      logger.log(level, `Performance: ${operation}`, {
        service,
        operation,
        duration: `${duration}ms`,
        ...meta
      });
    },
    
    // Rate limit logging
    rateLimit: (service: string, limit: number, remaining: number, resetTime: Date) => {
      logger.warn(`Rate limit warning: ${service}`, {
        service,
        rateLimitService: service,
        limit,
        remaining,
        resetTime: resetTime.toISOString()
      });
    },
    
    // Health check logging
    healthCheck: (status: 'healthy' | 'degraded' | 'unhealthy', checks: Record<string, boolean>) => {
      const level = status === 'healthy' ? 'info' : status === 'degraded' ? 'warn' : 'error';
      logger.log(level, `Health check: ${status}`, {
        service,
        healthStatus: status,
        checks
      });
    }
  };
};

// Default logger instance
export const log = createLogger('worker');

// Metrics logging
export const logMetrics = (metrics: Record<string, number>) => {
  logger.info('Worker metrics', {
    service: 'metrics',
    ...metrics
  });
};

// Startup logging
export const logStartup = (config: any) => {
  logger.info('Worker service starting', {
    service: 'startup',
    nodeEnv: config.NODE_ENV,
    port: config.PORT,
    redisUrl: config.REDIS_URL ? 'configured' : 'not configured',
    aiEnabled: config.ENABLE_AI_SIGNALS,
    twitterEnabled: config.ENABLE_TWITTER_ANALYSIS,
    websocketEnabled: config.ENABLE_WEBSOCKET
  });
};

// Shutdown logging
export const logShutdown = (reason: string) => {
  logger.info('Worker service shutting down', {
    service: 'shutdown',
    reason
  });
};

export default logger;