'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ascii-green/30 bg-ascii-dark-900/95 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-mono text-ascii-green mb-4">
              <div className="text-base font-bold">
                ╔═══════════════╗
              </div>
              <div className="text-sm -mt-1">
                ║ METAPULSE V2  ║
              </div>
              <div className="text-base -mt-1">
                ╚═══════════════╝
              </div>
            </div>
            <p className="font-mono text-sm text-ascii-gray-400 max-w-md">
              Advanced cryptocurrency intelligence platform with real-time signals, 
              social sentiment analysis, and AI-powered insights.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-sm font-bold text-ascii-green mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/tokens" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Token Explorer
                </Link>
              </li>
              <li>
                <Link 
                  href="/signals" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Signal Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/reports" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Analyst Reports
                </Link>
              </li>
              <li>
                <Link 
                  href="/watchlist" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-mono text-sm font-bold text-ascii-green mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`https://t.me/${(process.env.NEXT_PUBLIC_BOT_USERNAME || 'metapulsev2_bot').replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Telegram Bot
                </a>
              </li>
              <li>
                <Link 
                  href="/docs" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="/api" 
                  className="font-mono text-sm text-ascii-gray-400 hover:text-ascii-green transition-colors"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-ascii-green/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-mono text-xs text-ascii-gray-500">
              © 2024 MetaPulse V2. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="font-mono text-xs text-ascii-gray-500">
                System Status: 
                <span className="text-ascii-green ml-1">OPERATIONAL</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
