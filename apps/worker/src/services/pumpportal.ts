import { WebSocket } from 'ws';
import { createLogger } from '@/utils/logger';

const log = createLogger('pumpportal');

export interface PumpPortalToken {
  address: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
}

export interface PumpPortalWebSocketMessage {
  method: string;
  keys?: string[];
}

export interface PumpPortalNewTokenEvent {
  type: 'newToken';
  data: {
    mint: string;
    symbol: string;
    name: string;
    decimals: number;
    timestamp: number;
    creator: string;
    initialLiquidity: number;
  };
}

export interface PumpPortalTradeEvent {
  type: 'tokenTrade' | 'accountTrade';
  data: {
    mint: string;
    signature: string;
    timestamp: number;
    side: 'buy' | 'sell';
    amount: number;
    price: number;
    account: string;
  };
}

export interface PumpPortalMigrationEvent {
  type: 'migration';
  data: {
    oldMint: string;
    newMint: string;
    timestamp: number;
    account: string;
  };
}

export class PumpPortalService {
  private ws: WebSocket | null = null;
  private wsUrl = 'wss://pumpportal.fun/api/data';
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000; // 5 seconds
  private subscriptions = new Set<string>();

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      log.info('Connecting to PumpPortal WebSocket...');
      
      this.ws = new WebSocket(this.wsUrl);
      
      this.ws.on('open', () => {
        log.info('Connected to PumpPortal WebSocket');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Re-subscribe to all previous subscriptions
        this.subscriptions.forEach(subscription => {
          this.sendMessage(JSON.parse(subscription));
        });
      });

      this.ws.on('message', (data: Buffer) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (error) {
          log.error('Failed to parse WebSocket message', error);
        }
      });

      this.ws.on('close', (code: number, reason: string) => {
        log.warn(`PumpPortal WebSocket closed: ${code} - ${reason}`);
        this.isConnected = false;
        this.ws = null;
        
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          log.info(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${this.reconnectDelay}ms`);
          setTimeout(() => this.connect(), this.reconnectDelay);
        } else {
          log.error('Max reconnection attempts reached. PumpPortal WebSocket disconnected.');
        }
      });

      this.ws.on('error', (error: Error) => {
        log.error('PumpPortal WebSocket error', error);
      });

    } catch (error) {
      log.error('Failed to connect to PumpPortal WebSocket', error);
    }
  }

  private sendMessage(message: PumpPortalWebSocketMessage) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(message));
      log.debug('Sent WebSocket message', message);
    } else {
      log.warn('WebSocket not connected, storing subscription for later');
      this.subscriptions.add(JSON.stringify(message));
    }
  }

  private handleMessage(message: any) {
    log.debug('Received WebSocket message', message);
    
    // Process different types of messages
    if (message.type === 'newToken') {
      this.handleNewTokenEvent(message);
    } else if (message.type === 'tokenTrade' || message.type === 'accountTrade') {
      this.handleTradeEvent(message);
    } else if (message.type === 'migration') {
      this.handleMigrationEvent(message);
    }
  }

  private handleNewTokenEvent(event: PumpPortalNewTokenEvent) {
    log.info('New token created', {
      mint: event.data.mint,
      symbol: event.data.symbol,
      name: event.data.name,
      creator: event.data.creator,
      liquidity: event.data.initialLiquidity
    });
    
    // Here you can emit events or store data as needed
    // For now, just log the information
  }

  private handleTradeEvent(event: PumpPortalTradeEvent) {
    log.info('Trade event', {
      mint: event.data.mint,
      side: event.data.side,
      amount: event.data.amount,
      price: event.data.price,
      account: event.data.account
    });
  }

  private handleMigrationEvent(event: PumpPortalMigrationEvent) {
    log.info('Migration event', {
      oldMint: event.data.oldMint,
      newMint: event.data.newMint,
      account: event.data.account
    });
  }

  /**
   * Subscribe to new token creation events
   */
  subscribeToNewTokens() {
    const message: PumpPortalWebSocketMessage = {
      method: 'subscribeNewToken'
    };
    this.sendMessage(message);
    log.info('Subscribed to new token events');
  }

  /**
   * Unsubscribe from new token creation events
   */
  unsubscribeFromNewTokens() {
    const message: PumpPortalWebSocketMessage = {
      method: 'unsubscribeNewToken'
    };
    this.sendMessage(message);
    log.info('Unsubscribed from new token events');
  }

  /**
   * Subscribe to token trade events
   */
  subscribeToTokenTrades(tokenAddresses: string[]) {
    const message: PumpPortalWebSocketMessage = {
      method: 'subscribeTokenTrade',
      keys: tokenAddresses
    };
    this.sendMessage(message);
    log.info(`Subscribed to trade events for ${tokenAddresses.length} tokens`);
  }

  /**
   * Unsubscribe from token trade events
   */
  unsubscribeFromTokenTrades(tokenAddresses: string[]) {
    const message: PumpPortalWebSocketMessage = {
      method: 'unsubscribeTokenTrade',
      keys: tokenAddresses
    };
    this.sendMessage(message);
    log.info(`Unsubscribed from trade events for ${tokenAddresses.length} tokens`);
  }

  /**
   * Subscribe to account trade events
   */
  subscribeToAccountTrades(accountAddresses: string[]) {
    const message: PumpPortalWebSocketMessage = {
      method: 'subscribeAccountTrade',
      keys: accountAddresses
    };
    this.sendMessage(message);
    log.info(`Subscribed to trade events for ${accountAddresses.length} accounts`);
  }

  /**
   * Unsubscribe from account trade events
   */
  unsubscribeFromAccountTrades(accountAddresses: string[]) {
    const message: PumpPortalWebSocketMessage = {
      method: 'unsubscribeAccountTrade',
      keys: accountAddresses
    };
    this.sendMessage(message);
    log.info(`Unsubscribed from trade events for ${accountAddresses.length} accounts`);
  }

  /**
   * Subscribe to migration events
   */
  subscribeToMigrations() {
    const message: PumpPortalWebSocketMessage = {
      method: 'subscribeMigration'
    };
    this.sendMessage(message);
    log.info('Subscribed to migration events');
  }

  /**
   * Unsubscribe from migration events
   */
  unsubscribeFromMigrations() {
    const message: PumpPortalWebSocketMessage = {
      method: 'unsubscribeMigration'
    };
    this.sendMessage(message);
    log.info('Unsubscribed from migration events');
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      subscriptions: Array.from(this.subscriptions)
    };
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
      log.info('Disconnected from PumpPortal WebSocket');
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    return this.isConnected && this.ws !== null;
  }
}

export const pumpPortalService = new PumpPortalService();
