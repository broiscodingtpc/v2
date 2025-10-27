import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';
import { TokensQueryDto, TrendingQueryDto } from '@metapulse/shared';

@Injectable()
export class TokensService {
  async searchTokens(query: TokensQueryDto) {
    const { search, limit = 20, offset = 0 } = query;
    
    const where = search ? {
      OR: [
        { symbol: { contains: search, mode: 'insensitive' as const } },
        { name: { contains: search, mode: 'insensitive' as const } },
        { address: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [tokens, total] = await Promise.all([
      prisma.token.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { marketCap: 'desc' },
        include: {
          pairs: {
            take: 1,
            orderBy: { volume24h: 'desc' },
          },
        },
      }),
      prisma.token.count({ where }),
    ]);

    return {
      tokens: tokens.map(token => ({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        price: token.price,
        marketCap: token.marketCap,
        volume24h: token.volume24h,
        priceChange24h: token.priceChange24h,
        logoUrl: token.logoUrl,
        pairs: token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async getTrendingTokens(query: TrendingQueryDto) {
    const { timeframe = '24h', limit = 10 } = query;
    
    // Calculate time threshold based on timeframe
    const now = new Date();
    let timeThreshold: Date;
    
    switch (timeframe) {
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
        updatedAt: { gte: timeThreshold },
        priceChange24h: { gt: 0 }, // Only tokens with positive price change
      },
      take: limit,
      orderBy: [
        { priceChange24h: 'desc' },
        { volume24h: 'desc' },
      ],
      include: {
        pairs: {
          take: 1,
          orderBy: { volume24h: 'desc' },
        },
      },
    });

    return tokens.map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      marketCap: token.marketCap,
      volume24h: token.volume24h,
      priceChange24h: token.priceChange24h,
      logoUrl: token.logoUrl,
      pairs: token.pairs.map(pair => ({
        address: pair.address,
        dex: pair.dex,
        volume24h: pair.volume24h,
        liquidity: pair.liquidity,
      })),
    }));
  }

  async getHotMeta(limit = 10) {
    // Get tokens with recent social mentions and high signal scores
    const hotTokens = await prisma.token.findMany({
      where: {
        socialMentions: {
          some: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
            },
          },
        },
      },
      take: limit,
      orderBy: [
        { volume24h: 'desc' },
        { priceChange24h: 'desc' },
      ],
      include: {
        socialMentions: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
        signalScores: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        pairs: {
          take: 1,
          orderBy: { volume24h: 'desc' },
        },
      },
    });

    return hotTokens.map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      marketCap: token.marketCap,
      volume24h: token.volume24h,
      priceChange24h: token.priceChange24h,
      logoUrl: token.logoUrl,
      socialScore: token.signalScores[0]?.socialScore || 0,
      technicalScore: token.signalScores[0]?.technicalScore || 0,
      overallScore: token.signalScores[0]?.overallScore || 0,
      recentMentions: token.socialMentions.map(mention => ({
        platform: mention.platform,
        content: mention.content,
        sentiment: mention.sentiment,
        createdAt: mention.createdAt.toISOString(),
      })),
      pairs: token.pairs.map(pair => ({
        address: pair.address,
        dex: pair.dex,
        volume24h: pair.volume24h,
        liquidity: pair.liquidity,
      })),
    }));
  }

  async getTokenDetails(address: string) {
    const token = await prisma.token.findUnique({
      where: { address },
      include: {
        pairs: {
          orderBy: { volume24h: 'desc' },
        },
        signalScores: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        socialMentions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        analystReports: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!token) {
      return null;
    }

    return {
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      price: token.price,
      marketCap: token.marketCap,
      volume24h: token.volume24h,
      priceChange24h: token.priceChange24h,
      logoUrl: token.logoUrl,
      description: token.description,
      website: token.website,
      twitter: token.twitter,
      telegram: token.telegram,
      createdAt: token.createdAt.toISOString(),
      updatedAt: token.updatedAt.toISOString(),
      pairs: token.pairs.map(pair => ({
        address: pair.address,
        dex: pair.dex,
        volume24h: pair.volume24h,
        liquidity: pair.liquidity,
        priceChange24h: pair.priceChange24h,
      })),
      signalScores: token.signalScores.map(score => ({
        socialScore: score.socialScore,
        technicalScore: score.technicalScore,
        overallScore: score.overallScore,
        createdAt: score.createdAt.toISOString(),
      })),
      socialMentions: token.socialMentions.map(mention => ({
        platform: mention.platform,
        content: mention.content,
        sentiment: mention.sentiment,
        engagementScore: mention.engagementScore,
        createdAt: mention.createdAt.toISOString(),
      })),
      analystReports: token.analystReports.map(report => ({
        title: report.title,
        summary: report.summary,
        sentiment: report.sentiment,
        confidenceScore: report.confidenceScore,
        createdAt: report.createdAt.toISOString(),
      })),
    };
  }
}