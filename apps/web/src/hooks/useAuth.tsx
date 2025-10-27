'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authApi } from '@/lib/api';
import Cookies from 'js-cookie';

interface User {
  id: string;
  telegramUserId: string;
  handle?: string;
  role: string;
  status: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (nonce: string, initData: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = Cookies.get('auth-token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await authApi.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
      Cookies.remove('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (nonce: string, initData: string) => {
    try {
      setLoading(true);
      const response = await authApi.consumeTelegramAuth(nonce, initData);
      setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      Cookies.remove('auth-token');
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}