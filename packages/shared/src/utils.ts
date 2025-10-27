import { createHmac, randomBytes } from 'crypto';

export function generateNonce(): string {
  return randomBytes(32).toString('hex');
}

export function createHmacSignature(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

export function verifyHmacSignature(data: string, signature: string, secret: string): boolean {
  const expectedSignature = createHmacSignature(data, secret);
  return signature === expectedSignature;
}

export function formatPrice(price: number): string {
  if (price >= 1) {
    return price.toFixed(4);
  } else if (price >= 0.0001) {
    return price.toFixed(6);
  } else {
    return price.toExponential(2);
  }
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`;
  } else {
    return `$${volume.toFixed(0)}`;
  }
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(1)}%`;
}

export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

export function calculateSpikeScore(
  vol5m: number,
  trades5m: number,
  price5m: number,
  social: number,
  weights = { vol: 0.4, trades: 0.25, price: 0.2, social: 0.15 }
): number {
  // Simplified spike score calculation
  // In production, these would use proper z-scores with historical data
  const volScore = Math.min(vol5m / 100000, 10); // Normalize volume
  const tradesScore = Math.min(trades5m / 100, 10); // Normalize trades
  const priceScore = Math.min(Math.abs(price5m) * 100, 10); // Normalize price change
  const socialScore = Math.min(social, 10); // Social already 0-10

  return (
    weights.vol * volScore +
    weights.trades * tradesScore +
    weights.price * priceScore +
    weights.social * socialScore
  );
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return fn().catch(async (error) => {
    if (maxRetries <= 0) {
      throw error;
    }
    await sleep(delay);
    return withRetry(fn, maxRetries - 1, delay * 2);
  });
}