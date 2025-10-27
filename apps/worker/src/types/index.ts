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

// Add TrendingTopic interface
export interface TrendingTopic {
  topic: string;
  mentions: number;
  sentiment: number;
  volume: number;
  volume24h?: number;
  volumeChange?: number;
  engagement?: number;
  timestamp: Date;
}
export interface SocialMetrics {
  id?: string;
  tokenId?: string;
  tokenAddress: string;
  platform: 'twitter' | 'telegram' | 'discord' | 'reddit';
  mentions: number;
  sentiment: number;
  engagement: number;
  followers: number;
  influencerMentions: number;
  hashtagCount: number;
  posts?: number;
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
  publicMetrics?: {
    likeCount: number;
    retweetCount: number;
    replyCount: number;
    quoteCount: number;
  };
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
  type: 'technical' | 'fundamental' | 'sentiment' | 'social' | 'comprehensive';
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
  tokenId?: string;
  tokenAddresses?: string[];
  signalTypes?: SignalType[];
  analyses?: AIAnalysis[];
  marketData?: TokenMetrics;
  socialData?: SocialMetrics[];
  batchId?: string;
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
// Health Monitoring Types
export interface HealthMetric {
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  timestamp: Date;
}

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

// Signal Types
export type SignalType = 'technical' | 'momentum' | 'volume' | 'social' | 'ai';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Signal {
  id: string;
  tokenAddress: string;
  type: SignalType;
  action: 'buy' | 'sell' | 'hold' | 'watch';
  strength: number;
  confidence: number;
  price: number;
  targetPrice?: number | null;
  stopLoss?: number | null;
  timeframe: string;
  riskLevel?: RiskLevel;
  reasoning?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date | null;
}

// AI Analysis Result Types used by processors
export interface TechnicalAnalysis {
  tokenAddress: string;
  timeframe: string;
  indicators?: Record<string, any>;
  signals: string[];
  support?: number | null;
  resistance?: number | null;
  trend: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  recommendation: 'buy' | 'sell' | 'hold';
  confidence: number;
  analysis: string;
  timestamp: Date;
}

export interface SentimentAnalysis {
  tokenAddress: string;
  overall: number;
  social: number;
  news: number;
  technical: number;
  factors: string[];
  confidence: number;
  summary: string;
  timestamp: Date;
}

// DB AI Analysis record shape (Prisma-compatible)
export interface AIAnalysisRecord {
  tokenAddress: string;
  type: 'comprehensive' | string;
  summary: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  timeHorizon: string;
  confidence: number;
  recommendation: 'buy' | 'sell' | 'hold';
  targetPrice?: number | null;
  stopLoss?: number | null;
  metadata?: Record<string, any>;
  timestamp: Date;
}

// Cleanup job payload definition
export interface CleanupJob {
  cleanupTypes: string[];
  batchId: string;
}
