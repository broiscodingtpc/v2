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
              orderBy: { vol24h: 'desc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return watchlistItems.map((item) => {
      const prefs = (item.alertPrefs || {}) as Record<string, any>;
      const topPair = item.token.pairs[0];
      return {
        id: item.id,
        addedAt: item.createdAt.toISOString(),
        alertsEnabled: Boolean(prefs.alertsEnabled),
        priceAlertThreshold:
          typeof prefs.priceAlertThreshold === 'number' ? prefs.priceAlertThreshold : undefined,
        token: {
          address: item.token.mint,
          symbol: item.token.symbol ?? '',
          name: item.token.name ?? '',
          price: topPair ? Number(topPair.price) : 0,
          marketCap: null,
          volume24h: topPair ? Number(topPair.vol24h) : 0,
          priceChange24h: null,
          logoUrl: null,
          pairs: item.token.pairs.map((pair) => ({
            address: pair.id,
            dex: pair.dexId,
            volume24h: Number(pair.vol24h),
            liquidity: Number(pair.liqUsd),
          })),
          latestScore: null,
        },
      };
    });
  }

  async addToWatchlist(userId: string, addWatchlistDto: AddWatchlistDto) {
    const { mint, alertPrefs } = addWatchlistDto;

    // Check if token exists
    const token = await prisma.token.findUnique({
      where: { mint },
    });

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    // Check if already in watchlist
    const existingItem = await prisma.watchlistItem.findFirst({
      where: {
        userId,
        tokenId: token.id,
      },
    });

    if (existingItem) {
      throw new ConflictException('Token already in watchlist');
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        tokenId: token.id,
        alertPrefs: alertPrefs || {},
      },
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

    const prefs = (watchlistItem.alertPrefs || {}) as Record<string, any>;
    const topPair = watchlistItem.token.pairs[0];
    return {
      id: watchlistItem.id,
      addedAt: watchlistItem.createdAt.toISOString(),
      alertsEnabled: Boolean(prefs.alertsEnabled),
      priceAlertThreshold:
        typeof prefs.priceAlertThreshold === 'number' ? prefs.priceAlertThreshold : undefined,
      token: {
        address: watchlistItem.token.mint,
        symbol: watchlistItem.token.symbol ?? '',
        name: watchlistItem.token.name ?? '',
        price: topPair ? Number(topPair.price) : 0,
        marketCap: null,
        volume24h: topPair ? Number(topPair.vol24h) : 0,
        priceChange24h: null,
        logoUrl: null,
        pairs: watchlistItem.token.pairs.map((pair) => ({
          address: pair.id,
          dex: pair.dexId,
          volume24h: Number(pair.vol24h),
          liquidity: Number(pair.liqUsd),
        })),
        latestScore: null,
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

    const existingPrefs = (watchlistItem.alertPrefs ?? {}) as Record<string, any>;
    const newPrefs = {
      ...existingPrefs,
      ...(updates.alertsEnabled !== undefined ? { alertsEnabled: updates.alertsEnabled } : {}),
      ...(updates.priceAlertThreshold !== undefined
        ? { priceAlertThreshold: updates.priceAlertThreshold }
        : {}),
    } as Record<string, any>;

    const updatedItem = await prisma.watchlistItem.update({
      where: { id: watchlistItemId },
      data: { alertPrefs: newPrefs },
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

    const prefs = (updatedItem.alertPrefs || {}) as Record<string, any>;
    const topPair = updatedItem.token.pairs[0];
    return {
      id: updatedItem.id,
      addedAt: updatedItem.createdAt.toISOString(),
      alertsEnabled: Boolean(prefs.alertsEnabled),
      priceAlertThreshold:
        typeof prefs.priceAlertThreshold === 'number' ? prefs.priceAlertThreshold : undefined,
      token: {
        address: updatedItem.token.mint,
        symbol: updatedItem.token.symbol ?? '',
        name: updatedItem.token.name ?? '',
        price: topPair ? Number(topPair.price) : 0,
        marketCap: null,
        volume24h: topPair ? Number(topPair.vol24h) : 0,
        priceChange24h: null,
        logoUrl: null,
        pairs: updatedItem.token.pairs.map((pair) => ({
          address: pair.id,
          dex: pair.dexId,
          volume24h: Number(pair.vol24h),
          liquidity: Number(pair.liqUsd),
        })),
        latestScore: null,
      },
    };
  }
}
