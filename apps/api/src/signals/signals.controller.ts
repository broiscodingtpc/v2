import { Controller, Get, Query, Param } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsQueryDto } from '@metapulse/shared';

@Controller('signals')
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Get('events')
  async getSignalEvents(@Query() query: SignalsQueryDto) {
    return await this.signalsService.getSignalEvents(query);
  }

  @Get('scores/:tokenAddress')
  async getTokenSignalScores(
    @Param('tokenAddress') tokenAddress: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 24;
    return await this.signalsService.getTokenSignalScores(tokenAddress, parsedLimit);
  }

  @Get('top-tokens')
  async getTopSignalTokens(
    @Query('timeframe') timeframe?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return await this.signalsService.getTopSignalTokens(timeframe, parsedLimit);
  }

  @Get('summary')
  async getSignalSummary(@Query('tokenAddress') tokenAddress?: string) {
    return await this.signalsService.getSignalSummary(tokenAddress);
  }
}