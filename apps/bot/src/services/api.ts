import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config';

export interface Token {
  id: string;
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  updatedAt: string;
}

export interface Signal {
  id: string;
  tokenId: string;
  tokenSymbol: string;
  type: 'bullish' | 'bearish' | 'neutral' | 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell';
  currentPrice: number;
  targetPrice?: number;
  confidence: number;
  description?: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  userId: string;
  tokenId: string;
  tokenSymbol: string;
  type: 'price_above' | 'price_below' | 'volume_spike' | 'market_cap';
  targetValue: number;
  isActive: boolean;
  createdAt: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  tokenId: string;
  token: Token;
  createdAt: string;
}

export interface User {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  createdAt: string;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        ...(config.API_KEY && { 'Authorization': `Bearer ${config.API_KEY}` })
      }
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // User Management
  async createUser(telegramId: string, userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.post('/users', {
      telegramId,
      ...userData
    });
    return response.data;
  }

  async getUser(telegramId: string): Promise<User | null> {
    try {
      const response: AxiosResponse<User> = await this.api.get(`/users/telegram/${telegramId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async updateUser(telegramId: string, userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put(`/users/telegram/${telegramId}`, userData);
    return response.data;
  }

  // Token Management
  async getTokens(limit: number = 50, offset: number = 0): Promise<Token[]> {
    const response: AxiosResponse<Token[]> = await this.api.get('/tokens', {
      params: { limit, offset }
    });
    return response.data;
  }

  async getToken(address: string): Promise<Token | null> {
    try {
      const response: AxiosResponse<Token> = await this.api.get(`/tokens/${address}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async searchTokens(query: string, limit: number = 10): Promise<Token[]> {
    const response: AxiosResponse<Token[]> = await this.api.get('/tokens/search', {
      params: { q: query, limit }
    });
    return response.data;
  }

  // Signals
  async getSignals(limit: number = 20, offset: number = 0): Promise<Signal[]> {
    const response: AxiosResponse<Signal[]> = await this.api.get('/signals', {
      params: { limit, offset }
    });
    return response.data;
  }

  async getTokenSignals(tokenAddress: string, limit: number = 10): Promise<Signal[]> {
    const response: AxiosResponse<Signal[]> = await this.api.get(`/signals/token/${tokenAddress}`, {
      params: { limit }
    });
    return response.data;
  }

  // Watchlist Management
  async getWatchlist(telegramId: string): Promise<WatchlistItem[]> {
    const response: AxiosResponse<WatchlistItem[]> = await this.api.get(`/watchlist/telegram/${telegramId}`);
    return response.data;
  }

  async addToWatchlist(telegramId: string, tokenAddress: string): Promise<WatchlistItem> {
    const response: AxiosResponse<WatchlistItem> = await this.api.post('/watchlist', {
      telegramId,
      tokenAddress
    });
    return response.data;
  }

  async removeFromWatchlist(telegramId: string, tokenAddress: string): Promise<void> {
    await this.api.delete('/watchlist', {
      data: { telegramId, tokenAddress }
    });
  }

  // Alerts Management
  async getAlerts(telegramId: string): Promise<Alert[]> {
    const response: AxiosResponse<Alert[]> = await this.api.get(`/alerts/telegram/${telegramId}`);
    return response.data;
  }

  async createAlert(telegramId: string, alertData: Omit<Alert, 'id' | 'userId' | 'createdAt'>): Promise<Alert> {
    const response: AxiosResponse<Alert> = await this.api.post('/alerts', {
      telegramId,
      ...alertData
    });
    return response.data;
  }

  async updateAlert(alertId: string, alertData: Partial<Alert>): Promise<Alert> {
    const response: AxiosResponse<Alert> = await this.api.put(`/alerts/${alertId}`, alertData);
    return response.data;
  }

  async deleteAlert(alertId: string): Promise<void> {
    await this.api.delete(`/alerts/${alertId}`);
  }

  // Analytics
  async getTopTokens(timeframe: '1h' | '24h' | '7d' = '24h', limit: number = 10): Promise<Token[]> {
    const response: AxiosResponse<Token[]> = await this.api.get('/analytics/top-tokens', {
      params: { timeframe, limit }
    });
    return response.data;
  }

  async getTrendingTokens(limit: number = 10): Promise<Token[]> {
    const response: AxiosResponse<Token[]> = await this.api.get('/analytics/trending', {
      params: { limit }
    });
    return response.data;
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export const apiService = new ApiService();