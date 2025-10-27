import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';
import { SignalsQueryDto } from '@metapulse/shared';

@Injectable()
export class SignalsService {
  async getSignalEvents(query: SignalsQueryDto) {
    const { 
      tokenAddress, 
      eventType, 
      timeframe = '24h', 
      limit = 20, 
      offset = 0 
    } = query;

    // Calculate time threshold
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
      case '7d':
        timeThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
    }

    const where: any = {
      createdAt: { gte: timeThreshold },
    };

    if (tokenAddress) {
      where.tokenAddress = tokenAddress;
    }

    if (eventType) {
      where.eventType = eventType;
    }

    const [events, total] = await Promise.all([
      prisma.signalEvent.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          token: {
            select: {
              symbol: true,
              name: true,
              logoUrl: true,
            },
          },
        },
      }),
      prisma.signalEvent.count({ where }),
    ]);

    return {
      events: events.map(event => ({
        id: event.id,
        tokenAddress: event.tokenAddress,
        eventType: event.eventType,
        severity: event.severity,
        message: event.message,
        metadata: event.metadata,
        createdAt: event.createdAt.toISOString(),
        token: event.token,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async getTokenSignalScores(tokenAddress: string, limit = 24) {
    const scores = await prisma.signalScore.findMany({
      where: { tokenAddress },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        token: {
          select: {
            symbol: true,
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    return scores.map(score => ({
      id: score.id,
      tokenAddress: score.tokenAddress,
      socialScore: score.socialScore,
      technicalScore: score.technicalScore,
      overallScore: score.overallScore,
      metadata: score.metadata,
      createdAt: score.createdAt.toISOString(),
      token: score.token,
    }));
  }

  async getTopSignalTokens(timeframe = '24h', limit = 20) {
    // Calculate time threshold
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

    // Get tokens with highest signal scores in the timeframe
    const topTokens = await prisma.signalScore.findMany({
      where: {
        createdAt: { gte: timeThreshold },
      },
      orderBy: [
        { overallScore: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
      distinct: ['tokenAddress'],
      include: {
        token: {
          include: {
            pairs: {
              take: 1,
              orderBy: { volume24h: 'desc' },
            },
          },
        },
      },
    });

    return topTokens.map(score => ({
      tokenAddress: score.tokenAddress,
      socialScore: score.socialScore,
      technicalScore: score.technicalScore,
      overallScore: score.overallScore,
      createdAt: score.createdAt.toISOString(),
      token: {
        address: score.token.address,
        symbol: score.token.symbol,
        name: score.token.name,
        price: score.token.price,
        marketCap: score.token.marketCap,
        volume24h: score.token.volume24h,
        priceChange24h: score.token.priceChange24h,
        logoUrl: score.token.logoUrl,
        pairs: score.token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
      },
    }));
  }

  async getSignalSummary(tokenAddress?: string) {
    const timeThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const where: any = {
      createdAt: { gte: timeThreshold },
    };

    if (tokenAddress) {
      where.tokenAddress = tokenAddress;
    }

    const [
      totalEvents,
      highSeverityEvents,
      mediumSeverityEvents,
      lowSeverityEvents,
      avgScores,
    ] = await Promise.all([
      prisma.signalEvent.count({ where }),
      prisma.signalEvent.count({ where: { ...where, severity: 'HIGH' } }),
      prisma.signalEvent.count({ where: { ...where, severity: 'MEDIUM' } }),
      prisma.signalEvent.count({ where: { ...where, severity: 'LOW' } }),
      prisma.signalScore.aggregate({
        where: tokenAddress ? { tokenAddress } : {},
        _avg: {
          socialScore: true,
          technicalScore: true,
          overallScore: true,
        },
      }),
    ]);

    return {
      totalEvents,
      eventsBySeverity: {
        high: highSeverityEvents,
        medium: mediumSeverityEvents,
        low: lowSeverityEvents,
      },
      averageScores: {
        social: avgScores._avg.socialScore || 0,
        technical: avgScores._avg.technicalScore || 0,
        overall: avgScores._avg.overallScore || 0,
      },
      timeframe: '24h',
    };
  }
}