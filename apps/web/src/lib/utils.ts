import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price < 0.000001) {
    return price.toExponential(2);
  }
  if (price < 0.01) {
    return price.toFixed(6);
  }
  if (price < 1) {
    return price.toFixed(4);
  }
  if (price < 1000) {
    return price.toFixed(2);
  }
  if (price < 1000000) {
    return `${(price / 1000).toFixed(1)}K`;
  }
  if (price < 1000000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  }
  return `${(price / 1000000000).toFixed(1)}B`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatMarketCap(value: number): string {
  if (value < 1000) {
    return `$${value.toFixed(0)}`;
  }
  if (value < 1000000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  if (value < 1000000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${(value / 1000000000).toFixed(1)}B`;
}

export function formatTimeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return past.toLocaleDateString();
}

export function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function getSignalColor(score: number): string {
  if (score >= 80) return 'text-ascii-green';
  if (score >= 60) return 'text-ascii-amber';
  if (score >= 40) return 'text-ascii-blue';
  return 'text-ascii-red';
}

export function getPriceChangeColor(change: number): string {
  if (change > 0) return 'text-ascii-green';
  if (change < 0) return 'text-ascii-red';
  return 'text-ascii-gray-400';
}