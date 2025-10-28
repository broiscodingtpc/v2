import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Bot Configuration
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_WEBHOOK_URL: process.env.TELEGRAM_WEBHOOK_URL || '',
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET || '',
  
  // Server Configuration
  PORT: parseInt(process.env.PORT || '3001'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // API Configuration
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  API_KEY: process.env.API_KEY || '',
  
  // Database Configuration
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // External APIs
  DEXSCREENER_API_URL: process.env.DEXSCREENER_API_URL || 'https://api.dexscreener.com',
  
  // AI Services
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
  // Social Links
  TELEGRAM_GROUP_URL: 'https://t.me/metapulseai',
  TWITTER_URL: 'https://x.com/METAPULSaibot',
  WEBSITE_URL: 'https://metapulse.io',
  
  // Bot Settings
  MAX_WATCHLIST_ITEMS: 50,
  MAX_ALERTS_PER_USER: 20,
  SIGNAL_CACHE_TTL: 300, // 5 minutes
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 30,
  
  // Message Settings
  MAX_MESSAGE_LENGTH: 4096,
  PAGINATION_SIZE: 10,
  
  // Validation
  validate() {
    const required = [
      'TELEGRAM_BOT_TOKEN',
      'DATABASE_URL'
    ];
    
    const missing = required.filter(key => !this[key as keyof typeof this]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    
    if (this.NODE_ENV === 'production' && !this.TELEGRAM_WEBHOOK_URL) {
      throw new Error('TELEGRAM_WEBHOOK_URL is required in production');
    }
  }
};

// Validate configuration on import
config.validate();