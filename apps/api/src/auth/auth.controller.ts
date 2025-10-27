import { Controller, Post, Get, Body, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TelegramAuthDto } from '@metapulse/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('telegram/consume')
  async consumeTelegramAuth(
    @Body() telegramAuthDto: TelegramAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, user } = await this.authService.consumeTelegramAuth(
      telegramAuthDto.nonce,
      telegramAuthDto.initData,
    );

    // Set HttpOnly cookie
    response.cookie('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { user };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request: Request) {
    const user = (request as any).user;
    return await this.authService.validateUser(user.sub);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('auth-token');
    return { message: 'Logged out successfully' };
  }
}