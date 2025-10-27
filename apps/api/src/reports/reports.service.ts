import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';

@Injectable()
export class ReportsService {
  async getReports(tokenAddress?: string, limit = 20, offset = 0) {
    const token = tokenAddress
      ? await prisma.token.findUnique({ where: { mint: tokenAddress } })
      : null;

    const where = token ? { tokenId: token.id } : {};

    const [reports, total] = await Promise.all([
      prisma.analystReport.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          token: {
            include: {
              pairs: {
                take: 1,
                orderBy: { vol24h: 'desc' },
              },
            },
          },
        },
      }),
      prisma.analystReport.count({ where }),
    ]);

    return {
      reports: reports.map((report) => {
        const topPair = report.token.pairs[0];
        return {
          id: report.id,
          tokenAddress: report.token.mint,
          summaryShort: report.summaryShort,
          summaryLong: report.summaryLong,
          riskSummary: report.riskSummary,
          model: report.model,
          createdAt: report.createdAt.toISOString(),
          token: {
            address: report.token.mint,
            symbol: report.token.symbol ?? '',
            name: report.token.name ?? '',
            price: topPair ? Number(topPair.price) : 0,
            marketCap: null,
            volume24h: topPair ? Number(topPair.vol24h) : 0,
            priceChange24h: null,
            logoUrl: null,
            pairs: report.token.pairs.map((pair) => ({
              address: pair.id,
              dex: pair.dexId,
              volume24h: Number(pair.vol24h),
              liquidity: Number(pair.liqUsd),
            })),
          },
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

  async getReportById(reportId: string) {
    const report = await prisma.analystReport.findUnique({
      where: { id: reportId },
      include: {
        token: {
          include: {
            pairs: {
              take: 1,
              orderBy: { vol24h: 'desc' },
            },
          },
        },
      },
    });

    if (!report) {
      return null;
    }

    const topPair = report.token.pairs[0];
    return {
      id: report.id,
      tokenAddress: report.token.mint,
      summaryShort: report.summaryShort,
      summaryLong: report.summaryLong,
      riskSummary: report.riskSummary,
      model: report.model,
      createdAt: report.createdAt.toISOString(),
      token: {
        address: report.token.mint,
        symbol: report.token.symbol ?? '',
        name: report.token.name ?? '',
        price: topPair ? Number(topPair.price) : 0,
        marketCap: null,
        volume24h: topPair ? Number(topPair.vol24h) : 0,
        priceChange24h: null,
        logoUrl: null,
        pairs: report.token.pairs.map((pair) => ({
          address: pair.id,
          dex: pair.dexId,
          volume24h: Number(pair.vol24h),
          liquidity: Number(pair.liqUsd),
        })),
        latestScore: null,
      },
    };
  }

  async getLatestReports(limit = 10) {
    const reports = await prisma.analystReport.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        token: {
          include: {
            pairs: {
              take: 1,
              orderBy: { vol24h: 'desc' },
            },
          },
        },
      },
    });

    return reports.map((report) => {
      const topPair = report.token.pairs[0];
      return {
        id: report.id,
        tokenAddress: report.token.mint,
        summaryShort: report.summaryShort,
        summaryLong: report.summaryLong,
        riskSummary: report.riskSummary,
        model: report.model,
        createdAt: report.createdAt.toISOString(),
        token: {
          address: report.token.mint,
          symbol: report.token.symbol ?? '',
          name: report.token.name ?? '',
          price: topPair ? Number(topPair.price) : 0,
          marketCap: null,
          volume24h: topPair ? Number(topPair.vol24h) : 0,
          priceChange24h: null,
          logoUrl: null,
        },
      };
    });
  }

  async getReportsByTag(tag: string, limit = 20, offset = 0) {
    const [reports, total] = await Promise.all([
      prisma.analystReport.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          token: {
            include: {
              pairs: {
                take: 1,
                orderBy: { vol24h: 'desc' },
              },
            },
          },
        },
      }),
      prisma.analystReport.count({}),
    ]);

    return {
      reports: reports.map((report) => {
        const topPair = report.token.pairs[0];
        return {
          id: report.id,
          tokenAddress: report.token.mint,
          summaryShort: report.summaryShort,
          summaryLong: report.summaryLong,
          riskSummary: report.riskSummary,
          model: report.model,
          createdAt: report.createdAt.toISOString(),
          token: {
            address: report.token.mint,
            symbol: report.token.symbol ?? '',
            name: report.token.name ?? '',
            price: topPair ? Number(topPair.price) : 0,
            marketCap: null,
            volume24h: topPair ? Number(topPair.vol24h) : 0,
            priceChange24h: null,
            logoUrl: null,
          },
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

  async getReportTags() {
    // Tags are not part of the current schema; return empty list
    return [] as { tag: string; count: number }[];
  }
}
