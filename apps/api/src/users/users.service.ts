import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@metapulse/db';

@Injectable()
export class UsersService {
  async getUserByTelegramId(telegramId: string) {
    const user = await prisma.user.findUnique({
      where: { telegramUserId: telegramId },
      select: {
        id: true,
        telegramUserId: true,
        handle: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        telegramUserId: true,
        handle: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(telegramData: any) {
    return await prisma.user.create({
      data: {
        telegramUserId: telegramData.id.toString(),
        handle: telegramData.username || `user_${telegramData.id}`,
        role: 'USER',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        telegramUserId: true,
        handle: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
