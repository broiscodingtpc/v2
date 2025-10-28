import axios, { AxiosInstance } from 'axios';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';

const log = createLogger('pumpportal');

export interface PumpPortalToken {
  address: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface PumpPortalResponse {
  success: boolean;
  data: PumpPortalToken[];
  message?: string;
}

export class PumpPortalService {
  private api: AxiosInstance;
  private rateLimitRemaining: number = 60; // 60 requests per minute
  private rateLimitReset: Date = new Date();

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.pumpportal.io',
      timeout: 30000,
      headers: {
        'User-Agent': 'MetaPulse/1.0',
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.PUMPPORTAL_API_KEY}`
      }
    });

    // Request interceptor for rate limiting
    this.api.interceptors.request.use((config) => {
      const now = new Date();
      if (now < this.rateLimitReset && this.rateLimitRemaining <= 0) {
        throw new Error(`Rate limit exceeded. Reset at ${this.rateLimitReset.toISOString()}`);
      }
      return config;
    });

    // Response interceptor for logging and rate limit tracking
    this.api.interceptors.response.use(
      (response) => {
        const duration = Date.now() - (response.config as any).startTime;
        log.apiCall(response.config.url || '', response.config.method || 'GET', response.status, duration);
        
        // Update rate limit info if provided
        if (response.headers['x-ratelimit-remaining']) {
          this.rateLimitRemaining = parseInt(response.headers['x-ratelimit-remaining']);
        }
        if (response.headers['x-ratelimit-reset']) {
          this.rateLimitReset = new Date(parseInt(response.headers['x-ratelimit-reset']) * 1000);
        }
        
        return response;
      },
      (error) => {
        const duration = Date.now() - (error.config?.startTime || Date.now());
        log.apiCall(
          error.config?.url || 'unknown', 
          error.config?.method || 'GET', 
          error.response?.status || 0, 
          duration,
          { error: error.message }
        );
        throw error;
      }
    );
  }

  /**
   * Get trending tokens from PumpPortal
   */
  async getTrendingTokens(limit: number = 50): Promise<PumpPortalToken[]> {
    try {
      log.info(`Fetching trending tokens from PumpPortal (limit: ${limit})`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get('/api/v1/tokens/trending', {
        params: { limit }
      });
      
      if (!response.data || !response.data.success) {
        log.warn('No trending tokens found from PumpPortal');
        return [];
      }

      const tokens = response.data.data as PumpPortalToken[];
      log.info(`Retrieved ${tokens.length} trending tokens from PumpPortal`);
      
      return tokens;
    } catch (error) {
      log.error('Failed to fetch trending tokens from PumpPortal', error);
      throw error;
    }
  }

  /**
   * Get token details by address
   */
  async getTokenDetails(address: string): Promise<PumpPortalToken | null> {
    try {
      log.info(`Fetching token details from PumpPortal: ${address}`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get(`/api/v1/tokens/${address}`);
      
      if (!response.data || !response.data.success) {
        log.warn(`No token details found for: ${address}`);
        return null;
      }

      const token = response.data.data as PumpPortalToken;
      log.info(`Retrieved token details for: ${address}`);
      
      return token;
    } catch (error) {
      log.error(`Failed to fetch token details for: ${address}`, error);
      throw error;
    }
  }

  /**
   * Search tokens by query
   */
  async searchTokens(query: string, limit: number = 20): Promise<PumpPortalToken[]> {
    try {
      log.info(`Searching tokens on PumpPortal: ${query}`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get('/api/v1/tokens/search', {
        params: { q: query, limit }
      });
      
      if (!response.data || !response.data.success) {
        log.warn(`No search results for query: ${query}`);
        return [];
      }

      const tokens = response.data.data as PumpPortalToken[];
      log.info(`Found ${tokens.length} search results for: ${query}`);
      
      return tokens;
    } catch (error) {
      log.error(`Failed to search tokens: ${query}`, error);
      throw error;
    }
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus() {
    return {
      remaining: this.rateLimitRemaining,
      resetTime: this.rateLimitReset,
      canMakeRequest: this.rateLimitRemaining > 0 || new Date() >= this.rateLimitReset
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      // Try to fetch trending tokens to test connectivity
      await this.api.get('/api/v1/tokens/trending', { 
        params: { limit: 1 },
        timeout: 5000 
      });
      return true;
    } catch (error) {
      log.error('PumpPortal health check failed', error);
      return false;
    }
  }
}

export const pumpPortalService = new PumpPortalService();
