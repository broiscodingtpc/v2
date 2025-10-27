import Bull from 'bull';
import { PrismaClient } from '@prisma/client';
import { twitterService } from '@/services/twitter';
import { createLogger } from '@/utils/logger';
import { SocialDataJob, SocialMetrics, TrendingTopic } from '@/types';

const log = createLogger('social-processor');
const prisma = new PrismaClient();

/**
 * Process social data collection job
 */
export async function processSocialData(job: Bull.Job<SocialDataJob>): Promise<any> {
  const { tokens, keywords, batchId } = job.data;
  
  log.info(`Processing social data job: ${batchId}`, {
    tokenCount: tokens.length,
    keywordCount: keywords.length
  });

  try {
    const results = {
      processed: 0,
      failed: 0,
      socialMetrics: [] as SocialMetrics[],
      trendingTopics: [] as TrendingTopic[]
    };

    // Process tokens for social metrics
    if (tokens.length > 0) {
      await processTokenSocialMetrics(tokens, results, job);
    }

    // Process trending topics
    if (keywords.length > 0) {
      await processTrendingTopics(keywords, results, job);
    }

    // Store social data
    await storeSocialData(results.socialMetrics, results.trendingTopics, batchId);

    log.info(`Social data job completed: ${batchId}`, {
      processed: results.processed,
      failed: results.failed,
      socialMetrics: results.socialMetrics.length,
      trendingTopics: results.trendingTopics.length
    });

    return {
      batchId,
      processed: results.processed,
      failed: results.failed,
      socialMetrics: results.socialMetrics.length,
      trendingTopics: results.trendingTopics.length
    };

  } catch (error) {
    log.error(`Social data job failed: ${batchId}`, error);
    throw error;
  }
}

/**
 * Process social metrics for tokens
 */
async function processTokenSocialMetrics(
  tokens: string[],
  results: { processed: number; failed: number; socialMetrics: SocialMetrics[] },
  job: Bull.Job
): Promise<void> {
  const totalTokens = tokens.length;
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    // Update job progress
    const progress = Math.floor((i / totalTokens) * 50); // 50% of total progress
    job.progress(progress);
    
    try {
      log.info(`Processing social metrics for token: ${token}`);
      
      // Get social metrics from Twitter
      const socialMetrics = await twitterService.getTokenSocialMetrics([token]);
      
      if (socialMetrics && socialMetrics.length > 0) {
        results.socialMetrics.push(...socialMetrics);
        results.processed++;
        
        const firstMetric = socialMetrics[0];
        log.info(`Social metrics collected for ${token}`, {
          mentions: firstMetric.mentions,
          sentiment: firstMetric.sentiment,
          engagement: firstMetric.engagement
        });
      } else {
        log.warn(`No social metrics found for token: ${token}`);
      }

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      log.error(`Failed to process social metrics for ${token}`, error);
      results.failed++;
    }
  }
}

/**
 * Process trending topics
 */
async function processTrendingTopics(
  keywords: string[],
  results: { processed: number; failed: number; trendingTopics: TrendingTopic[] },
  job: Bull.Job
): Promise<void> {
  try {
    log.info('Processing trending crypto topics');
    
    // Update job progress to 75%
    job.progress(75);
    
    // Get trending topics from Twitter
    const trendingTopicStrings = await twitterService.getTrendingCryptoTopics();
    
    if (trendingTopicStrings.length > 0) {
      // Convert strings to TrendingTopic objects
      const trendingTopicObjects = trendingTopicStrings.map(topic => ({
        topic,
        mentions: 0,
        sentiment: 0,
        volume: 0,
        engagement: 0,
        volume24h: 0,
        volumeChange: 0,
        timestamp: new Date()
      }));
      
      results.trendingTopics.push(...trendingTopicObjects);
      
      log.info(`Found ${trendingTopicStrings.length} trending topics`, {
        topics: trendingTopicStrings.slice(0, 5)
      });
    }

    // Process custom keywords
    for (const keyword of keywords) {
      try {
        const tweets = await twitterService.searchTweets(keyword, 50);
        
        if (tweets.length > 0) {
          // Calculate metrics for this keyword
          const mentions = tweets.length;
          const totalEngagement = tweets.reduce((sum, tweet) => 
            sum + (tweet.publicMetrics?.likeCount || 0) + (tweet.publicMetrics?.retweetCount || 0), 0
          );
          
          const trendingTopic: TrendingTopic = {
            topic: keyword,
            mentions,
            sentiment: 0, // Would need sentiment analysis
            volume: mentions, // Adding required volume field
            engagement: totalEngagement,
            volume24h: mentions,
            volumeChange: 0, // Would need historical data
            timestamp: new Date()
          };
          
          results.trendingTopics.push(trendingTopic);
          
          log.info(`Processed keyword: ${keyword}`, {
            mentions,
            engagement: totalEngagement
          });
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        log.error(`Failed to process keyword: ${keyword}`, error);
      }
    }

  } catch (error) {
    log.error('Failed to process trending topics', error);
    throw error;
  }
}

/**
 * Store social data in database
 */
async function storeSocialData(
  socialMetrics: SocialMetrics[],
  trendingTopics: TrendingTopic[],
  batchId: string
): Promise<void> {
  try {
    log.info(`Storing social data for batch: ${batchId}`, {
      socialMetrics: socialMetrics.length,
      trendingTopics: trendingTopics.length
    });

    // Store social metrics
    for (const metrics of socialMetrics) {
      await prisma.socialMetrics.create({
        data: {
          tokenAddress: metrics.tokenAddress,
          platform: 'twitter',
          mentions: metrics.mentions,
          sentiment: metrics.sentiment,
          engagement: metrics.engagement,
          followers: metrics.followers,
          influencerMentions: metrics.influencerMentions,
          hashtagCount: 0, // Not tracked in current implementation
          timestamp: metrics.timestamp
        }
      });
    }

    // Store trending topics
    for (const topic of trendingTopics) {
      await prisma.trendingTopic.create({
        data: {
          topic: topic.topic,
          platform: 'twitter',
          mentions: topic.mentions,
          sentiment: topic.sentiment,
          engagement: topic.engagement || 0,
          volume24h: topic.volume24h || 0,
          volumeChange: topic.volumeChange || 0,
          timestamp: topic.timestamp
        }
      });
    }

    log.info(`Successfully stored social data for batch: ${batchId}`);

  } catch (error) {
    log.error(`Failed to store social data for batch: ${batchId}`, error);
    throw error;
  }
}

/**
 * Get tokens that need social data updates
 */
export async function getTokensNeedingSocialUpdate(): Promise<string[]> {
  try {
    const cutoffTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    
    // Get tokens that either have no social metrics or old ones
    const tokensWithOldMetrics = await prisma.socialMetrics.findMany({
      where: {
        timestamp: { lt: cutoffTime }
      },
      select: { tokenAddress: true },
      distinct: ['tokenAddress'],
      take: 50
    });

    // Get tokens that have no social metrics at all
    const tokensWithoutMetrics = await prisma.token.findMany({
      where: {
        socialMetrics: {
          none: {}
        }
      },
      select: { address: true },
      take: 20
    });

    const addresses = [
      ...tokensWithOldMetrics.map(t => t.tokenAddress),
      ...tokensWithoutMetrics.map(t => t.address)
    ];

    // Remove duplicates
    return [...new Set(addresses)];

  } catch (error) {
    log.error('Failed to get tokens needing social update', error);
    return [];
  }
}

/**
 * Analyze social sentiment trends
 */
export async function analyzeSocialTrends(tokenAddress: string): Promise<Record<string, any>> {
  try {
    // Get recent social metrics (last 24 hours)
    const recentMetrics = await prisma.socialMetrics.findMany({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    if (recentMetrics.length === 0) {
      return { trend: 'neutral', confidence: 0 };
    }

    // Calculate trends
    const avgSentiment = recentMetrics.reduce((sum, m) => sum + m.sentiment, 0) / recentMetrics.length;
    const totalMentions = recentMetrics.reduce((sum, m) => sum + m.mentions, 0);
    const totalEngagement = recentMetrics.reduce((sum, m) => sum + m.engagement, 0);
    
    // Calculate sentiment trend (comparing first half vs second half)
    const midPoint = Math.floor(recentMetrics.length / 2);
    const recentSentiment = recentMetrics.slice(0, midPoint)
      .reduce((sum, m) => sum + m.sentiment, 0) / midPoint;
    const olderSentiment = recentMetrics.slice(midPoint)
      .reduce((sum, m) => sum + m.sentiment, 0) / (recentMetrics.length - midPoint);
    
    const sentimentChange = recentSentiment - olderSentiment;
    
    // Determine trend
    let trend = 'neutral';
    if (sentimentChange > 0.1) trend = 'bullish';
    else if (sentimentChange < -0.1) trend = 'bearish';
    
    // Calculate confidence based on volume of mentions
    const confidence = Math.min(totalMentions / 100, 1); // Max confidence at 100+ mentions
    
    return {
      trend,
      confidence,
      avgSentiment,
      totalMentions,
      totalEngagement,
      sentimentChange,
      dataPoints: recentMetrics.length
    };

  } catch (error) {
    log.error(`Failed to analyze social trends for ${tokenAddress}`, error);
    return { trend: 'neutral', confidence: 0 };
  }
}

/**
 * Get social influence score for a token
 */
export async function getSocialInfluenceScore(tokenAddress: string): Promise<number> {
  try {
    // Get recent social metrics
    const recentMetrics = await prisma.socialMetrics.findMany({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });

    if (recentMetrics.length === 0) return 0;

    // Calculate weighted influence score
    let totalScore = 0;
    let totalWeight = 0;

    for (const metrics of recentMetrics) {
      // Weight factors
      const mentionWeight = Math.min(metrics.mentions / 10, 10); // Max 10 points for mentions
      const sentimentWeight = Math.max(metrics.sentiment * 5, 0); // 0-5 points for positive sentiment
      const engagementWeight = Math.min(metrics.engagement / 1000, 5); // Max 5 points for engagement
      const influencerWeight = metrics.influencerMentions * 2; // 2 points per influencer mention
      
      const score = mentionWeight + sentimentWeight + engagementWeight + influencerWeight;
      const weight = 1; // Equal weight for now, could be time-based
      
      totalScore += score * weight;
      totalWeight += weight;
    }

    const influenceScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    
    // Normalize to 0-100 scale
    return Math.min(Math.round(influenceScore * 5), 100);

  } catch (error) {
    log.error(`Failed to calculate social influence score for ${tokenAddress}`, error);
    return 0;
  }
}

/**
 * Detect social anomalies (unusual spikes in mentions/sentiment)
 */
export async function detectSocialAnomalies(): Promise<Array<{
  tokenAddress: string;
  anomalyType: string;
  severity: number;
  description: string;
}>> {
  try {
    const anomalies = [];
    const cutoffTime = new Date(Date.now() - 2 * 60 * 60 * 1000); // Last 2 hours
    
    // Get recent high-activity tokens
    const recentActivity = await prisma.socialMetrics.findMany({
      where: {
        timestamp: { gte: cutoffTime },
        mentions: { gte: 10 } // Only tokens with significant mentions
      },
      orderBy: { mentions: 'desc' },
      take: 50
    });

    for (const current of recentActivity) {
      // Get historical average for comparison
      const historicalAvg = await prisma.socialMetrics.aggregate({
        where: {
          tokenAddress: current.tokenAddress,
          timestamp: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            lt: cutoffTime
          }
        },
        _avg: {
          mentions: true,
          sentiment: true,
          engagement: true
        }
      });

      if (!historicalAvg._avg.mentions) continue;

      // Check for mention spike
      const mentionRatio = current.mentions / historicalAvg._avg.mentions;
      if (mentionRatio > 3) { // 3x normal mentions
        anomalies.push({
          tokenAddress: current.tokenAddress,
          anomalyType: 'mention_spike',
          severity: Math.min(mentionRatio / 3, 3), // 1-3 severity
          description: `${Math.round(mentionRatio)}x increase in mentions`
        });
      }

      // Check for sentiment anomaly
      if (historicalAvg._avg.sentiment) {
        const sentimentDiff = Math.abs(current.sentiment - historicalAvg._avg.sentiment);
        if (sentimentDiff > 0.3) { // Significant sentiment change
          anomalies.push({
            tokenAddress: current.tokenAddress,
            anomalyType: 'sentiment_shift',
            severity: Math.min(sentimentDiff / 0.3, 3),
            description: `${current.sentiment > historicalAvg._avg.sentiment ? 'Positive' : 'Negative'} sentiment shift`
          });
        }
      }

      // Check for engagement spike
      if (historicalAvg._avg.engagement) {
        const engagementRatio = current.engagement / historicalAvg._avg.engagement;
        if (engagementRatio > 2) { // 2x normal engagement
          anomalies.push({
            tokenAddress: current.tokenAddress,
            anomalyType: 'engagement_spike',
            severity: Math.min(engagementRatio / 2, 3),
            description: `${Math.round(engagementRatio)}x increase in engagement`
          });
        }
      }
    }

    log.info(`Detected ${anomalies.length} social anomalies`);
    return anomalies;

  } catch (error) {
    log.error('Failed to detect social anomalies', error);
    return [];
  }
}