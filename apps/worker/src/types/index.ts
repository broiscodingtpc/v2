// Token and Market Data Types
export interface Token {
  id: string;
  address: string;
  symbol: string;
  name: string;
  network: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  fdv: number;
  holders: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenMetrics {
  tokenId: string;
  price: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  volumeChange24h: number;
  liquidityChange24h: number;
  holderCount: number;
  holderChange24h: number;
  timestamp: Date;
}

export interface PriceData {
  tokenAddress: string;
  price: number;
  volume: number;
  marketCap: number;
  liquidity: number;
  timestamp: Date;
  source: 'dexscreener' | 'coingecko' | 'coinmarketcap';
}

// Social Media Types
export interface SocialMetrics {
  tokenAddress: string;
  platform: 'twitter' | 'telegram' | 'discord' | 'reddit';
  mentions: number;
  sentiment: number;
  engagement: number;
  followers: number;
  influencerMentions: number;
  hashtagCount: number;
  timestamp: Date;
}

export interface Tweet {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorFollowers: number;
  createdAt: Date;
  likes: number;
  retweets: number;
  replies: number;
  sentiment: number;
  confidence: number;
  tokens: string[];
}

export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  author: string;
  authorFollowers: number;
  engagement: number;
  sentiment: number;
  confidence: number;
  tokens: string[];
  createdAt: Date;
}

// AI Analysis Types
export interface AIAnalysis {
  id: string;
  tokenId: string;
  type: 'technical' | 'fundamental' | 'sentiment' | 'social';
  analysis: string;
  confidence: number;
  sentiment: number;
  signals: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: '1h' | '4h' | '1d' | '1w';
  createdAt: Date;
  model: string;
}

export interface TradingSignal {
  id: string;
  tokenId: string;
  type: 'buy' | 'sell' | 'hold';
  strength: number;
  confidence: number;
  reasoning: string;
  technicalIndicators: Record<string, number>;
  socialSentiment: number;
  aiAnalysis: string;
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
  expiresAt: Date;
  createdAt: Date;
  status: 'active' | 'expired' | 'triggered';
}

// Job Types
export interface JobData {
  id: string;
  type: string;
  payload: any;
  priority?: number;
  delay?: number;
  attempts?: number;
  createdAt: Date;
}

export interface TokenDataJob {
  tokenAddresses: string[];
  network: string;
  batchId: string;
}

export interface SocialDataJob {
  tokens: string[];
  platform: string;
  keywords: string[];
  batchId: string;
}

export interface AIAnalysisJob {
  tokenId: string;
  analysisType: 'technical' | 'fundamental' | 'sentiment' | 'social';
  data: {
    priceData: PriceData[];
    socialData: SocialMetrics[];
    technicalIndicators: Record<string, number>;
  };
}

export interface SignalGenerationJob {
  tokenId: string;
  analyses: AIAnalysis[];
  marketData: TokenMetrics;
  socialData: SocialMetrics[];
}

// API Response Types
export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export interface CoinGeckoToken {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'price_update' | 'signal_update' | 'social_update' | 'alert';
  data: any;
  timestamp: Date;
}

export interface PriceUpdateMessage {
  type: 'price_update';
  data: {
    tokenAddress: string;
    price: number;
    change24h: number;
    volume24h: number;
  };
  timestamp: Date;
}

export interface SignalUpdateMessage {
  type: 'signal_update';
  data: TradingSignal;
  timestamp: Date;
}

// Health Check Types
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  services: {
    database: boolean;
    redis: boolean;
    dexscreener: boolean;
    twitter: boolean;
    ai: boolean;
  };
  metrics: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    activeJobs: number;
    completedJobs: number;
    failedJobs: number;
  };
}

// Configuration Types
export interface WorkerConfig {
  concurrency: number;
  attempts: number;
  backoffDelay: number;
  removeOnComplete: number;
  removeOnFail: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
}

// Error Types
export interface WorkerError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  jobId?: string;
  tokenId?: string;
}

// Metrics Types
export interface WorkerMetrics {
  jobsProcessed: number;
  jobsFailed: number;
  averageProcessingTime: number;
  tokensProcessed: number;
  signalsGenerated: number;
  apiCallsCount: number;
  errorRate: number;
  uptime: number;
  memoryUsage: number;
  timestamp: Date;
}

// Database Models (Prisma-compatible)
export interface User {
  id: string;
  telegramId?: string;
  username?: string;
  email?: string;
  preferences: Record<string, any>;
  watchlist: string[];
  alerts: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  userId: string;
  tokenId: string;
  type: 'price' | 'volume' | 'signal';
  condition: 'above' | 'below' | 'change';
  value: number;
  isActive: boolean;
  triggeredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}