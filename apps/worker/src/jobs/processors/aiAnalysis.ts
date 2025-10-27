import Bull from 'bull';
import { PrismaClient } from '@prisma/client';
import { aiService } from '@/services/ai';
import { createLogger } from '@/utils/logger';
import { AIAnalysisJob, AIAnalysis, TechnicalAnalysis, SentimentAnalysis } from '@/types';

const log = createLogger('ai-processor');
const prisma = new PrismaClient();

/**
 * Process AI analysis job
 */
export async function processAIAnalysis(job: Bull.Job<AIAnalysisJob>): Promise<any> {
  const { tokenAddresses, analysisTypes, batchId } = job.data;
  
  log.info(`Processing AI analysis job: ${batchId}`, {
    tokenCount: tokenAddresses.length,
    analysisTypes
  });

  try {
    const results = {
      processed: 0,
      failed: 0,
      technicalAnalyses: [] as TechnicalAnalysis[],
      sentimentAnalyses: [] as SentimentAnalysis[],
      aiAnalyses: [] as AIAnalysis[]
    };

    const totalTokens = tokenAddresses.length;

    for (let i = 0; i < tokenAddresses.length; i++) {
      const tokenAddress = tokenAddresses[i];
      
      // Update job progress
      const progress = Math.floor((i / totalTokens) * 100);
      job.progress(progress);
      
      try {
        log.info(`Processing AI analysis for token: ${tokenAddress}`);
        
        // Get token data for analysis
        const tokenData = await getTokenDataForAnalysis(tokenAddress);
        
        if (!tokenData) {
          log.warn(`No data found for token: ${tokenAddress}`);
          results.failed++;
          continue;
        }

        // Process different types of analysis
        if (analysisTypes.includes('technical')) {
          const technicalAnalysis = await processTechnicalAnalysis(tokenAddress, tokenData);
          if (technicalAnalysis) {
            results.technicalAnalyses.push(technicalAnalysis);
          }
        }

        if (analysisTypes.includes('sentiment')) {
          const sentimentAnalysis = await processSentimentAnalysis(tokenAddress, tokenData);
          if (sentimentAnalysis) {
            results.sentimentAnalyses.push(sentimentAnalysis);
          }
        }

        if (analysisTypes.includes('comprehensive')) {
          const aiAnalysis = await processComprehensiveAnalysis(tokenAddress, tokenData);
          if (aiAnalysis) {
            results.aiAnalyses.push(aiAnalysis);
          }
        }

        results.processed++;
        
        // Rate limiting delay between AI calls
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        log.error(`Failed to process AI analysis for ${tokenAddress}`, error);
        results.failed++;
      }
    }

    // Store AI analysis results
    await storeAIAnalysisResults(results, batchId);

    log.info(`AI analysis job completed: ${batchId}`, {
      processed: results.processed,
      failed: results.failed,
      technicalAnalyses: results.technicalAnalyses.length,
      sentimentAnalyses: results.sentimentAnalyses.length,
      aiAnalyses: results.aiAnalyses.length
    });

    return {
      batchId,
      processed: results.processed,
      failed: results.failed,
      technicalAnalyses: results.technicalAnalyses.length,
      sentimentAnalyses: results.sentimentAnalyses.length,
      aiAnalyses: results.aiAnalyses.length
    };

  } catch (error) {
    log.error(`AI analysis job failed: ${batchId}`, error);
    throw error;
  }
}

/**
 * Get comprehensive token data for AI analysis
 */
async function getTokenDataForAnalysis(tokenAddress: string): Promise<any> {
  try {
    // Get token basic info
    const token = await prisma.token.findUnique({
      where: { address: tokenAddress }
    });

    if (!token) return null;

    // Get recent price metrics (last 50 data points)
    const priceMetrics = await prisma.tokenMetrics.findMany({
      where: { tokenAddress },
      orderBy: { timestamp: 'desc' },
      take: 50
    });

    // Get recent social metrics (last 24 hours)
    const socialMetrics = await prisma.socialMetrics.findMany({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    // Get any existing signals for context
    const recentSignals = await prisma.signal.findMany({
      where: {
        tokenAddress,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    return {
      token,
      priceMetrics,
      socialMetrics,
      recentSignals
    };

  } catch (error) {
    log.error(`Failed to get token data for analysis: ${tokenAddress}`, error);
    return null;
  }
}

/**
 * Process technical analysis using AI
 */
async function processTechnicalAnalysis(tokenAddress: string, tokenData: any): Promise<TechnicalAnalysis | null> {
  try {
    log.info(`Generating technical analysis for: ${tokenAddress}`);
    
    const analysis = await aiService.generateTechnicalAnalysis(tokenData);
    
    if (!analysis) {
      log.warn(`No technical analysis generated for: ${tokenAddress}`);
      return null;
    }

    const technicalAnalysis: TechnicalAnalysis = {
      tokenAddress,
      timeframe: '24h',
      indicators: analysis.indicators || {},
      signals: analysis.signals || [],
      support: analysis.support || 0,
      resistance: analysis.resistance || 0,
      trend: analysis.trend || 'neutral',
      strength: analysis.strength || 0,
      recommendation: analysis.recommendation || 'hold',
      confidence: analysis.confidence || 0,
      analysis: analysis.summary || '',
      timestamp: new Date()
    };

    log.info(`Technical analysis generated for ${tokenAddress}`, {
      trend: technicalAnalysis.trend,
      recommendation: technicalAnalysis.recommendation,
      confidence: technicalAnalysis.confidence
    });

    return technicalAnalysis;

  } catch (error) {
    log.error(`Failed to process technical analysis for ${tokenAddress}`, error);
    return null;
  }
}

/**
 * Process sentiment analysis using AI
 */
async function processSentimentAnalysis(tokenAddress: string, tokenData: any): Promise<SentimentAnalysis | null> {
  try {
    log.info(`Generating sentiment analysis for: ${tokenAddress}`);
    
    const analysis = await aiService.generateSentimentAnalysis(tokenData);
    
    if (!analysis) {
      log.warn(`No sentiment analysis generated for: ${tokenAddress}`);
      return null;
    }

    const sentimentAnalysis: SentimentAnalysis = {
      tokenAddress,
      overall: analysis.overall || 0,
      social: analysis.social || 0,
      news: analysis.news || 0,
      technical: analysis.technical || 0,
      factors: analysis.factors || [],
      confidence: analysis.confidence || 0,
      summary: analysis.summary || '',
      timestamp: new Date()
    };

    log.info(`Sentiment analysis generated for ${tokenAddress}`, {
      overall: sentimentAnalysis.overall,
      confidence: sentimentAnalysis.confidence
    });

    return sentimentAnalysis;

  } catch (error) {
    log.error(`Failed to process sentiment analysis for ${tokenAddress}`, error);
    return null;
  }
}

/**
 * Process comprehensive AI analysis
 */
async function processComprehensiveAnalysis(tokenAddress: string, tokenData: any): Promise<AIAnalysis | null> {
  try {
    log.info(`Generating comprehensive AI analysis for: ${tokenAddress}`);
    
    // Generate comprehensive analysis using AI service
    const analysis = await aiService.generateComprehensiveAnalysis(tokenData);
    
    if (!analysis) {
      log.warn(`No comprehensive analysis generated for: ${tokenAddress}`);
      return null;
    }

    const aiAnalysis: AIAnalysis = {
      tokenAddress,
      type: 'comprehensive',
      summary: analysis.summary || '',
      keyPoints: analysis.keyPoints || [],
      riskLevel: analysis.riskLevel || 'medium',
      timeHorizon: analysis.timeHorizon || '24h',
      confidence: analysis.confidence || 0,
      recommendation: analysis.recommendation || 'hold',
      targetPrice: analysis.targetPrice || null,
      stopLoss: analysis.stopLoss || null,
      metadata: {
        model: analysis.model || 'unknown',
        processingTime: analysis.processingTime || 0,
        dataQuality: analysis.dataQuality || 'medium',
        factors: analysis.factors || []
      },
      timestamp: new Date()
    };

    log.info(`Comprehensive AI analysis generated for ${tokenAddress}`, {
      recommendation: aiAnalysis.recommendation,
      riskLevel: aiAnalysis.riskLevel,
      confidence: aiAnalysis.confidence
    });

    return aiAnalysis;

  } catch (error) {
    log.error(`Failed to process comprehensive analysis for ${tokenAddress}`, error);
    return null;
  }
}

/**
 * Store AI analysis results in database
 */
async function storeAIAnalysisResults(
  results: {
    technicalAnalyses: TechnicalAnalysis[];
    sentimentAnalyses: SentimentAnalysis[];
    aiAnalyses: AIAnalysis[];
  },
  batchId: string
): Promise<void> {
  try {
    log.info(`Storing AI analysis results for batch: ${batchId}`, {
      technicalAnalyses: results.technicalAnalyses.length,
      sentimentAnalyses: results.sentimentAnalyses.length,
      aiAnalyses: results.aiAnalyses.length
    });

    // Store technical analyses
    for (const analysis of results.technicalAnalyses) {
      await prisma.technicalAnalysis.create({
        data: {
          tokenAddress: analysis.tokenAddress,
          timeframe: analysis.timeframe,
          indicators: analysis.indicators,
          signals: analysis.signals,
          support: analysis.support,
          resistance: analysis.resistance,
          trend: analysis.trend,
          strength: analysis.strength,
          recommendation: analysis.recommendation,
          confidence: analysis.confidence,
          analysis: analysis.analysis,
          timestamp: analysis.timestamp
        }
      });
    }

    // Store sentiment analyses
    for (const analysis of results.sentimentAnalyses) {
      await prisma.sentimentAnalysis.create({
        data: {
          tokenAddress: analysis.tokenAddress,
          overall: analysis.overall,
          social: analysis.social,
          news: analysis.news,
          technical: analysis.technical,
          factors: analysis.factors,
          confidence: analysis.confidence,
          summary: analysis.summary,
          timestamp: analysis.timestamp
        }
      });
    }

    // Store comprehensive AI analyses
    for (const analysis of results.aiAnalyses) {
      await prisma.aiAnalysis.create({
        data: {
          tokenAddress: analysis.tokenAddress,
          type: analysis.type,
          summary: analysis.summary,
          keyPoints: analysis.keyPoints,
          riskLevel: analysis.riskLevel,
          timeHorizon: analysis.timeHorizon,
          confidence: analysis.confidence,
          recommendation: analysis.recommendation,
          targetPrice: analysis.targetPrice,
          stopLoss: analysis.stopLoss,
          metadata: analysis.metadata,
          timestamp: analysis.timestamp
        }
      });
    }

    log.info(`Successfully stored AI analysis results for batch: ${batchId}`);

  } catch (error) {
    log.error(`Failed to store AI analysis results for batch: ${batchId}`, error);
    throw error;
  }
}

/**
 * Get tokens that need AI analysis updates
 */
export async function getTokensNeedingAIAnalysis(): Promise<string[]> {
  try {
    const cutoffTime = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
    
    // Get tokens with recent price activity but no recent AI analysis
    const activeTokens = await prisma.tokenMetrics.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
        }
      },
      select: { tokenAddress: true },
      distinct: ['tokenAddress'],
      take: 20
    });

    const tokensNeedingAnalysis = [];

    for (const { tokenAddress } of activeTokens) {
      // Check if token has recent AI analysis
      const recentAnalysis = await prisma.aiAnalysis.findFirst({
        where: {
          tokenAddress,
          timestamp: { gte: cutoffTime }
        }
      });

      if (!recentAnalysis) {
        tokensNeedingAnalysis.push(tokenAddress);
      }
    }

    return tokensNeedingAnalysis;

  } catch (error) {
    log.error('Failed to get tokens needing AI analysis', error);
    return [];
  }
}

/**
 * Generate market overview analysis
 */
export async function generateMarketOverview(): Promise<any> {
  try {
    log.info('Generating market overview analysis');

    // Get top tokens by market cap
    const topTokens = await prisma.token.findMany({
      where: {
        marketCap: { gt: 0 }
      },
      orderBy: { marketCap: 'desc' },
      take: 20
    });

    // Get recent market metrics
    const recentMetrics = await prisma.tokenMetrics.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'desc' },
      take: 100
    });

    // Calculate market statistics
    const marketStats = calculateMarketStatistics(topTokens, recentMetrics);

    // Generate AI analysis of market conditions
    const marketData = {
      topTokens: topTokens.slice(0, 10),
      metrics: recentMetrics.slice(0, 50),
      statistics: marketStats
    };

    const aiAnalysis = await aiService.generateMarketOverview(marketData);

    const overview = {
      timestamp: new Date(),
      statistics: marketStats,
      analysis: aiAnalysis,
      topPerformers: getTopPerformers(topTokens, recentMetrics),
      marketSentiment: await calculateOverallMarketSentiment(),
      riskLevel: aiAnalysis?.riskLevel || 'medium'
    };

    // Store market overview
    await prisma.marketOverview.create({
      data: {
        statistics: marketStats,
        analysis: aiAnalysis?.summary || '',
        sentiment: overview.marketSentiment,
        riskLevel: overview.riskLevel,
        topPerformers: overview.topPerformers,
        timestamp: overview.timestamp
      }
    });

    log.info('Market overview analysis generated', {
      sentiment: overview.marketSentiment,
      riskLevel: overview.riskLevel,
      topPerformers: overview.topPerformers.length
    });

    return overview;

  } catch (error) {
    log.error('Failed to generate market overview', error);
    throw error;
  }
}

/**
 * Calculate market statistics
 */
function calculateMarketStatistics(tokens: any[], metrics: any[]): Record<string, any> {
  const totalMarketCap = tokens.reduce((sum, token) => sum + (token.marketCap || 0), 0);
  const totalVolume = tokens.reduce((sum, token) => sum + (token.volume24h || 0), 0);
  
  const priceChanges = tokens
    .filter(token => token.priceChange24h !== null)
    .map(token => token.priceChange24h);
  
  const avgPriceChange = priceChanges.length > 0 
    ? priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length 
    : 0;

  const gainers = priceChanges.filter(change => change > 0).length;
  const losers = priceChanges.filter(change => change < 0).length;

  return {
    totalMarketCap,
    totalVolume,
    avgPriceChange,
    gainers,
    losers,
    totalTokens: tokens.length,
    activeTokens: metrics.length,
    timestamp: new Date()
  };
}

/**
 * Get top performing tokens
 */
function getTopPerformers(tokens: any[], metrics: any[]): any[] {
  return tokens
    .filter(token => token.priceChange24h !== null)
    .sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0))
    .slice(0, 5)
    .map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      priceChange24h: token.priceChange24h,
      volume24h: token.volume24h,
      marketCap: token.marketCap
    }));
}

/**
 * Calculate overall market sentiment
 */
async function calculateOverallMarketSentiment(): Promise<number> {
  try {
    const recentSentiment = await prisma.sentimentAnalysis.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      select: { overall: true }
    });

    if (recentSentiment.length === 0) return 0;

    const avgSentiment = recentSentiment.reduce((sum, s) => sum + s.overall, 0) / recentSentiment.length;
    return Math.round(avgSentiment * 100) / 100; // Round to 2 decimal places

  } catch (error) {
    log.error('Failed to calculate market sentiment', error);
    return 0;
  }
}