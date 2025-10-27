import { apiService, Token } from './api';
import { formatTokenInfo, formatSteampunkMessage } from '../utils/formatter';

export class BotService {
  async getTokenInfo(symbol: string): Promise<Token> {
    try {
      // First try to search by symbol
      const tokens = await apiService.searchTokens(symbol, 1);
      if (tokens.length > 0) {
        return tokens[0];
      }
      
      // If not found by symbol, try by address (if it looks like an address)
      if (symbol.length > 20) {
        const token = await apiService.getToken(symbol);
        if (token) {
          return token;
        }
      }
      
      throw new Error(`Token ${symbol} not found`);
    } catch (error) {
      console.error('Error getting token info:', error);
      throw error;
    }
  }

  formatTokenInfo(token: Token): string {
    return formatTokenInfo(token);
  }

  async getTopTokens(timeframe: '1h' | '24h' | '7d' = '24h', limit: number = 10): Promise<Token[]> {
    try {
      return await apiService.getTopTokens(timeframe, limit);
    } catch (error) {
      console.error('Error getting top tokens:', error);
      return [];
    }
  }

  async getTrendingTokens(limit: number = 10): Promise<Token[]> {
    try {
      return await apiService.getTrendingTokens(limit);
    } catch (error) {
      console.error('Error getting trending tokens:', error);
      return [];
    }
  }

  async searchTokens(query: string, limit: number = 10): Promise<Token[]> {
    try {
      return await apiService.searchTokens(query, limit);
    } catch (error) {
      console.error('Error searching tokens:', error);
      return [];
    }
  }

  formatTokenList(tokens: Token[], title: string): string {
    if (tokens.length === 0) {
      return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            ${title.toUpperCase()}            ║
╚═══════════════════════════════════════╝

No tokens found.
      `);
    }

    let message = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║            ${title.toUpperCase()}            ║
╚═══════════════════════════════════════╝

    `);

    tokens.forEach((token, index) => {
      const priceChange = token.priceChange24h >= 0 ? '📈' : '📉';
      message += `${index + 1}. **${token.symbol}** (${token.name})\n`;
      message += `   💰 $${token.price.toFixed(6)}\n`;
      message += `   ${priceChange} ${token.priceChange24h.toFixed(2)}%\n\n`;
    });

    return message;
  }
}

export const botService = new BotService();