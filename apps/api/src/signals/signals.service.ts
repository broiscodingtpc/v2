import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';
import { SignalsQueryDto } from '@metapulse/shared';

@Injectable()
export class SignalsService {
  async getSignalEvents(query: SignalsQueryDto) {
    const tokenAddress = (query as any).token as string | undefined;
    const eventType = (query as any).eventType as string | undefined;
    const timeframe = (query as any).timeframe ?? '24h';
    const limit = query.limit ?? 20;
    const offset = (query as any).offset ?? 0;

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
      occurredAt: { gte: timeThreshold },
    };

    if (tokenAddress) {
      const token = await prisma.token.findUnique({ where: { mint: tokenAddress } });
      if (token) {
        where.tokenId = token.id;
      } else {
        // No matching token, ensure no results
        where.tokenId = '__none__';
      }
    }

    if (eventType) {
      where.kind = eventType;
    }

    const [events, total] = await Promise.all([
      prisma.signalEvent.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { occurredAt: 'desc' },
      }),
      prisma.signalEvent.count({ where }),
    ]);

    return {
      events: await Promise.all(
        events.map(async (event) => {
          const token = await prisma.token.findUnique({ where: { id: event.tokenId } });
          return {
            id: event.id,
            tokenAddress: token?.mint ?? '',
            eventType: event.kind,
            severity: 'LOW',
            message: '',
            metadata: event.metrics,
            createdAt: event.occurredAt.toISOString(),
            token: token
              ? { symbol: token.symbol ?? '', name: token.name ?? '', logoUrl: null }
              : undefined,
          };
        })
      ),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async getTokenSignalScores(tokenAddress: string, limit = 24) {
    const token = await prisma.token.findUnique({ where: { mint: tokenAddress } });
    if (!token) return [];

    const scores = await prisma.signalScore.findMany({
      where: { signalEvent: { tokenId: token.id } },
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { signalEvent: true },
    });

    return scores.map((score) => ({
      id: score.id,
      tokenAddress: token.mint,
      socialScore: 0,
      technicalScore: 0,
      overallScore: Number(score.score),
      metadata: score.features,
      createdAt: score.createdAt.toISOString(),
      token: { symbol: token.symbol ?? '', name: token.name ?? '', logoUrl: null },
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
    const scores = await prisma.signalScore.findMany({
      where: {
        createdAt: { gte: timeThreshold },
      },
      orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      include: { signalEvent: true },
    });

    const results = [] as any[];
    for (const score of scores) {
      const token = await prisma.token.findUnique({ where: { id: score.signalEvent.tokenId } });
      if (!token) continue;
      const pairs = await prisma.pair.findMany({
        where: { tokenId: token.id },
        orderBy: { vol24h: 'desc' },
        take: 1,
      });
      const topPair = pairs[0];
      results.push({
        tokenAddress: token.mint,
        socialScore: 0,
        technicalScore: 0,
        overallScore: Number(score.score),
        createdAt: score.createdAt.toISOString(),
        token: {
          address: token.mint,
          symbol: token.symbol ?? '',
          name: token.name ?? '',
          price: topPair ? Number(topPair.price) : 0,
          marketCap: null,
          volume24h: topPair ? Number(topPair.vol24h) : 0,
          priceChange24h: null,
          logoUrl: null,
          pairs: topPair
            ? [
                {
                  address: topPair.id,
                  dex: topPair.dexId,
                  volume24h: Number(topPair.vol24h),
                  liquidity: Number(topPair.liqUsd),
                },
              ]
            : [],
        },
      });
    }

    return results;
  }

  async getSignalSummary(tokenAddress?: string) {
    const timeThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const where: any = {
      occurredAt: { gte: timeThreshold },
    };

    if (tokenAddress) {
      const token = await prisma.token.findUnique({ where: { mint: tokenAddress } });
      if (token) where.tokenId = token.id;
    }

    const totalEvents = await prisma.signalEvent.count({ where });

    return {
      totalEvents,
      eventsBySeverity: {
        high: 0,
        medium: 0,
        low: 0,
      },
      averageScores: {
        social: 0,
        technical: 0,
        overall: 0,
      },
      timeframe: '24h',
    };
  }
}
