import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('telegram/:telegramId')
  async getUserByTelegramId(@Param('telegramId') telegramId: string) {
    return await this.usersService.getUserByTelegramId(telegramId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request: Request) {
    const user = (request as any).user;
    return await this.usersService.getUserById(user.sub);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
