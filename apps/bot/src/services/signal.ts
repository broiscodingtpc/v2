import { apiService, Signal } from './api';
import { formatSteampunkMessage, formatSignal } from '../utils/formatter';

export class SignalService {
  async getLatestSignals(limit: number = 10): Promise<Signal[]> {
    try {
      return await apiService.getSignals(limit, 0);
    } catch (error) {
      console.error('Error getting latest signals:', error);
      return [];
    }
  }

  async getTokenSignals(tokenAddress: string, limit: number = 5): Promise<Signal[]> {
    try {
      return await apiService.getTokenSignals(tokenAddress, limit);
    } catch (error) {
      console.error('Error getting token signals:', error);
      return [];
    }
  }

  async formatSignalsMessage(signals: Signal[]): Promise<string> {
    if (signals.length === 0) {
      return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║         📊 NO SIGNALS FOUND 📊        ║
╚═══════════════════════════════════════╝

Our AI is analyzing the market. 
Check back soon for new trading opportunities!
      `);
    }

    let message = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║        📊 LATEST TRADING SIGNALS 📊   ║
╚═══════════════════════════════════════╝

    `);

    signals.forEach((signal, index) => {
      message += formatSignal(signal) + '\n\n';
      if (index < signals.length - 1) {
        message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      }
    });

    return message;
  }

  getSignalEmoji(type: string): string {
    switch (type) {
      case 'strong_buy':
        return '🚀';
      case 'buy':
        return '📈';
      case 'hold':
        return '⏸️';
      case 'sell':
        return '📉';
      case 'strong_sell':
        return '🔻';
      case 'bullish':
        return '🐂';
      case 'bearish':
        return '🐻';
      default:
        return '📊';
    }
  }
}

export const signalService = new SignalService();