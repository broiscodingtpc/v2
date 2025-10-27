import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { prisma } from '@metapulse/db';
import { AddWatchlistDto } from '@metapulse/shared';

@Injectable()
export class WatchlistService {
  async getUserWatchlist(userId: string) {
    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId },
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
      orderBy: { createdAt: 'desc' },
    });

    return watchlistItems.map(item => ({
      id: item.id,
      addedAt: item.createdAt.toISOString(),
      alertsEnabled: item.alertsEnabled,
      priceAlertThreshold: item.priceAlertThreshold,
      token: {
        address: item.token.address,
        symbol: item.token.symbol,
        name: item.token.name,
        price: item.token.price,
        marketCap: item.token.marketCap,
        volume24h: item.token.volume24h,
        priceChange24h: item.token.priceChange24h,
        logoUrl: item.token.logoUrl,
        pairs: item.token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
        latestScore: item.token.signalScores[0] ? {
          socialScore: item.token.signalScores[0].socialScore,
          technicalScore: item.token.signalScores[0].technicalScore,
          overallScore: item.token.signalScores[0].overallScore,
        } : null,
      },
    }));
  }

  async addToWatchlist(userId: string, addWatchlistDto: AddWatchlistDto) {
    const { tokenAddress, alertsEnabled, priceAlertThreshold } = addWatchlistDto;

    // Check if token exists
    const token = await prisma.token.findUnique({
      where: { address: tokenAddress },
    });

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    // Check if already in watchlist
    const existingItem = await prisma.watchlistItem.findUnique({
      where: {
        userId_tokenAddress: {
          userId,
          tokenAddress,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException('Token already in watchlist');
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        tokenAddress,
        alertsEnabled: alertsEnabled || false,
        priceAlertThreshold,
      },
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

    return {
      id: watchlistItem.id,
      addedAt: watchlistItem.createdAt.toISOString(),
      alertsEnabled: watchlistItem.alertsEnabled,
      priceAlertThreshold: watchlistItem.priceAlertThreshold,
      token: {
        address: watchlistItem.token.address,
        symbol: watchlistItem.token.symbol,
        name: watchlistItem.token.name,
        price: watchlistItem.token.price,
        marketCap: watchlistItem.token.marketCap,
        volume24h: watchlistItem.token.volume24h,
        priceChange24h: watchlistItem.token.priceChange24h,
        logoUrl: watchlistItem.token.logoUrl,
        pairs: watchlistItem.token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
        latestScore: watchlistItem.token.signalScores[0] ? {
          socialScore: watchlistItem.token.signalScores[0].socialScore,
          technicalScore: watchlistItem.token.signalScores[0].technicalScore,
          overallScore: watchlistItem.token.signalScores[0].overallScore,
        } : null,
      },
    };
  }

  async removeFromWatchlist(userId: string, watchlistItemId: string) {
    const watchlistItem = await prisma.watchlistItem.findFirst({
      where: {
        id: watchlistItemId,
        userId,
      },
    });

    if (!watchlistItem) {
      throw new NotFoundException('Watchlist item not found');
    }

    await prisma.watchlistItem.delete({
      where: { id: watchlistItemId },
    });

    return { message: 'Token removed from watchlist' };
  }

  async updateWatchlistItem(
    userId: string, 
    watchlistItemId: string, 
    updates: { alertsEnabled?: boolean; priceAlertThreshold?: number }
  ) {
    const watchlistItem = await prisma.watchlistItem.findFirst({
      where: {
        id: watchlistItemId,
        userId,
      },
    });

    if (!watchlistItem) {
      throw new NotFoundException('Watchlist item not found');
    }

    const updatedItem = await prisma.watchlistItem.update({
      where: { id: watchlistItemId },
      data: updates,
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

    return {
      id: updatedItem.id,
      addedAt: updatedItem.createdAt.toISOString(),
      alertsEnabled: updatedItem.alertsEnabled,
      priceAlertThreshold: updatedItem.priceAlertThreshold,
      token: {
        address: updatedItem.token.address,
        symbol: updatedItem.token.symbol,
        name: updatedItem.token.name,
        price: updatedItem.token.price,
        marketCap: updatedItem.token.marketCap,
        volume24h: updatedItem.token.volume24h,
        priceChange24h: updatedItem.token.priceChange24h,
        logoUrl: updatedItem.token.logoUrl,
        pairs: updatedItem.token.pairs.map(pair => ({
          address: pair.address,
          dex: pair.dex,
          volume24h: pair.volume24h,
          liquidity: pair.liquidity,
        })),
        latestScore: updatedItem.token.signalScores[0] ? {
          socialScore: updatedItem.token.signalScores[0].socialScore,
          technicalScore: updatedItem.token.signalScores[0].technicalScore,
          overallScore: updatedItem.token.signalScores[0].overallScore,
        } : null,
      },
    };
  }
}