import Bull from 'bull';
import { dexScreenerService } from '@/services/dexscreener';
import { createLogger } from '@/utils/logger';
import { TokenDataJob, Token, DexScreenerPair } from '@/types';
import db from '@/database';
// Removed sharedPrisma usage; worker uses local db schema exclusively

const log = createLogger('token-processor');
// const prisma = new PrismaClient();

/**
 * Process token data collection job
 */
export async function processTokenData(job: Bull.Job<TokenDataJob>): Promise<any> {
  const { tokenAddresses, network, batchId } = job.data;
  
  log.info(`Processing token data job: ${batchId}`, {
    tokenCount: tokenAddresses.length,
    network
  });

  try {
    let addresses = tokenAddresses;
    
    // If no specific addresses provided, get popular tokens
    if (addresses.length === 0) {
      addresses = await getPopularTokenAddresses(network);
      log.info(`Using ${addresses.length} popular token addresses`);
    }

    const results = {
      processed: 0,
      failed: 0,
      tokens: [] as Token[],
      pairs: [] as DexScreenerPair[]
    };

    // Process tokens in batches to manage rate limits
    const batchSize = 10;
    const totalBatches = Math.ceil(addresses.length / batchSize);

    for (let i = 0; i < addresses.length; i += batchSize) {
      const batch = addresses.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      // Update job progress
      const progress = Math.floor((batchNumber / totalBatches) * 100);
      job.progress(progress);
      
      log.info(`Processing batch ${batchNumber}/${totalBatches}`, {
        batchId,
        addresses: batch.length
      });

      try {
        // Process each token in the batch
        const processedResults = await Promise.all(batch.map(address => processIndividualToken(address)));

        processedResults.forEach(result => {
          if (result) {
            results.tokens.push(result.token);
            results.pairs.push(result.pair);
            results.processed++;
          } else {
            results.failed++;
          }
        });

        // Rate limiting delay between batches
        if (i + batchSize < addresses.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

      } catch (error) {
        log.error(`Failed to process batch ${batchNumber}`, error);
        results.failed += batch.length;
      }
    }

    await storeTokenData(results.tokens, results.pairs, batchId);

    log.info(`Token data job completed: ${batchId}`, {
      processed: results.processed,
      failed: results.failed,
      totalTokens: results.tokens.length,
      totalPairs: results.pairs.length
    });

    return {
      batchId,
      processed: results.processed,
      failed: results.failed,
      tokens: results.tokens.length,
      pairs: results.pairs.length
    };

  } catch (error) {
    log.error(`Token data job failed: ${batchId}`, error);
    throw error;
  }
}

/**
 * Process individual token
 */
async function processIndividualToken(
  address: string
): Promise<{ token: Token; pair: DexScreenerPair } | null> {
  try {
    // Get token pairs from DexScreener
    const pairs = await dexScreenerService.getTokenPairs(address);
    
    if (pairs.length === 0) {
      log.warn(`No pairs found for token: ${address}`);
      return null;
    }

    // Use the pair with highest liquidity
    const bestPair = pairs.reduce((prev, current) => 
      (current.liquidity.usd > prev.liquidity.usd) ? current : prev
    );

    // Convert to internal formats
    const token = dexScreenerService.convertPairToToken(bestPair);
    // const priceData = dexScreenerService.convertPairToPriceData(bestPair);

    // results.tokens.push(token);
    // results.priceData.push(priceData);

    log.info(`Token processed: ${address}`, {
      symbol: token.symbol,
      price: token.price,
      volume24h: token.volume24h
    });

    return { token, pair: bestPair };

  } catch (error) {
    log.error(`Failed to fetch token data for: ${address}`, error as Error);
    return null;
  }
}

/**
 * Get popular token addresses for the network
 */
async function getPopularTokenAddresses(network: string): Promise<string[]> {
  try {
    const addresses = new Set<string>();
    
    // Get tokens from DexScreener
    try {
      const dexScreenerTokens = await dexScreenerService.searchTokens('solana');
      dexScreenerTokens.forEach(pair => addresses.add(pair.baseToken.address));
      log.info(`Retrieved ${dexScreenerTokens.length} tokens from DexScreener`);
    } catch (error) {
      log.warn('Failed to get tokens from DexScreener', error);
    }
    
      // PumpPortal now uses WebSocket for real-time data
      // We'll rely on DexScreener for initial token discovery
      // PumpPortal will provide real-time updates via WebSocket
      log.info('PumpPortal now provides real-time data via WebSocket');
    
    const addressArray = Array.from(addresses);
    log.info(`Retrieved ${addressArray.length} unique token addresses for ${network}`);
    return addressArray.slice(0, 50); // Limit to 50 tokens

  } catch (error) {
    log.error(`Failed to get popular tokens for ${network}`, error);
    
    // Fallback to known popular tokens
    return getKnownPopularTokens(network);
  }
}

/**
 * Get known popular token addresses as fallback
 */
function getKnownPopularTokens(network: string): string[] {
  const knownTokens: Record<string, string[]> = {
    solana: [
      'So11111111111111111111111111111111111111112', // SOL
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // USDT
      'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
      'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
      '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', // WIF
      'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', // JUP
    ],
    ethereum: [
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
      '0xA0b86a33E6417c4c2f1C6b82B3C3c8c8F8c8F8c8', // USDC
      '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI
      '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', // MATIC
    ]
  };

  return knownTokens[network] || [];
}

/**
 * Store token and price data in database
 */
async function storeTokenData(
  tokens: Token[], 
  pairs: DexScreenerPair[], 
  batchId: string
): Promise<void> {
  try {
    log.info(`Storing token data for batch: ${batchId}`, {
      tokens: tokens.length,
      pairs: pairs.length
    });

    // Upsert Tokens (worker schema) and store TokenMetrics snapshot
    await Promise.all(tokens.map(async (token) => {
      await db.token.upsert({
        where: { address: token.address },
        update: {
          symbol: token.symbol,
          name: token.name,
          network: token.network,
          price: token.price,
          priceChange24h: token.priceChange24h,
          volume24h: token.volume24h,
          marketCap: token.marketCap,
          liquidity: token.liquidity,
          fdv: token.fdv,
          holders: token.holders,
          updatedAt: new Date(),
        },
        create: {
          address: token.address,
          symbol: token.symbol,
          name: token.name,
          network: token.network,
          price: token.price,
          priceChange24h: token.priceChange24h,
          volume24h: token.volume24h,
          marketCap: token.marketCap,
          liquidity: token.liquidity,
          fdv: token.fdv,
          holders: token.holders,
          updatedAt: new Date(),
        },
      });

      await db.tokenMetrics.create({
        data: {
          tokenAddress: token.address,
          price: token.price,
          volume24h: token.volume24h,
          marketCap: token.marketCap,
          liquidity: token.liquidity,
          priceChange24h: token.priceChange24h,
          timestamp: new Date(),
        },
      });
    }));

    // Shared schema writes (Token/Pair) removed to avoid mismatched Prisma clients

    log.info(`Successfully stored token data for batch: ${batchId}`);
  } catch (error) {
    log.error(`Failed to store token data for batch: ${batchId}`, error as Error);
    throw error;
  }
}

/**
 * Get tokens that need data updates
 */
export async function getTokensNeedingUpdate(): Promise<string[]> {
  try {
    const cutoffTime = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
    const tokens = await db.token.findMany({
      where: {
        updatedAt: { lt: cutoffTime },
      },
      select: { address: true },
      take: 100,
    });

    return tokens.map((token: { address: string }) => token.address);

  } catch (error) {
    log.error('Failed to get tokens needing update', error);
    return [];
  }
}

/**
 * Calculate technical indicators for stored price data
 */
export async function calculateTechnicalIndicators(tokenAddress: string): Promise<Record<string, number>> {
  try {
    // Get recent price data (last 50 data points) from worker TokenMetrics
    const metrics = await db.tokenMetrics.findMany({
      where: { tokenAddress },
      orderBy: { timestamp: 'desc' },
      take: 50,
      select: {
        price: true,
        volume24h: true,
        timestamp: true,
      },
    });

    if (metrics.length < 10) {
      return {};
    }

    const prices = metrics.map((m) => Number(m.price)).reverse(); // Oldest first
    const volumes = metrics.map((m) => Number(m.volume24h)).reverse();

    // Simple Moving Averages
    const sma10 = calculateSMA(prices, 10);
    const sma20 = calculateSMA(prices, 20);
    
    // Relative Strength Index
    const rsi = calculateRSI(prices, 14);
    
    // Volume indicators
    const avgVolume = volumes.reduce((sum: number, vol: number) => sum + vol, 0) / volumes.length;
    const currentVolume = volumes[volumes.length - 1];
    const volumeRatio = avgVolume > 0 ? currentVolume / avgVolume : 1;

    // Price momentum
    const momentum = prices.length >= 10 ? 
      ((prices[prices.length - 1] - prices[prices.length - 10]) / prices[prices.length - 10]) * 100 : 0;

    return {
      sma10,
      sma20,
      rsi,
      volumeRatio,
      momentum,
      avgVolume,
      currentPrice: prices[prices.length - 1]
    };

  } catch (error) {
    log.error(`Failed to calculate technical indicators for ${tokenAddress}`, error);
    return {};
  }
}

/**
 * Calculate Simple Moving Average
 */
function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return 0;
  
  const recentPrices = prices.slice(-period);
  return recentPrices.reduce((sum, price) => sum + price, 0) / period;
}

/**
 * Calculate Relative Strength Index
 */
function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) return 50; // Neutral RSI
  
  const changes = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }
  
  const recentChanges = changes.slice(-period);
  const gains = recentChanges.filter(change => change > 0);
  const losses = recentChanges.filter(change => change < 0).map(loss => Math.abs(loss));
  
  const avgGain = gains.length > 0 ? gains.reduce((sum, gain) => sum + gain, 0) / period : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((sum, loss) => sum + loss, 0) / period : 0;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}
