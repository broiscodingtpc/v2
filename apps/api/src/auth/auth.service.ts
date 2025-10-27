import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { prisma } from '@metapulse/db';
import { 
  generateNonce, 
  verifyTelegramInitData, 
  parseTelegramInitData 
} from '@metapulse/shared';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createAuthLink(telegramUserId: string): Promise<{ nonce: string; webUrl: string }> {
    const nonce = generateNonce();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { telegramUserId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramUserId,
          role: 'FREE',
          status: 'ACTIVE',
        },
      });
    }

    // Create auth link
    await prisma.authLink.create({
      data: {
        userId: user.id,
        nonce,
        expiresAt,
      },
    });

    const webUrl = `${this.configService.get('PUBLIC_WEB_URL')}/auth/link?nonce=${nonce}`;
    
    return { nonce, webUrl };
  }

  async consumeTelegramAuth(nonce: string, initData: string): Promise<{ token: string; user: any }> {
    // Verify Telegram initData
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!verifyTelegramInitData(initData, botToken)) {
      throw new UnauthorizedException('Invalid Telegram authentication data');
    }

    // Parse initData
    const telegramData = parseTelegramInitData(initData);
    if (!telegramData) {
      throw new BadRequestException('Invalid initData format');
    }

    // Find and validate auth link
    const authLink = await prisma.authLink.findUnique({
      where: { nonce },
      include: { user: true },
    });

    if (!authLink) {
      throw new UnauthorizedException('Invalid or expired auth link');
    }

    if (authLink.expiresAt < new Date()) {
      throw new UnauthorizedException('Auth link has expired');
    }

    if (authLink.usedAt) {
      throw new UnauthorizedException('Auth link has already been used');
    }

    if (authLink.user.telegramUserId !== telegramData.id) {
      throw new UnauthorizedException('Telegram user mismatch');
    }

    // Mark auth link as used
    await prisma.authLink.update({
      where: { id: authLink.id },
      data: { usedAt: new Date() },
    });

    // Update user info if needed
    const updatedUser = await prisma.user.update({
      where: { id: authLink.userId },
      data: {
        handle: telegramData.username || authLink.user.handle,
      },
    });

    // Generate JWT
    const payload = { 
      sub: updatedUser.id, 
      telegramUserId: updatedUser.telegramUserId,
      role: updatedUser.role 
    };
    const token = this.jwtService.sign(payload);

    return { 
      token, 
      user: {
        id: updatedUser.id,
        telegramUserId: updatedUser.telegramUserId,
        handle: updatedUser.handle,
        role: updatedUser.role,
        status: updatedUser.status,
        createdAt: updatedUser.createdAt.toISOString(),
      }
    };
  }

  async validateUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User not found or inactive');
    }

    return {
      id: user.id,
      telegramUserId: user.telegramUserId,
      handle: user.handle,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
    };
  }
}