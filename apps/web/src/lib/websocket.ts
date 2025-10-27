import { io, Socket } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(WS_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    return this.socket;
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  subscribeToToken(tokenAddress: string) {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.emit('subscribe-token', { tokenAddress });
  }

  unsubscribeFromToken(tokenAddress: string) {
    this.socket?.emit('unsubscribe-token', { tokenAddress });
  }

  subscribeToSignals() {
    if (!this.socket) {
      this.connect();
    }
    this.socket?.emit('subscribe-signals');
  }

  unsubscribeFromSignals() {
    this.socket?.emit('unsubscribe-signals');
  }

  onPriceUpdate(callback: (data: any) => void) {
    this.socket?.on('price-update', callback);
  }

  onSignalEvent(callback: (data: any) => void) {
    this.socket?.on('signal-event', callback);
  }

  onNewReport(callback: (data: any) => void) {
    this.socket?.on('new-report', callback);
  }

  offPriceUpdate(callback: (data: any) => void) {
    this.socket?.off('price-update', callback);
  }

  offSignalEvent(callback: (data: any) => void) {
    this.socket?.off('signal-event', callback);
  }

  offNewReport(callback: (data: any) => void) {
    this.socket?.off('new-report', callback);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Export singleton instance
export const wsClient = new WebSocketClient();