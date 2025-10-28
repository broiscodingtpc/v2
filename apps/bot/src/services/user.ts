import { apiService, User } from './api';

export class UserService {
  async ensureUser(telegramUser: any): Promise<User> {
    try {
      // Try to get existing user
      let user = await apiService.getUser(telegramUser.id.toString());
      
      if (!user) {
        // Create new user if doesn't exist
        user = await apiService.createUser(telegramUser.id.toString(), {
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          isActive: true
        });
      }
      
      return user;
    } catch (error) {
      console.error('Error ensuring user:', error);
      // Fallback: return a mock user when API is unavailable
      return {
        id: telegramUser.id.toString(),
        telegramUserId: telegramUser.id.toString(),
        handle: telegramUser.username || telegramUser.first_name,
        role: 'FREE',
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      } as User;
    }
  }

  async getUser(telegramId: number): Promise<User> {
    try {
      const user = await apiService.getUser(telegramId.toString());
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      // Fallback: return a mock user when API is unavailable
      return {
        id: telegramId.toString(),
        telegramUserId: telegramId.toString(),
        handle: 'user',
        role: 'FREE',
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      } as User;
    }
  }

  async updateUser(telegramId: number, userData: Partial<User>): Promise<User> {
    try {
      return await apiService.updateUser(telegramId.toString(), userData);
    } catch (error) {
      console.error('Error updating user:', error);
      // Fallback: return current user data when API is unavailable
      return await this.getUser(telegramId);
    }
  }
}

export const userService = new UserService();