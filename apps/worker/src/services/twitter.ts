import { TwitterApi } from 'twitter-api-v2';
import { config } from '@/config';
import { createLogger } from '@/utils/logger';
import { Tweet, SocialMetrics, SocialPost } from '@/types';

const log = createLogger('twitter');

// Simple sentiment analysis without external dependency
function analyzeSentiment(text: string): { score: number; comparative: number } {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'bullish', 'moon', 'pump', 'buy', 'hold', 'strong'];
  const negativeWords = ['bad', 'terrible', 'awful', 'bearish', 'dump', 'sell', 'crash', 'drop', 'weak', 'scam'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  return {
    score,
    comparative: words.length > 0 ? score / words.length : 0
  };
}

export class TwitterService {
  private client?: TwitterApi;
  private rateLimitStatus: Map<string, { remaining: number; resetTime: Date }> = new Map();

  constructor() {
    if (!config.TWITTER_BEARER_TOKEN) {
      log.warn('Twitter Bearer Token not configured, Twitter service will be disabled');
      return;
    }

    this.client = new TwitterApi({
      appKey: config.TWITTER_API_KEY,
      appSecret: config.TWITTER_API_KEY_SECRET,
      accessToken: config.TWITTER_ACCESS_TOKEN,
      accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
    });
  }

  /**
   * Search tweets by keywords
   */
  async searchTweets(
    query: string, 
    maxResults: number = 100,
    sinceId?: string
  ): Promise<Tweet[]> {
    if (!this.client) {
      log.error('Twitter client not initialized');
      return [];
    }

    try {
      log.info(`Searching tweets: ${query} (max: ${maxResults})`);

      const searchParams: any = {
        query,
        max_results: Math.min(maxResults, 100), // Twitter API limit
        'tweet.fields': [
          'created_at',
          'public_metrics',
          'context_annotations',
          'entities',
          'author_id',
          'conversation_id'
        ].join(','),
        'user.fields': [
          'username',
          'public_metrics',
          'verified',
          'created_at'
        ].join(','),
        expansions: 'author_id'
      };

      if (sinceId) {
        searchParams.since_id = sinceId;
      }

      const response = await this.client.v2.search(query, searchParams);
      
      if (!response.data) {
        log.info(`No tweets found for query: ${query}`);
        return [];
      }

      const tweets = response.data.data || [];
      const users = response.data.includes?.users || [];
      
      // Create user lookup map
      const userMap = new Map(users.map(user => [user.id, user]));

      const processedTweets: Tweet[] = tweets.map(tweet => {
        const author = userMap.get(tweet.author_id!);
        const tweetText = tweet.text || '';
        
        // Analyze sentiment
        const sentimentResult = analyzeSentiment(tweetText);
        const normalizedSentiment = Math.max(-1, Math.min(1, sentimentResult.score / 10));
        
        // Extract potential token mentions
        const tokenMentions = this.extractTokenMentions(tweetText);

        return {
          id: tweet.id,
          text: tweetText,
          authorId: tweet.author_id!,
          authorUsername: author?.username || 'unknown',
          authorFollowers: author?.public_metrics?.followers_count || 0,
          createdAt: new Date(tweet.created_at!),
          likes: tweet.public_metrics?.like_count || 0,
          retweets: tweet.public_metrics?.retweet_count || 0,
          replies: tweet.public_metrics?.reply_count || 0,
          sentiment: normalizedSentiment,
          confidence: Math.abs(sentimentResult.score) / 10,
          tokens: tokenMentions
        };
      });

      log.info(`Processed ${processedTweets.length} tweets for query: ${query}`);
      return processedTweets;

    } catch (error: any) {
      if (error.code === 429) {
        log.rateLimit('twitter-search', 0, 0, new Date(Date.now() + 15 * 60 * 1000));
      }
      log.error(`Failed to search tweets: ${query}`, error);
      throw error;
    }
  }

  /**
   * Get tweets mentioning specific tokens
   */
  async getTokenMentions(
    tokenSymbols: string[], 
    maxResults: number = 100
  ): Promise<Map<string, Tweet[]>> {
    const results = new Map<string, Tweet[]>();

    for (const symbol of tokenSymbols) {
      try {
        // Create search query for token
        const query = this.buildTokenQuery(symbol);
        const tweets = await this.searchTweets(query, maxResults);
        
        // Filter tweets that actually mention this token
        const relevantTweets = tweets.filter(tweet => 
          tweet.tokens.includes(symbol.toLowerCase()) ||
          tweet.text.toLowerCase().includes(symbol.toLowerCase())
        );

        results.set(symbol, relevantTweets);
        log.tokenProcessed(symbol, 'twitter-mentions', { count: relevantTweets.length });

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        log.tokenError(symbol, 'twitter-mentions', error as Error);
        results.set(symbol, []);
      }
    }

    return results;
  }

  /**
   * Get social metrics for tokens
   */
  async getTokenSocialMetrics(tokenSymbols: string[]): Promise<SocialMetrics[]> {
    const metrics: SocialMetrics[] = [];
    const timeWindow = 24 * 60 * 60 * 1000; // 24 hours
    const since = new Date(Date.now() - timeWindow);

    for (const symbol of tokenSymbols) {
      try {
        const query = this.buildTokenQuery(symbol);
        const tweets = await this.searchTweets(query, 100);
        
        // Filter tweets from last 24 hours
        const recentTweets = tweets.filter(tweet => tweet.createdAt >= since);
        
        if (recentTweets.length === 0) {
          continue;
        }

        // Calculate metrics
        const totalEngagement = recentTweets.reduce((sum, tweet) => 
          sum + tweet.likes + tweet.retweets + tweet.replies, 0
        );
        
        const avgSentiment = recentTweets.reduce((sum, tweet) => 
          sum + tweet.sentiment, 0
        ) / recentTweets.length;
        
        const totalFollowers = recentTweets.reduce((sum, tweet) => 
          sum + tweet.authorFollowers, 0
        );

        metrics.push({
          tokenId: symbol,
          tokenAddress: symbol, // Using symbol as tokenAddress for now
          platform: 'twitter',
          mentions: recentTweets.length,
          sentiment: avgSentiment,
          engagement: totalEngagement,
          followers: totalFollowers,
          influencerMentions: 0, // Default value
          hashtagCount: 0, // Default value
          posts: recentTweets.length,
          timestamp: new Date()
        });

        log.tokenProcessed(symbol, 'social-metrics', {
          mentions: recentTweets.length,
          sentiment: avgSentiment.toFixed(3),
          engagement: totalEngagement
        });

      } catch (error) {
        log.tokenError(symbol, 'social-metrics', error as Error);
      }
    }

    return metrics;
  }

  /**
   * Get trending crypto topics
   */
  async getTrendingCryptoTopics(): Promise<string[]> {
    try {
      log.info('Fetching trending crypto topics');

      const cryptoKeywords = [
        'bitcoin', 'ethereum', 'solana', 'cardano', 'polygon',
        'defi', 'nft', 'web3', 'crypto', 'blockchain',
        'altcoin', 'memecoin', 'trading', 'hodl'
      ];

      const trends: Array<{ keyword: string; volume: number }> = [];

      for (const keyword of cryptoKeywords) {
        try {
          const tweets = await this.searchTweets(keyword, 10);
          const volume = tweets.reduce((sum, tweet) => 
            sum + tweet.likes + tweet.retweets, 0
          );
          
          trends.push({ keyword, volume });
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          log.warn(`Failed to get trend data for: ${keyword}`, { error });
        }
      }

      // Sort by volume and return top keywords
      const trendingTopics = trends
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10)
        .map(trend => trend.keyword);

      log.info(`Found ${trendingTopics.length} trending crypto topics`);
      return trendingTopics;

    } catch (error) {
      log.error('Failed to fetch trending crypto topics', error);
      return [];
    }
  }

  /**
   * Get influencer tweets about crypto
   */
  async getInfluencerTweets(minFollowers: number = 10000): Promise<Tweet[]> {
    try {
      log.info(`Fetching influencer tweets (min followers: ${minFollowers})`);

      const cryptoQuery = '(bitcoin OR ethereum OR solana OR crypto OR defi) -is:retweet lang:en';
      const tweets = await this.searchTweets(cryptoQuery, 100);
      
      // Filter by follower count
      const influencerTweets = tweets.filter(tweet => 
        tweet.authorFollowers >= minFollowers
      );

      // Sort by engagement
      influencerTweets.sort((a, b) => {
        const engagementA = a.likes + a.retweets + a.replies;
        const engagementB = b.likes + b.retweets + b.replies;
        return engagementB - engagementA;
      });

      log.info(`Found ${influencerTweets.length} influencer tweets`);
      return influencerTweets.slice(0, 50);

    } catch (error) {
      log.error('Failed to fetch influencer tweets', error);
      return [];
    }
  }

  /**
   * Build search query for token
   */
  private buildTokenQuery(symbol: string): string {
    const baseQuery = `$${symbol} OR #${symbol} OR "${symbol}"`;
    const filters = '-is:retweet -is:reply lang:en';
    return `${baseQuery} ${filters}`;
  }

  /**
   * Extract token mentions from text
   */
  private extractTokenMentions(text: string): string[] {
    const tokens: string[] = [];
    
    // Match $SYMBOL patterns
    const dollarMatches = text.match(/\$[A-Z]{2,10}/g);
    if (dollarMatches) {
      tokens.push(...dollarMatches.map(match => match.substring(1).toLowerCase()));
    }
    
    // Match #SYMBOL patterns
    const hashMatches = text.match(/#[A-Z]{2,10}/g);
    if (hashMatches) {
      tokens.push(...hashMatches.map(match => match.substring(1).toLowerCase()));
    }
    
    // Common crypto terms
    const cryptoTerms = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polygon', 'bnb', 'ada', 'dot', 'link', 'uni'];
    const lowerText = text.toLowerCase();
    
    cryptoTerms.forEach(term => {
      if (lowerText.includes(term)) {
        tokens.push(term);
      }
    });
    
    return [...new Set(tokens)]; // Remove duplicates
  }

  /**
   * Convert Tweet to SocialPost format
   */
  convertTweetToSocialPost(tweet: Tweet): SocialPost {
    return {
      id: tweet.id,
      platform: 'twitter',
      content: tweet.text,
      author: tweet.authorUsername,
      authorFollowers: tweet.authorFollowers,
      engagement: tweet.likes + tweet.retweets + tweet.replies,
      sentiment: tweet.sentiment,
      confidence: tweet.confidence,
      tokens: tweet.tokens,
      createdAt: tweet.createdAt
    };
  }

  /**
   * Batch process social data
   */
  async batchProcessSocialData(
    tokenSymbols: string[],
    maxTweetsPerToken: number = 50
  ): Promise<{ tweets: Tweet[]; metrics: SocialMetrics[] }> {
    log.info(`Batch processing social data for ${tokenSymbols.length} tokens`);
    
    const allTweets: Tweet[] = [];
    const allMetrics: SocialMetrics[] = [];
    
    // Process in smaller batches to manage rate limits
    const batchSize = 5;
    
    for (let i = 0; i < tokenSymbols.length; i += batchSize) {
      const batch = tokenSymbols.slice(i, i + batchSize);
      
      try {
        // Get tweets for this batch
        const tweetResults = await this.getTokenMentions(batch, maxTweetsPerToken);
        
        // Get metrics for this batch
        const metricsResults = await this.getTokenSocialMetrics(batch);
        
        // Collect results
        tweetResults.forEach((tweets, symbol) => {
          allTweets.push(...tweets);
          log.tokenProcessed(symbol, 'batch-tweets', { count: tweets.length });
        });
        
        allMetrics.push(...metricsResults);
        
        // Rate limiting delay between batches
        if (i + batchSize < tokenSymbols.length) {
          log.info(`Processed batch ${Math.floor(i / batchSize) + 1}, waiting before next batch...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
        
      } catch (error) {
        log.error(`Failed to process batch starting at index ${i}`, error);
      }
    }
    
    log.info(`Batch processing complete: ${allTweets.length} tweets, ${allMetrics.length} metrics`);
    
    return {
      tweets: allTweets,
      metrics: allMetrics
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    try {
      // Simple API call to check connectivity
      await this.client.v2.me();
      return true;
    } catch (error) {
      log.error('Twitter health check failed', error);
      return false;
    }
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus() {
    return Object.fromEntries(this.rateLimitStatus);
  }
}

export const twitterService = new TwitterService();