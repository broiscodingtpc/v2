import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server Configuration
  PORT: parseInt(process.env.PORT || '3002'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // Redis Configuration (for Bull queues)
  REDIS_URL: process.env.REDIS_URL || process.env.REDIS_PUBLIC_URL || 'redis://localhost:6379',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379'),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
  REDIS_DB: parseInt(process.env.REDIS_DB || '0'),
  
  // Redis Connection Options
  REDIS_CONNECT_TIMEOUT: parseInt(process.env.REDIS_CONNECT_TIMEOUT || '10000'),
  REDIS_COMMAND_TIMEOUT: parseInt(process.env.REDIS_COMMAND_TIMEOUT || '5000'),
  REDIS_MAX_RETRIES: parseInt(process.env.REDIS_MAX_RETRIES || '3'),
  REDIS_RETRY_DELAY: parseInt(process.env.REDIS_RETRY_DELAY || '100'),
  
  // External APIs
  DEXSCREENER_API_URL: process.env.DEXSCREENER_API_URL || 'https://api.dexscreener.com',
  PUMPPORTAL_API_KEY: process.env.PUMPPORTAL_API_KEY || '',
  
  // AI Services
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-pro',
  
  // Twitter/X API
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN || '',
  TWITTER_API_KEY: process.env.TWITTER_API_KEY || '',
  TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET || '',
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN || '',
  TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
  
  // Job Configuration
  JOB_CONCURRENCY: parseInt(process.env.JOB_CONCURRENCY || '5'),
  JOB_ATTEMPTS: parseInt(process.env.JOB_ATTEMPTS || '3'),
  JOB_BACKOFF_DELAY: parseInt(process.env.JOB_BACKOFF_DELAY || '5000'),
  
  // Data Collection Intervals (in minutes)
  TOKEN_DATA_INTERVAL: parseInt(process.env.TOKEN_DATA_INTERVAL || '5'),
  SOCIAL_DATA_INTERVAL: parseInt(process.env.SOCIAL_DATA_INTERVAL || '15'),
  AI_ANALYSIS_INTERVAL: parseInt(process.env.AI_ANALYSIS_INTERVAL || '30'),
  SIGNAL_GENERATION_INTERVAL: parseInt(process.env.SIGNAL_GENERATION_INTERVAL || '60'),
  
  // Rate Limiting
  DEXSCREENER_RATE_LIMIT: parseInt(process.env.DEXSCREENER_RATE_LIMIT || '300'), // requests per minute
  TWITTER_RATE_LIMIT: parseInt(process.env.TWITTER_RATE_LIMIT || '100'),
  AI_RATE_LIMIT: parseInt(process.env.AI_RATE_LIMIT || '60'),
  
  // Data Processing
  MAX_TOKENS_PER_BATCH: parseInt(process.env.MAX_TOKENS_PER_BATCH || '100'),
  MAX_TWEETS_PER_TOKEN: parseInt(process.env.MAX_TWEETS_PER_TOKEN || '50'),
  SENTIMENT_THRESHOLD: parseFloat(process.env.SENTIMENT_THRESHOLD || '0.1'),
  
  // Signal Generation
  MIN_CONFIDENCE_SCORE: parseFloat(process.env.MIN_CONFIDENCE_SCORE || '0.6'),
  MAX_SIGNALS_PER_TOKEN: parseInt(process.env.MAX_SIGNALS_PER_TOKEN || '5'),
  SIGNAL_EXPIRY_HOURS: parseInt(process.env.SIGNAL_EXPIRY_HOURS || '24'),
  
  // Monitoring
  HEALTH_CHECK_INTERVAL: parseInt(process.env.HEALTH_CHECK_INTERVAL || '60'), // seconds
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // WebSocket Configuration
  WS_PORT: parseInt(process.env.WS_PORT || '3003'),
  WS_HEARTBEAT_INTERVAL: parseInt(process.env.WS_HEARTBEAT_INTERVAL || '30000'),
  
  // Blockchain Networks
  SUPPORTED_NETWORKS: (process.env.SUPPORTED_NETWORKS || 'solana,ethereum,bsc,polygon').split(','),
  
  // Data Retention
  DATA_RETENTION_DAYS: parseInt(process.env.DATA_RETENTION_DAYS || '30'),
  LOG_RETENTION_DAYS: parseInt(process.env.LOG_RETENTION_DAYS || '7'),
  
  // Performance Tuning
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE || '50'),
  PARALLEL_WORKERS: parseInt(process.env.PARALLEL_WORKERS || '4'),
  MEMORY_LIMIT_MB: parseInt(process.env.MEMORY_LIMIT_MB || '512'),
  
  // Feature Flags
  ENABLE_TWITTER_ANALYSIS: process.env.ENABLE_TWITTER_ANALYSIS === 'true',
  ENABLE_AI_SIGNALS: process.env.ENABLE_AI_SIGNALS === 'true',
  ENABLE_WEBSOCKET: process.env.ENABLE_WEBSOCKET === 'true',
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
  
  // Validation
  validate() {
    const required = [
      'DATABASE_URL'
    ];
    
    const missing = required.filter(key => !this[key as keyof typeof this]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    // Validate AI service configuration
    if (this.ENABLE_AI_SIGNALS && !this.GROQ_API_KEY && !this.GEMINI_API_KEY) {
      console.warn('Warning: AI signals enabled but no AI API keys provided');
    }
    
    // Validate Twitter configuration
    if (this.ENABLE_TWITTER_ANALYSIS && !this.TWITTER_BEARER_TOKEN) {
      console.warn('Warning: Twitter analysis enabled but no Twitter API token provided');
    }
    
    // Validate Redis configuration for production
    if (this.NODE_ENV === 'production' && this.REDIS_URL === 'redis://localhost:6379') {
      console.warn('Warning: Using default Redis URL in production');
    }
  }
};

// Validate configuration on import
config.validate();