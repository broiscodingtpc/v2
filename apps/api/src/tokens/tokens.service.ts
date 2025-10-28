import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';
import { TokensQueryDto, TrendingQueryDto } from '@metapulse/shared';
import axios from 'axios';

@Injectable()
export class TokensService {
  async searchTokens(query: TokensQueryDto) {
    const { limit = 20 } = query;
    const offset = (query as any).offset ?? 0;
    const search = (query as any).search as string | undefined;

    const where = search
      ? {
          OR: [
            { symbol: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } },
            { mint: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [tokens, total] = await Promise.all([
      prisma.token.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { lastSeenAt: 'desc' },
        include: {
          pairs: {
            take: 1,
            orderBy: { vol24h: 'desc' },
          },
        },
      }),
      prisma.token.count({ where }),
    ]);

    return {
      tokens: tokens.map((token) => {
        const topPair = token.pairs[0];
        return {
          address: token.mint,
          symbol: token.symbol ?? '',
          name: token.name ?? '',
          price: topPair ? Number(topPair.price) : 0,
          marketCap: null,
          volume24h: topPair ? Number(topPair.vol24h) : 0,
          priceChange24h: null,
          logoUrl: null,
          pairs: token.pairs.map((pair) => ({
            address: pair.id,
            dex: pair.dexId,
            volume24h: Number(pair.vol24h),
            liquidity: Number(pair.liqUsd),
          })),
        };
      }),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async getTrendingTokens(query: TrendingQueryDto) {
    const { window = '24h', limit = 10 } = query as any;

    const now = new Date();
    let timeThreshold: Date;
    switch (window) {
      case '1h':
        timeThreshold = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '4h':
        timeThreshold = new Date(now.getTime() - 4 * 60 * 60 * 1000);
        break;
      case '24h':
      default:
        timeThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
    }

    const tokens = await prisma.token.findMany({
      where: {
        pairs: {
          some: { updatedAt: { gte: timeThreshold } },
        },
      },
      take: limit,
      orderBy: { lastSeenAt: 'desc' },
      include: {
        pairs: {
          take: 1,
          orderBy: { vol24h: 'desc' },
        },
      },
    });

    return tokens.map((token) => {
      const topPair = token.pairs[0];
      return {
        address: token.mint,
        symbol: token.symbol ?? '',
        name: token.name ?? '',
        price: topPair ? Number(topPair.price) : 0,
        marketCap: null,
        volume24h: topPair ? Number(topPair.vol24h) : 0,
        priceChange24h: null,
        logoUrl: null,
        pairs: token.pairs.map((pair) => ({
          address: pair.id,
          dex: pair.dexId,
          volume24h: Number(pair.vol24h),
          liquidity: Number(pair.liqUsd),
        })),
      };
    });
  }

  async getHotMeta(limit = 10) {
    const hotTokens = await prisma.token.findMany({
      where: {
        mentions: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        },
      },
      take: limit,
      orderBy: { lastSeenAt: 'desc' },
      include: {
        mentions: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        pairs: {
          take: 1,
          orderBy: { vol24h: 'desc' },
        },
      },
    });

    return hotTokens.map((token) => {
      const topPair = token.pairs[0];
      return {
        address: token.mint,
        symbol: token.symbol ?? '',
        name: token.name ?? '',
        price: topPair ? Number(topPair.price) : 0,
        marketCap: null,
        volume24h: topPair ? Number(topPair.vol24h) : 0,
        priceChange24h: null,
        logoUrl: null,
        socialScore: 0,
        technicalScore: 0,
        overallScore: 0,
        recentMentions: token.mentions.map((mention) => ({
          platform: 'twitter',
          content: mention.author,
          sentiment: 'neutral',
          createdAt: mention.createdAt.toISOString(),
        })),
        pairs: token.pairs.map((pair) => ({
          address: pair.id,
          dex: pair.dexId,
          volume24h: Number(pair.vol24h),
          liquidity: Number(pair.liqUsd),
        })),
      };
    });
  }

  async getTokenDetails(address: string) {
    const token = await prisma.token.findUnique({
      where: { mint: address },
      include: {
        pairs: {
          orderBy: { vol24h: 'desc' },
        },
        mentions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        reports: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!token) {
      return null;
    }

    return {
      address: token.mint,
      symbol: token.symbol ?? '',
      name: token.name ?? '',
      price: token.pairs.length ? Number(token.pairs[0].price) : 0,
      marketCap: null,
      volume24h: token.pairs.length ? Number(token.pairs[0].vol24h) : 0,
      priceChange24h: null,
      logoUrl: null,
      description: null,
      website: null,
      twitter: null,
      telegram: null,
      createdAt: token.discoveredAt.toISOString(),
      updatedAt: token.lastSeenAt.toISOString(),
      pairs: token.pairs.map((pair) => ({
        address: pair.id,
        dex: pair.dexId,
        volume24h: Number(pair.vol24h),
        liquidity: Number(pair.liqUsd),
        priceChange24h: null,
      })),
      signalScores: [],
      socialMentions: token.mentions.map((mention) => ({
        platform: 'twitter',
        content: mention.author,
        sentiment: 'neutral',
        engagementScore: mention.followers,
        createdAt: mention.createdAt.toISOString(),
      })),
      analystReports: token.reports.map((report) => ({
        title: report.summaryShort,
        summary: report.summaryLong,
        sentiment: report.riskSummary,
        confidenceScore: 0,
        createdAt: report.createdAt.toISOString(),
      })),
    };
  }

  async populateTokensFromDexScreener() {
    try {
      // Fetch popular Solana tokens from DexScreener
      const response = await axios.get('https://api.dexscreener.com/latest/dex/tokens/solana');
      const tokens = response.data.pairs || [];

      const results = {
        processed: 0,
        failed: 0,
        tokens: []
      };

      for (const pair of tokens.slice(0, 50)) { // Limit to first 50 tokens
        try {
          // Upsert token
          const token = await prisma.token.upsert({
            where: { mint: pair.baseToken.address },
            update: {
              symbol: pair.baseToken.symbol,
              name: pair.baseToken.name,
              lastSeenAt: new Date(),
            },
            create: {
              mint: pair.baseToken.address,
              symbol: pair.baseToken.symbol,
              name: pair.baseToken.name,
              chain: 'sol',
              discoveredAt: new Date(),
              lastSeenAt: new Date(),
            },
          });

          // Upsert pair
          await prisma.tokenPair.upsert({
            where: { id: pair.pairAddress },
            update: {
              dexId: pair.dexId,
              price: pair.priceUsd ? parseFloat(pair.priceUsd) : 0,
              vol24h: pair.volume ? parseFloat(pair.volume.h24) : 0,
              liqUsd: pair.liquidity ? parseFloat(pair.liquidity.usd) : 0,
              updatedAt: new Date(),
            },
            create: {
              id: pair.pairAddress,
              tokenMint: pair.baseToken.address,
              dexId: pair.dexId,
              price: pair.priceUsd ? parseFloat(pair.priceUsd) : 0,
              vol24h: pair.volume ? parseFloat(pair.volume.h24) : 0,
              liqUsd: pair.liquidity ? parseFloat(pair.liquidity.usd) : 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });

          results.processed++;
          results.tokens.push({
            address: token.mint,
            symbol: token.symbol,
            name: token.name,
            price: pair.priceUsd ? parseFloat(pair.priceUsd) : 0,
            volume24h: pair.volume ? parseFloat(pair.volume.h24) : 0,
          });

        } catch (error) {
          console.error(`Failed to process token ${pair.baseToken.address}:`, error);
          results.failed++;
        }
      }

      return {
        message: 'Tokens populated successfully',
        results
      };

    } catch (error) {
      console.error('Failed to populate tokens:', error);
      throw new Error('Failed to populate tokens from DexScreener');
    }
  }
}
