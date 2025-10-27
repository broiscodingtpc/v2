'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Tokens', href: '/tokens' },
  { name: 'Signals', href: '/signals' },
  { name: 'Reports', href: '/reports' },
  { name: 'Watchlist', href: '/watchlist' },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { connected } = useWebSocket();

  return (
    <header className="border-b border-ascii-green/30 bg-ascii-dark-900/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-mono text-ascii-green">
              <div className="text-lg font-bold">
                ╔═══════════════╗
              </div>
              <div className="text-sm -mt-1">
                ║ METAPULSE V2  ║
              </div>
              <div className="text-lg -mt-1">
                ╚═══════════════╝
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'font-mono text-sm transition-colors hover:text-ascii-green',
                  pathname === item.href
                    ? 'text-ascii-green border-b border-ascii-green'
                    : 'text-ascii-gray-400'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Status & User */}
          <div className="flex items-center space-x-4">
            {/* WebSocket Status */}
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  connected ? 'bg-ascii-green animate-pulse' : 'bg-ascii-red'
                )}
              />
              <span className="font-mono text-xs text-ascii-gray-400">
                {connected ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="font-mono text-sm text-ascii-green">
                  @{user.handle || user.telegramUserId}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-ascii-green/30">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block px-3 py-2 font-mono text-sm transition-colors',
                pathname === item.href
                  ? 'text-ascii-green bg-ascii-green/10'
                  : 'text-ascii-gray-400 hover:text-ascii-green hover:bg-ascii-green/5'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}