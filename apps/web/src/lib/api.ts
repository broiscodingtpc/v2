import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      Cookies.remove('auth-token');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Methods
export const authApi = {
  consumeTelegramAuth: (nonce: string, initData: string) =>
    api.post('/auth/telegram/consume', { nonce, initData }),
  
  getProfile: () => api.get('/auth/me'),
  
  logout: () => api.post('/auth/logout'),
};

export const tokensApi = {
  searchTokens: (params: any) => api.get('/tokens/search', { params }),
  
  getTrendingTokens: (params: any) => api.get('/tokens/trending', { params }),
  
  getHotMeta: (limit?: number) => api.get('/tokens/hot-meta', { params: { limit } }),
  
  getTokenDetails: (address: string) => api.get(`/tokens/${address}`),
};

export const watchlistApi = {
  getUserWatchlist: () => api.get('/watchlist'),
  
  addToWatchlist: (data: any) => api.post('/watchlist', data),
  
  removeFromWatchlist: (id: string) => api.delete(`/watchlist/${id}`),
  
  updateWatchlistItem: (id: string, data: any) => api.patch(`/watchlist/${id}`, data),
};

export const signalsApi = {
  getSignalEvents: (params: any) => api.get('/signals/events', { params }),
  
  getTokenSignalScores: (tokenAddress: string, limit?: number) =>
    api.get(`/signals/scores/${tokenAddress}`, { params: { limit } }),
  
  getTopSignalTokens: (params: any) => api.get('/signals/top-tokens', { params }),
  
  getSignalSummary: (tokenAddress?: string) =>
    api.get('/signals/summary', { params: { tokenAddress } }),
};

export const reportsApi = {
  getReports: (params: any) => api.get('/reports', { params }),
  
  getLatestReports: (limit?: number) => api.get('/reports/latest', { params: { limit } }),
  
  getReportById: (id: string) => api.get(`/reports/${id}`),
  
  getReportsByTag: (tag: string, params: any) => api.get(`/reports/by-tag/${tag}`, { params }),
  
  getReportTags: () => api.get('/reports/tags'),
};

export const botApi = {
  createAuthLink: (telegramUserId: string) => api.get(`/bot/auth-link/${telegramUserId}`),
};