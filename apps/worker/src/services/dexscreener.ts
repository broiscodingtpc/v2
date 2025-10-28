import axios, { AxiosInstance } from 'axios';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { DexScreenerPair, PriceData, Token } from '@/types';

const log = createLogger('dexscreener');

export class DexScreenerService {
  private api: AxiosInstance;
  private rateLimitRemaining: number = config.DEXSCREENER_RATE_LIMIT;
  private rateLimitReset: Date = new Date();

  constructor() {
    this.api = axios.create({
      baseURL: config.DEXSCREENER_API_URL,
      timeout: 30000,
      headers: {
        'User-Agent': 'MetaPulse/1.0',
        'Accept': 'application/json'
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
   * Get token pairs by token address
   */
  async getTokenPairs(tokenAddress: string): Promise<DexScreenerPair[]> {
    try {
      log.info(`Fetching pairs for token: ${tokenAddress}`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get(`/dex/tokens/${tokenAddress}`);
      
      if (!response.data || !response.data.pairs) {
        log.warn(`No pairs found for token: ${tokenAddress}`);
        return [];
      }

      const pairs = response.data.pairs as DexScreenerPair[];
      log.info(`Found ${pairs.length} pairs for token: ${tokenAddress}`);
      
      return pairs;
    } catch (error) {
      log.error(`Failed to fetch pairs for token: ${tokenAddress}`, error);
      throw error;
    }
  }

  /**
   * Get token data by pair address
   */
  async getPairData(pairAddress: string): Promise<DexScreenerPair | null> {
    try {
      log.info(`Fetching pair data: ${pairAddress}`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get(`/dex/pairs/${pairAddress}`);
      
      if (!response.data || !response.data.pair) {
        log.warn(`No pair data found: ${pairAddress}`);
        return null;
      }

      const pair = response.data.pair as DexScreenerPair;
      log.info(`Retrieved pair data: ${pairAddress}`);
      
      return pair;
    } catch (error) {
      log.error(`Failed to fetch pair data: ${pairAddress}`, error);
      throw error;
    }
  }

  /**
   * Search tokens by query
   */
  async searchTokens(query: string): Promise<DexScreenerPair[]> {
    try {
      log.info(`Searching tokens: ${query}`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get(`/dex/search?q=${encodeURIComponent(query)}`);
      
      if (!response.data || !response.data.pairs) {
        log.warn(`No search results for query: ${query}`);
        return [];
      }

      const pairs = response.data.pairs as DexScreenerPair[];
      log.info(`Found ${pairs.length} search results for: ${query}`);
      
      return pairs;
    } catch (error) {
      log.error(`Failed to search tokens: ${query}`, error);
      throw error;
    }
  }

  /**
   * Get trending tokens
   */
  async getTrendingTokens(limit: number = 50): Promise<DexScreenerPair[]> {
    try {
      log.info(`Fetching trending tokens (limit: ${limit})`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      // Use search endpoint to get popular Solana tokens
      const response = await this.api.get('/dex/search?q=solana');
      
      if (!response.data || !response.data.pairs) {
        log.warn('No trending tokens found');
        return [];
      }

      let pairs = response.data.pairs as DexScreenerPair[];
      
      // Sort by volume and filter for quality
      pairs = pairs
        .filter(pair => 
          pair.volume && pair.volume.h24 && parseFloat(String(pair.volume.h24)) > 1000 && // Minimum volume
          pair.liquidity && pair.liquidity.usd && parseFloat(String(pair.liquidity.usd)) > 5000 && // Minimum liquidity
          pair.priceChange && pair.priceChange.h24 && parseFloat(String(pair.priceChange.h24)) !== 0 // Has price movement
        )
        .sort((a, b) => parseFloat(String(b.volume?.h24 || '0')) - parseFloat(String(a.volume?.h24 || '0')))
        .slice(0, limit);

      log.info(`Retrieved ${pairs.length} trending tokens`);
      return pairs;
    } catch (error) {
      log.error('Failed to fetch trending tokens', error);
      throw error;
    }
  }

  /**
   * Get top gainers
   */
  async getTopGainers(limit: number = 50): Promise<DexScreenerPair[]> {
    try {
      log.info(`Fetching top gainers (limit: ${limit})`);
      
      const startTime = Date.now();
      (this.api.defaults as any).startTime = startTime;
      
      const response = await this.api.get('/dex/pairs/solana');
      
      if (!response.data || !response.data.pairs) {
        log.warn('No pairs found for top gainers');
        return [];
      }

      let pairs = response.data.pairs as DexScreenerPair[];
      
      // Filter and sort by 24h price change
      pairs = pairs
        .filter(pair => 
          pair.priceChange.h24 > 0 && // Only gainers
          pair.volume.h24 > 1000 && // Minimum volume
          pair.liquidity.usd > 5000 // Minimum liquidity
        )
        .sort((a, b) => b.priceChange.h24 - a.priceChange.h24)
        .slice(0, limit);

      log.info(`Retrieved ${pairs.length} top gainers`);
      return pairs;
    } catch (error) {
      log.error('Failed to fetch top gainers', error);
      throw error;
    }
  }

  /**
   * Convert DexScreener pair to internal Token format
   */
  convertPairToToken(pair: DexScreenerPair): Token {
    return {
      id: pair.baseToken.address,
      address: pair.baseToken.address,
      symbol: pair.baseToken.symbol,
      name: pair.baseToken.name,
      network: pair.chainId,
      price: parseFloat(pair.priceUsd) || 0,
      priceChange24h: pair.priceChange.h24 || 0,
      volume24h: pair.volume.h24 || 0,
      marketCap: pair.marketCap || 0,
      liquidity: pair.liquidity.usd || 0,
      fdv: pair.fdv || 0,
      holders: 0, // Not available in DexScreener
      createdAt: new Date(pair.pairCreatedAt * 1000),
      updatedAt: new Date()
    };
  }

  /**
   * Convert DexScreener pair to PriceData format
   */
  convertPairToPriceData(pair: DexScreenerPair): PriceData {
    return {
      tokenAddress: pair.baseToken.address,
      price: parseFloat(pair.priceUsd) || 0,
      volume: pair.volume.h24 || 0,
      marketCap: pair.marketCap || 0,
      liquidity: pair.liquidity.usd || 0,
      timestamp: new Date(),
      source: 'dexscreener'
    };
  }

  /**
   * Batch fetch token data
   */
  async batchFetchTokenData(tokenAddresses: string[]): Promise<PriceData[]> {
    const results: PriceData[] = [];
    const batchSize = 10; // Process in smaller batches to avoid rate limits
    
    log.info(`Batch fetching data for ${tokenAddresses.length} tokens`);
    
    for (let i = 0; i < tokenAddresses.length; i += batchSize) {
      const batch = tokenAddresses.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (address) => {
        try {
          const pairs = await this.getTokenPairs(address);
          if (pairs.length > 0) {
            // Use the pair with highest liquidity
            const bestPair = pairs.reduce((prev, current) => 
              (current.liquidity.usd > prev.liquidity.usd) ? current : prev
            );
            return this.convertPairToPriceData(bestPair);
          }
          return null;
        } catch (error) {
          log.tokenError(address, 'fetch', error as Error);
          return null;
        }
      });
      
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          results.push(result.value);
          log.tokenProcessed(batch[index], 'fetched');
        }
      });
      
      // Rate limiting delay between batches
      if (i + batchSize < tokenAddresses.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    log.info(`Successfully fetched data for ${results.length}/${tokenAddresses.length} tokens`);
    return results;
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
      
      // Try to search for Solana tokens to test connectivity
      await this.api.get('/dex/search/?q=solana', { timeout: 5000 });
      return true;
    } catch (error) {
      log.error('DexScreener health check failed', error);
      return false;
    }
  }
}

export const dexScreenerService = new DexScreenerService();