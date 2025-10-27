import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BotService {
  constructor(private authService: AuthService) {}

  async createAuthLink(telegramUserId: string) {
    return await this.authService.createAuthLink(telegramUserId);
  }

  async handleWebhook(update: any) {
    // This service handles webhook processing
    // The actual bot logic will be in the separate bot service
    // For now, we'll just log the update
    console.log('Received Telegram webhook update:', update);
    
    return { ok: true };
  }
}