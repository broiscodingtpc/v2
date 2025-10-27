import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService) {}

  @Post('webhook')
  async handleWebhook(@Body() update: any) {
    return await this.botService.handleWebhook(update);
  }

  @Get('auth-link/:telegramUserId')
  async createAuthLink(@Param('telegramUserId') telegramUserId: string) {
    return await this.botService.createAuthLink(telegramUserId);
  }
}