import {
  WebSocketGateway as WSGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WSGateway({
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
})
export class WebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('WebSocketGateway');
  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('subscribe-token')
  handleSubscribeToken(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tokenAddress: string },
  ) {
    const room = `token:${data.tokenAddress}`;
    client.join(room);
    this.logger.log(`Client ${client.id} subscribed to ${room}`);
    
    return { event: 'subscribed', data: { room } };
  }

  @SubscribeMessage('unsubscribe-token')
  handleUnsubscribeToken(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tokenAddress: string },
  ) {
    const room = `token:${data.tokenAddress}`;
    client.leave(room);
    this.logger.log(`Client ${client.id} unsubscribed from ${room}`);
    
    return { event: 'unsubscribed', data: { room } };
  }

  @SubscribeMessage('subscribe-signals')
  handleSubscribeSignals(@ConnectedSocket() client: Socket) {
    client.join('signals');
    this.logger.log(`Client ${client.id} subscribed to signals`);
    
    return { event: 'subscribed', data: { room: 'signals' } };
  }

  @SubscribeMessage('unsubscribe-signals')
  handleUnsubscribeSignals(@ConnectedSocket() client: Socket) {
    client.leave('signals');
    this.logger.log(`Client ${client.id} unsubscribed from signals`);
    
    return { event: 'unsubscribed', data: { room: 'signals' } };
  }

  // Methods to broadcast updates (called by other services)
  broadcastPriceUpdate(tokenAddress: string, priceData: any) {
    const room = `token:${tokenAddress}`;
    this.server.to(room).emit('price-update', {
      tokenAddress,
      ...priceData,
      timestamp: new Date().toISOString(),
    });
  }

  broadcastSignalEvent(signalData: any) {
    this.server.to('signals').emit('signal-event', {
      ...signalData,
      timestamp: new Date().toISOString(),
    });
  }

  broadcastNewReport(reportData: any) {
    this.server.emit('new-report', {
      ...reportData,
      timestamp: new Date().toISOString(),
    });
  }

  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }
}