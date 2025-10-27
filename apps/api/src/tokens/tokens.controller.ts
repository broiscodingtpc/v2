import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensQueryDto, TrendingQueryDto } from '@metapulse/shared';

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Get('search')
  async searchTokens(@Query() query: TokensQueryDto) {
    return await this.tokensService.searchTokens(query);
  }

  @Get('trending')
  async getTrendingTokens(@Query() query: TrendingQueryDto) {
    return await this.tokensService.getTrendingTokens(query);
  }

  @Get('hot-meta')
  async getHotMeta(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return await this.tokensService.getHotMeta(parsedLimit);
  }

  @Get(':address')
  async getTokenDetails(@Param('address') address: string) {
    const token = await this.tokensService.getTokenDetails(address);
    
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    return token;
  }
}