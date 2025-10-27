import { apiService, WatchlistItem } from './api';
import { formatSteampunkMessage, formatWatchlistItem } from '../utils/formatter';

export class WatchlistService {
  async getUserWatchlist(userId: string): Promise<WatchlistItem[]> {
    try {
      return await apiService.getWatchlist(userId);
    } catch (error) {
      console.error('Error getting user watchlist:', error);
      return [];
    }
  }

  async addToWatchlist(userId: string, tokenAddress: string): Promise<WatchlistItem> {
    try {
      return await apiService.addToWatchlist(userId, tokenAddress);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  }

  async removeFromWatchlist(userId: string, tokenAddress: string): Promise<void> {
    try {
      await apiService.removeFromWatchlist(userId, tokenAddress);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  }

  async formatWatchlistMessage(watchlist: WatchlistItem[]): Promise<string> {
    if (watchlist.length === 0) {
      return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          👁️ EMPTY WATCHLIST 👁️        ║
╚═══════════════════════════════════════╝

Your watchlist is empty! 
Use /add [symbol] to start tracking tokens.
      `);
    }

    let message = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║           👁️ YOUR WATCHLIST 👁️        ║
╚═══════════════════════════════════════╝

    `);

    watchlist.forEach((item, index) => {
      message += formatWatchlistItem(item, index + 1) + '\n\n';
    });

    return message;
  }
}

export const watchlistService = new WatchlistService();