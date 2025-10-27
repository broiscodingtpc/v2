export interface TokenData {
  mint: string;
  symbol?: string;
  name?: string;
  price: number;
  delta5m: number;
  vol1h: number;
  vol24h: number;
  liqUsd: number;
  updatedAt: string;
}

export interface TrendingToken extends TokenData {
  spikeScore: number;
  trades5m: number;
  socialPulse: number;
  note?: string;
}

export interface HotMeta {
  theme: string;
  tokens: string[];
  heat: number;
}

export interface SignalEventData {
  id: string;
  tokenId: string;
  pairId?: string;
  kind: 'volume_spike' | 'liq_drop' | 'new_pair' | 'social_spike' | 'whale_move';
  metrics: Record<string, any>;
  occurredAt: string;
  score?: number;
  label?: string;
}

export interface AnalystReportData {
  id: string;
  tokenId: string;
  summaryShort: string;
  summaryLong: string;
  riskSummary: string;
  model: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  telegramUserId: string;
  handle?: string;
  role: 'FREE' | 'PRO' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
}

export interface WatchlistItemData {
  id: string;
  userId: string;
  tokenId: string;
  token: TokenData;
  alertPrefs: Record<string, any>;
  createdAt: string;
}

export interface AlertPreferences {
  volumeSpike: boolean;
  liquidityDrop: boolean;
  socialSpike: boolean;
  newPair: boolean;
  priceThreshold?: number;
  volumeThreshold?: number;
}

export interface AuthLinkData {
  nonce: string;
  expiresAt: string;
  webUrl: string;
}