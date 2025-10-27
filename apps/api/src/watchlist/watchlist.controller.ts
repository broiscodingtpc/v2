import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Patch, 
  Body, 
  Param, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { Request } from 'express';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddWatchlistDto } from '@metapulse/shared';

@Controller('watchlist')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Get()
  async getUserWatchlist(@Req() request: Request) {
    const user = (request as any).user;
    return await this.watchlistService.getUserWatchlist(user.sub);
  }

  @Post()
  async addToWatchlist(
    @Req() request: Request,
    @Body() addWatchlistDto: AddWatchlistDto,
  ) {
    const user = (request as any).user;
    return await this.watchlistService.addToWatchlist(user.sub, addWatchlistDto);
  }

  @Delete(':id')
  async removeFromWatchlist(
    @Req() request: Request,
    @Param('id') watchlistItemId: string,
  ) {
    const user = (request as any).user;
    return await this.watchlistService.removeFromWatchlist(user.sub, watchlistItemId);
  }

  @Patch(':id')
  async updateWatchlistItem(
    @Req() request: Request,
    @Param('id') watchlistItemId: string,
    @Body() updates: { alertsEnabled?: boolean; priceAlertThreshold?: number },
  ) {
    const user = (request as any).user;
    return await this.watchlistService.updateWatchlistItem(user.sub, watchlistItemId, updates);
  }
}