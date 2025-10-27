import Bull from 'bull';
import { aiService } from '@/services/ai';
import { createLogger } from '@/utils/logger';
import { SignalGenerationJob, Signal, SignalType, RiskLevel } from '@/types';
import db from '@/database';

const log = createLogger('signal-processor');
// const prisma = new PrismaClient();

/**
 * Process signal generation job
 */
export async function processSignalGeneration(job: Bull.Job<SignalGenerationJob>): Promise<any> {
  const data: any = job.data || {};
  const tokenAddresses: string[] = Array.isArray(data.tokenAddresses) && data.tokenAddresses.length
    ? data.tokenAddresses
    : (data.tokenId && data.tokenId !== 'batch' ? [data.tokenId] : []);
  const signalTypes: SignalType[] = Array.isArray(data.signalTypes) && data.signalTypes.length
    ? data.signalTypes
    : ['technical', 'momentum', 'volume', 'social', 'ai'];
  const batchId: string = data.batchId || `batch-${Date.now()}`;

  log.info(`Processing signal generation job: ${batchId}`, {
    tokenCount: tokenAddresses.length,
    signalTypes
  });

  try {
    const results = {
      processed: 0,
      failed: 0,
      signals: [] as Signal[]
    };

    const totalTokens = tokenAddresses.length;

    for (let i = 0; i < tokenAddresses.length; i++) {
      const tokenAddress = tokenAddresses[i];
      
      // Update job progress
      const progress = Math.floor((i / totalTokens) * 100);
      job.progress(progress);
      
      try {
        log.info(`Generating signals for token: ${tokenAddress}`);
        
        // Get comprehensive data for signal generation
        const signalData = await getSignalGenerationData(tokenAddress);
        
        if (!signalData) {
          log.warn(`Insufficient data for signal generation: ${tokenAddress}`);
          results.failed++;
          continue;
        }

        // Generate different types of signals
        const generatedSignals = await generateSignalsForToken(tokenAddress, signalData, signalTypes);
        
        if (generatedSignals.length > 0) {
          results.signals.push(...generatedSignals);
          results.processed++;
          
          log.info(`Generated ${generatedSignals.length} signals for ${tokenAddress}`, {
            types: generatedSignals.map(s => s.type)
          });
        } else {
          log.warn(`No signals generated for token: ${tokenAddress}`);
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        log.error(`Failed to generate signals for ${tokenAddress}`, error);
        results.failed++;
      }
    }

    // Store generated signals
    await storeGeneratedSignals(results.signals, batchId);

    log.info(`Signal generation job completed: ${batchId}`, {
      processed: results.processed,
      failed: results.failed,
      signals: results.signals.length
    });

    return {
      batchId,
      processed: results.processed,
      failed: results.failed,
      signals: results.signals.length
    };

  } catch (error) {
    log.error(`Signal generation job failed: ${batchId}`, error);
    throw error;
  }
}

/**
 * Get comprehensive data for signal generation
 */
async function getSignalGenerationData(tokenAddress: string): Promise<any> {
  try {
    // Get token basic info
    const token = await db.token.findUnique({
      where: { address: tokenAddress }
    });

    if (!token) return null;

    // Get recent price metrics (last 100 data points for better analysis)
    const priceMetrics = await db.tokenMetrics.findMany({
      where: { tokenAddress },
      orderBy: { timestamp: 'desc' },
      take: 100
    });

    // Get recent social metrics
    const socialMetrics = await db.socialMetrics.findMany({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    // Get recent AI analyses
    const technicalAnalysis = await db.technicalAnalysis.findFirst({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 2 * 60 * 60 * 1000) // Last 2 hours
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    const sentimentAnalysis = await db.sentimentAnalysis.findFirst({
      where: {
        tokenAddress,
        timestamp: {
          gte: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    // Get existing signals to avoid duplicates
    const existingSignals = await db.signal.findMany({
      where: {
        tokenAddress,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      token,
      priceMetrics,
      socialMetrics,
      technicalAnalysis,
      sentimentAnalysis,
      existingSignals
    };

  } catch (error) {
    log.error(`Failed to get signal generation data for ${tokenAddress}`, error);
    return null;
  }
}

/**
 * Generate signals for a token
 */
async function generateSignalsForToken(
  tokenAddress: string,
  data: any,
  signalTypes: SignalType[]
): Promise<Signal[]> {
  const signals: Signal[] = [];

  try {
    // Generate technical signals
    if (signalTypes.includes('technical')) {
      const technicalSignals = await generateTechnicalSignals(tokenAddress, data);
      signals.push(...technicalSignals);
    }

    // Generate momentum signals
    if (signalTypes.includes('momentum')) {
      const momentumSignals = await generateMomentumSignals(tokenAddress, data);
      signals.push(...momentumSignals);
    }

    // Generate volume signals
    if (signalTypes.includes('volume')) {
      const volumeSignals = await generateVolumeSignals(tokenAddress, data);
      signals.push(...volumeSignals);
    }

    // Generate social signals
    if (signalTypes.includes('social')) {
      const socialSignals = await generateSocialSignals(tokenAddress, data);
      signals.push(...socialSignals);
    }

    // Generate AI-powered signals
    if (signalTypes.includes('ai')) {
      const aiSignals = await generateAISignals(tokenAddress, data);
      signals.push(...aiSignals);
    }

    // Filter out duplicate or conflicting signals
    return filterAndRankSignals(signals, data.existingSignals);

  } catch (error) {
    log.error(`Failed to generate signals for ${tokenAddress}`, error);
    return [];
  }
}

/**
 * Generate technical analysis based signals
 */
async function generateTechnicalSignals(tokenAddress: string, data: any): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  if (!data.technicalAnalysis || data.priceMetrics.length < 20) {
    return signals;
  }

  const { technicalAnalysis, token } = data;
  const currentPrice = token.price;

  // Support/Resistance breakout signals
  if (technicalAnalysis.resistance && currentPrice > technicalAnalysis.resistance * 1.02) {
    signals.push({
      id: `${tokenAddress}-resistance-breakout-${Date.now()}`,
      tokenAddress,
      type: 'technical',
      action: 'buy',
      strength: Math.min(technicalAnalysis.confidence * 1.2, 1),
      confidence: technicalAnalysis.confidence,
      price: currentPrice,
      targetPrice: technicalAnalysis.resistance * 1.1,
      stopLoss: technicalAnalysis.support || currentPrice * 0.95,
      timeframe: '4h',
      riskLevel: 'medium' as RiskLevel,
      reasoning: `Price broke above resistance level with ${(technicalAnalysis.confidence * 100).toFixed(1)}% confidence`,
      metadata: {
        indicator: 'resistance_breakout',
        resistanceLevel: technicalAnalysis.resistance,
        breakoutStrength: (currentPrice - technicalAnalysis.resistance) / technicalAnalysis.resistance
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours
    });
  }

  // Support bounce signals
  if (technicalAnalysis.support && currentPrice < technicalAnalysis.support * 1.02 && currentPrice > technicalAnalysis.support * 0.98) {
    signals.push({
      id: `${tokenAddress}-support-bounce-${Date.now()}`,
      tokenAddress,
      type: 'technical',
      action: 'buy',
      strength: technicalAnalysis.confidence * 0.8,
      confidence: technicalAnalysis.confidence * 0.8,
      price: currentPrice,
      targetPrice: technicalAnalysis.resistance || currentPrice * 1.05,
      stopLoss: technicalAnalysis.support * 0.98,
      timeframe: '2h',
      riskLevel: 'low' as RiskLevel,
      reasoning: `Support level bounce at $${technicalAnalysis.support.toFixed(6)}`,
      metadata: {
        indicator: 'support_bounce',
        supportLevel: technicalAnalysis.support,
        distanceToSupport: (currentPrice - technicalAnalysis.support) / technicalAnalysis.support
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
    });
  }

  // Trend reversal signals
  if (technicalAnalysis.trend === 'bearish' && technicalAnalysis.strength < 0.3) {
    signals.push({
      id: `${tokenAddress}-trend-reversal-${Date.now()}`,
      tokenAddress,
      type: 'technical',
      action: 'buy',
      strength: (1 - technicalAnalysis.strength) * 0.7,
      confidence: technicalAnalysis.confidence * 0.6,
      price: currentPrice,
      targetPrice: currentPrice * 1.08,
      stopLoss: currentPrice * 0.95,
      timeframe: '6h',
      riskLevel: 'medium' as RiskLevel,
      reasoning: 'Potential trend reversal from bearish to bullish',
      metadata: {
        indicator: 'trend_reversal',
        previousTrend: technicalAnalysis.trend,
        trendStrength: technicalAnalysis.strength
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours
    });
  }

  return signals;
}

/**
 * Generate momentum based signals
 */
async function generateMomentumSignals(tokenAddress: string, data: any): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  if (data.priceMetrics.length < 10) {
    return signals;
  }

  const { priceMetrics, token } = data;
  const currentPrice = token.price;
  
  // Calculate momentum indicators
  const prices = priceMetrics.map((m: any) => m.price).reverse(); // Oldest first
  
  // Price momentum (10-period)
  if (prices.length >= 10) {
    const momentum = ((prices[prices.length - 1] - prices[prices.length - 10]) / prices[prices.length - 10]) * 100;
    
    // Strong positive momentum
    if (momentum > 15) {
      signals.push({
        id: `${tokenAddress}-momentum-bull-${Date.now()}`,
        tokenAddress,
        type: 'momentum',
        action: 'buy',
        strength: Math.min(momentum / 20, 1),
        confidence: 0.7,
        price: currentPrice,
        targetPrice: currentPrice * 1.1,
      stopLoss: currentPrice * 0.92,
      timeframe: '2h',
      riskLevel: 'medium' as RiskLevel,
      reasoning: `Price gained ${momentum.toFixed(1)}% over last 10 periods`,
      metadata: {
          indicator: 'momentum',
          momentumValue: momentum,
          period: 10
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
      });
    }
    
    // Strong negative momentum (potential reversal)
    else if (momentum < -20) {
      signals.push({
        id: `${tokenAddress}-momentum-oversold-${Date.now()}`,
        tokenAddress,
        type: 'momentum',
        action: 'buy',
        strength: Math.min(Math.abs(momentum) / 30, 0.8),
        confidence: 0.6,
        price: currentPrice,
        targetPrice: currentPrice * 1.05,
        stopLoss: currentPrice * 0.95,
        timeframe: '4h',
        riskLevel: 'high' as RiskLevel,
        reasoning: `Potential reversal after ${Math.abs(momentum).toFixed(1)}% decline`,
        metadata: {
          indicator: 'oversold_momentum',
          momentumValue: momentum,
          period: 10
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000)
      });
    }
  }

  return signals;
}

/**
 * Generate volume based signals
 */
async function generateVolumeSignals(tokenAddress: string, data: any): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  if (data.priceMetrics.length < 5) {
    return signals;
  }

  const { priceMetrics, token } = data;
  const currentPrice = token.price;
  const currentVolume = token.volume24h;
  
  // Calculate average volume
  const volumes = priceMetrics.map((m: any) => m.volume24h);
  const avgVolume = volumes.reduce((sum: number, vol: number) => sum + vol, 0) / volumes.length;
  
  if (avgVolume === 0) return signals;
  
  const volumeRatio = currentVolume / avgVolume;
  
  // Volume spike signal
  if (volumeRatio > 3 && token.priceChange24h > 5) {
    signals.push({
      id: `${tokenAddress}-volume-spike-${Date.now()}`,
      tokenAddress,
      type: 'volume',
      action: 'buy',
      strength: Math.min(volumeRatio / 5, 1),
      confidence: 0.8,
      price: currentPrice,
      targetPrice: currentPrice * 1.08,
      stopLoss: currentPrice * 0.95,
      timeframe: '1h',
      riskLevel: 'medium' as RiskLevel,
      reasoning: `${volumeRatio.toFixed(1)}x volume increase with ${token.priceChange24h.toFixed(1)}% price gain`,
      metadata: {
        indicator: 'volume_spike',
        volumeRatio,
        avgVolume,
        currentVolume,
        priceChange: token.priceChange24h
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    });
  }

  // Volume divergence (high volume, low price movement)
  if (volumeRatio > 2 && Math.abs(token.priceChange24h) < 2) {
    signals.push({
      id: `${tokenAddress}-volume-divergence-${Date.now()}`,
      tokenAddress,
      type: 'volume',
      action: 'watch',
      strength: 0.6,
      confidence: 0.7,
      price: currentPrice,
      targetPrice: null,
      stopLoss: null,
      timeframe: '2h',
      riskLevel: 'low' as RiskLevel,
      reasoning: `${volumeRatio.toFixed(1)}x volume with only ${Math.abs(token.priceChange24h).toFixed(1)}% price change`,
      metadata: {
        indicator: 'volume_divergence',
        volumeRatio,
        priceChange: token.priceChange24h
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
    });
  }

  return signals;
}

/**
 * Generate social sentiment based signals
 */
async function generateSocialSignals(tokenAddress: string, data: any): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  if (!data.socialMetrics || data.socialMetrics.length === 0) {
    return signals;
  }

  const { socialMetrics, token } = data;
  const currentPrice = token.price;
  
  // Calculate recent social metrics
  const recentMetrics = socialMetrics.slice(0, 5); // Last 5 data points
  const avgSentiment = recentMetrics.reduce((sum: number, m: any) => sum + m.sentiment, 0) / recentMetrics.length;
    const totalMentions = recentMetrics.reduce((sum: number, m: any) => sum + m.mentions, 0);
  const totalEngagement = recentMetrics.reduce((sum: number, m: any) => sum + m.engagement, 0);

  // Positive sentiment surge
  if (avgSentiment > 0.6 && totalMentions > 20) {
    signals.push({
      id: `${tokenAddress}-social-bullish-${Date.now()}`,
      tokenAddress,
      type: 'social',
      action: 'buy',
      strength: avgSentiment * 0.8,
      confidence: Math.min(totalMentions / 50, 0.9),
      price: currentPrice,
      targetPrice: currentPrice * 1.06,
      stopLoss: currentPrice * 0.96,
      timeframe: '3h',
      riskLevel: 'medium' as RiskLevel,
      reasoning: `${totalMentions} mentions with ${(avgSentiment * 100).toFixed(0)}% positive sentiment`,
      metadata: {
        indicator: 'social_sentiment',
        sentiment: avgSentiment,
        mentions: totalMentions,
        engagement: totalEngagement
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000)
    });
  }

  // Social momentum (increasing mentions)
  if (recentMetrics.length >= 3) {
    const oldMentions = recentMetrics.slice(-2).reduce((sum: number, m: any) => sum + m.mentions, 0);
    const newMentions = recentMetrics.slice(0, 2).reduce((sum: number, m: any) => sum + m.mentions, 0);
    
    if (newMentions > oldMentions * 1.5 && newMentions > 10) {
      signals.push({
        id: `${tokenAddress}-social-momentum-${Date.now()}`,
        tokenAddress,
        type: 'social',
        action: 'watch',
        strength: Math.min((newMentions / oldMentions - 1), 1),
        confidence: 0.7,
        price: currentPrice,
        targetPrice: null,
        stopLoss: null,
        timeframe: '2h',
        riskLevel: 'low' as RiskLevel,
        reasoning: `Social momentum: ${((newMentions / oldMentions - 1) * 100).toFixed(0)}% increase`,
        metadata: {
          indicator: 'social_momentum',
          oldMentions,
          newMentions,
          growthRate: (newMentions / oldMentions - 1)
        },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
      });
    }
  }

  return signals;
}

/**
 * Generate AI-powered signals
 */
async function generateAISignals(tokenAddress: string, data: any): Promise<Signal[]> {
  const signals: Signal[] = [];
  
  try {
    // Use AI service to generate trading signals
    const aiSignal = await aiService.generateTradingSignal(
      tokenAddress,
      data.analyses || [],
      data.token,
      data.socialMetrics || []
    );
    
    if (!aiSignal) {
      return signals;
    }

    const currentPrice = data.token.price;

    signals.push({
      id: `${tokenAddress}-ai-${aiSignal.type}-${Date.now()}`,
      tokenAddress,
      type: 'ai',
      action: aiSignal.type,
      strength: aiSignal.strength,
      confidence: aiSignal.confidence,
      price: currentPrice,
      targetPrice: aiSignal.targetPrice ?? null,
      stopLoss: aiSignal.stopLoss ?? null,
      timeframe: aiSignal.timeframe || '4h',
      reasoning: aiSignal.reasoning,
      metadata: {
        indicator: 'ai_analysis'
      },
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000)
    });

  } catch (error) {
    log.error(`Failed to generate AI signals for ${tokenAddress}`, error);
  }

  return signals;
}

/**
 * Filter and rank signals to avoid conflicts and duplicates
 */
function filterAndRankSignals(signals: Signal[], existingSignals: any[]): Signal[] {
  // Remove signals that are too similar to existing ones
  const filteredSignals = signals.filter(signal => {
    return !existingSignals.some((existing: any) =>
      existing.type === signal.type &&
      existing.action === signal.action &&
      Math.abs(existing.price - signal.price) / signal.price < 0.02 &&
      (Date.now() - new Date(existing.createdAt).getTime()) < 2 * 60 * 60 * 1000
    );
  });

  // Sort by strength and confidence
  return filteredSignals
    .sort((a, b) => (b.strength * b.confidence) - (a.strength * a.confidence))
    .slice(0, 5);
}

/**
 * Store generated signals in database
 */
async function storeGeneratedSignals(signals: Signal[], batchId: string): Promise<void> {
  try {
    log.info(`Storing ${signals.length} signals for batch: ${batchId}`);

    for (const signal of signals) {
      await db.signal.create({
        data: {
          tokenAddress: signal.tokenAddress,
          type: signal.type,
          action: signal.action,
          strength: signal.strength,
          confidence: signal.confidence,
          price: signal.price,
          targetPrice: signal.targetPrice ?? null,
          stopLoss: signal.stopLoss ?? null,
          timeframe: signal.timeframe,
          riskLevel: (signal.riskLevel as string) || 'medium',
          description: signal.reasoning || 'Generated trading signal',
          reasoning: signal.reasoning || '',
          metadata: signal.metadata || {},
          status: 'active',
          createdAt: signal.createdAt,
          expiresAt: signal.expiresAt ?? null
        }
      });
    }

    log.info(`Successfully stored ${signals.length} signals for batch: ${batchId}`);

  } catch (error) {
    log.error(`Failed to store signals for batch: ${batchId}`, error);
    throw error;
  }
}

/**
 * Get tokens that need signal generation
 */
export async function getTokensNeedingSignals(): Promise<string[]> {
  try {
    const cutoffTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    
    // Get tokens with recent market updates but no recent signals
    const activeTokens = await db.tokenMetrics.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 15 * 60 * 1000)
        }
      },
      select: { tokenAddress: true },
      distinct: ['tokenAddress'],
      take: 30
    });

    const tokensNeedingSignals: string[] = [];

    for (const { tokenAddress } of activeTokens) {
      // Check if token has recent signals
      const recentSignals = await db.signal.findFirst({
        where: {
          tokenAddress,
          createdAt: { gte: cutoffTime }
        }
      });

      if (!recentSignals) {
        tokensNeedingSignals.push(tokenAddress);
      }
    }

    return tokensNeedingSignals;

  } catch (error) {
    log.error('Failed to get tokens needing signals', error);
    return [];
  }
}
