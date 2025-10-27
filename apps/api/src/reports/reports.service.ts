import { Injectable } from '@nestjs/common';
import { prisma } from '@metapulse/db';

@Injectable()
export class ReportsService {
  async getReports(tokenAddress?: string, limit = 20, offset = 0) {
    const where = tokenAddress ? { tokenAddress } : {};

    const [reports, total] = await Promise.all([
      prisma.analystReport.findMany({
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
              price: true,
              priceChange24h: true,
            },
          },
        },
      }),
      prisma.analystReport.count({ where }),
    ]);

    return {
      reports: reports.map(report => ({
        id: report.id,
        tokenAddress: report.tokenAddress,
        title: report.title,
        summary: report.summary,
        content: report.content,
        sentiment: report.sentiment,
        confidenceScore: report.confidenceScore,
        tags: report.tags,
        createdAt: report.createdAt.toISOString(),
        token: report.token,
      })),
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
              orderBy: { volume24h: 'desc' },
            },
            signalScores: {
              orderBy: { createdAt: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    if (!report) {
      return null;
    }

    return {
      id: report.id,
      tokenAddress: report.tokenAddress,
      title: report.title,
      summary: report.summary,
      content: report.content,
      sentiment: report.sentiment,
      confidenceScore: report.confidenceScore,
      tags: report.tags,
      createdAt: report.createdAt.toISOString(),
      token: {
        address: report.token.address,
        symbol: report.token.symbol,
        name: report.token.name,
        price: report.token.price,
        marketCap: report.token.marketCap,
        volume24h: report.token.volume24h,
        priceChange24h: report.token.priceChange24h,
        logoUrl: report.token.logoUrl,
        pairs: report.token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
        latestScore: report.token.signalScores[0] ? {
          socialScore: report.token.signalScores[0].socialScore,
          technicalScore: report.token.signalScores[0].technicalScore,
          overallScore: report.token.signalScores[0].overallScore,
        } : null,
      },
    };
  }

  async getLatestReports(limit = 10) {
    const reports = await prisma.analystReport.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        token: {
          select: {
            symbol: true,
            name: true,
            logoUrl: true,
            price: true,
            priceChange24h: true,
          },
        },
      },
    });

    return reports.map(report => ({
      id: report.id,
      tokenAddress: report.tokenAddress,
      title: report.title,
      summary: report.summary,
      sentiment: report.sentiment,
      confidenceScore: report.confidenceScore,
      tags: report.tags,
      createdAt: report.createdAt.toISOString(),
      token: report.token,
    }));
  }

  async getReportsByTag(tag: string, limit = 20, offset = 0) {
    const [reports, total] = await Promise.all([
      prisma.analystReport.findMany({
        where: {
          tags: {
            has: tag,
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          token: {
            select: {
              symbol: true,
              name: true,
              logoUrl: true,
              price: true,
              priceChange24h: true,
            },
          },
        },
      }),
      prisma.analystReport.count({
        where: {
          tags: {
            has: tag,
          },
        },
      }),
    ]);

    return {
      reports: reports.map(report => ({
        id: report.id,
        tokenAddress: report.tokenAddress,
        title: report.title,
        summary: report.summary,
        sentiment: report.sentiment,
        confidenceScore: report.confidenceScore,
        tags: report.tags,
        createdAt: report.createdAt.toISOString(),
        token: report.token,
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  async getReportTags() {
    // Get all unique tags from reports
    const reports = await prisma.analystReport.findMany({
      select: { tags: true },
    });

    const allTags = reports.flatMap(report => report.tags);
    const uniqueTags = [...new Set(allTags)];

    // Count occurrences of each tag
    const tagCounts = uniqueTags.map(tag => ({
      tag,
      count: allTags.filter(t => t === tag).length,
    }));

    return tagCounts.sort((a, b) => b.count - a.count);
  }
}