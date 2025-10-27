import { createHmac } from 'crypto';

export interface TelegramInitData {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

export function parseTelegramInitData(initData: string): TelegramInitData | null {
  try {
    const params = new URLSearchParams(initData);
    const data: any = {};
    
    for (const [key, value] of params.entries()) {
      if (key === 'user') {
        data.user = JSON.parse(value);
      } else {
        data[key] = value;
      }
    }

    if (!data.user || !data.hash || !data.auth_date) {
      return null;
    }

    return {
      id: data.user.id.toString(),
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      username: data.user.username,
      photo_url: data.user.photo_url,
      auth_date: data.auth_date,
      hash: data.hash
    };
  } catch (error) {
    return null;
  }
}

export function verifyTelegramInitData(initData: string, botToken: string): boolean {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    
    if (!hash) {
      return false;
    }

    params.delete('hash');
    
    // Sort parameters and create data check string
    const sortedParams = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create secret key from bot token
    const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
    
    // Calculate expected hash
    const expectedHash = createHmac('sha256', secretKey).update(sortedParams).digest('hex');
    
    return hash === expectedHash;
  } catch (error) {
    return false;
  }
}

export function isSolanaAddress(address: string): boolean {
  // Basic Solana address validation (base58, 32-44 characters)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(address);
}

export function isValidSymbol(symbol: string): boolean {
  // Token symbol validation (2-10 characters, alphanumeric)
  const symbolRegex = /^[A-Z0-9]{2,10}$/i;
  return symbolRegex.test(symbol);
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input.replace(/[<>\"'&]/g, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}