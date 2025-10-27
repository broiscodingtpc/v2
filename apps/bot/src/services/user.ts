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
      throw error;
    }
  }

  async getUser(telegramId: number): Promise<User> {
    const user = await apiService.getUser(telegramId.toString());
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(telegramId: number, userData: Partial<User>): Promise<User> {
    return await apiService.updateUser(telegramId.toString(), userData);
  }
}

export const userService = new UserService();