'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, login, loading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    }
  }, [user, router, searchParams]);

  useEffect(() => {
    // Check for Telegram auth callback
    const nonce = searchParams.get('nonce');
    const initData = searchParams.get('initData');

    if (nonce && initData) {
      handleTelegramAuth(nonce, initData);
    }
  }, [searchParams]);

  const handleTelegramAuth = async (nonce: string, initData: string) => {
    try {
      setAuthLoading(true);
      setError('');
      await login(nonce, initData);
      
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    } catch (error: any) {
      console.error('Authentication failed:', error);
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleTelegramLogin = () => {
    // Redirect to Telegram bot for authentication
    const username = (process.env.NEXT_PUBLIC_BOT_USERNAME || 'metapulsev2_bot').replace(/^@/, '');
    window.open(`https://t.me/${username}?start=auth`, '_blank');
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Authenticating" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-mono text-ascii-green mb-4">
            <div className="text-2xl font-bold">
              ╔══════════════════╗
            </div>
            <div className="text-xl -mt-1">
              ║   METAPULSE V2   ║
            </div>
            <div className="text-2xl -mt-1">
              ╚══════════════════╝
            </div>
          </div>
          <p className="font-mono text-ascii-gray-400 text-sm">
            Secure Authentication Required
          </p>
        </div>

        <Frame title="LOGIN">
          <div className="space-y-6">
            <div className="text-center">
              <p className="font-mono text-sm text-ascii-gray-400 mb-4">
                MetaPulse V2 uses Telegram for secure authentication.
                Click the button below to authenticate via our Telegram bot.
              </p>
            </div>

            {error && (
              <div className="p-3 border border-ascii-red/50 bg-ascii-red/10 rounded">
                <p className="font-mono text-sm text-ascii-red">
                  {error}
                </p>
              </div>
            )}

            <Button
              onClick={handleTelegramLogin}
              className="w-full"
              size="lg"
            >
              🤖 Login with Telegram
            </Button>

            <div className="text-center">
              <p className="font-mono text-xs text-ascii-gray-500">
                Don't have Telegram? 
                <a 
                  href="https://telegram.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ascii-green hover:underline ml-1"
                >
                  Download here
                </a>
              </p>
            </div>

            <div className="border-t border-ascii-green/20 pt-4">
              <div className="text-center">
                <p className="font-mono text-xs text-ascii-gray-400 mb-2">
                  Authentication Flow:
                </p>
                <ol className="font-mono text-xs text-ascii-gray-500 space-y-1 text-left">
                  <li>1. Click "Login with Telegram"</li>
                  <li>2. Start conversation with @{(process.env.NEXT_PUBLIC_BOT_USERNAME || 'metapulsev2_bot').replace(/^@/, '')}</li>
                  <li>3. Follow the authentication instructions</li>
                  <li>4. Return to this page when complete</li>
                </ol>
              </div>
            </div>
          </div>
        </Frame>

        <div className="mt-8 text-center">
          <p className="font-mono text-xs text-ascii-gray-500">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
