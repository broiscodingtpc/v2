'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tokensApi, signalsApi, reportsApi } from '@/lib/api';
import { useSignalSubscription } from '@/hooks/useWebSocket';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Sparkline } from '@/components/ui/Sparkline';
import { formatPrice, formatPercentage, formatTimeAgo, getSignalColor, getPriceChangeColor } from '@/lib/utils';

export default function Dashboard() {
  const [trendingTokens, setTrendingTokens] = useState<any[]>([]);
  const [hotMeta, setHotMeta] = useState<any[]>([]);
  const [topSignals, setTopSignals] = useState<any[]>([]);
  const [latestReports, setLatestReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const signalEvents = useSignalSubscription();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [trending, meta, signals, reports] = await Promise.all([
          tokensApi.getTrendingTokens({ timeframe: '24h', limit: 5 }),
          tokensApi.getHotMeta(5),
          signalsApi.getTopSignalTokens({ timeframe: '24h', limit: 5 }),
          reportsApi.getLatestReports(5),
        ]);

        setTrendingTokens(trending.data);
        setHotMeta(meta.data);
        setTopSignals(signals.data);
        setLatestReports(reports.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading size="lg" text="Loading Dashboard" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="font-mono text-ascii-green mb-4">
          <div className="text-2xl font-bold">
            ╔══════════════════════════════╗
          </div>
          <div className="text-xl -mt-1">
            ║     METAPULSE V2 DASHBOARD    ║
          </div>
          <div className="text-2xl -mt-1">
            ╚══════════════════════════════╝
          </div>
        </div>
        <p className="font-mono text-ascii-gray-400 text-sm">
          Real-time cryptocurrency intelligence and market analysis
        </p>
      </div>

      {/* Live Signal Feed */}
      {signalEvents.length > 0 && (
        <Frame title="LIVE SIGNAL FEED" className="mb-8">
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {signalEvents.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-ascii-gray-400">
                  {formatTimeAgo(event.timestamp)}
                </span>
                <span className="text-ascii-green">
                  {event.tokenSymbol}
                </span>
                <span className={getSignalColor(event.signalScore)}>
                  {event.eventType} ({event.signalScore})
                </span>
              </div>
            ))}
          </div>
        </Frame>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Tokens */}
        <Frame title="TRENDING TOKENS (24H)">
          <div className="space-y-3">
            {trendingTokens.map((token, index) => (
              <Link 
                key={token.address} 
                href={`/tokens/${token.address}`}
                className="block hover:bg-ascii-green/5 p-2 -m-2 rounded transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-ascii-gray-500 text-xs w-4">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-sm">{token.symbol}</div>
                      <div className="text-xs text-ascii-gray-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{formatPrice(token.price)}</div>
                    <div className={`text-xs ${getPriceChangeColor(token.priceChange24h)}`}>
                      {formatPercentage(token.priceChange24h)}
                    </div>
                  </div>
                  <div className="w-16">
                    <Sparkline 
                      data={token.priceHistory || []} 
                      color={token.priceChange24h >= 0 ? 'green' : 'red'}
                      width={16}
                    />
                  </div>
                </div>
              </Link>
            ))}
            <div className="pt-2 border-t border-ascii-green/20">
              <Link href="/tokens">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Tokens →
                </Button>
              </Link>
            </div>
          </div>
        </Frame>

        {/* Hot Meta */}
        <Frame title="HOT META TOKENS">
          <div className="space-y-3">
            {hotMeta.map((token, index) => (
              <Link 
                key={token.address} 
                href={`/tokens/${token.address}`}
                className="block hover:bg-ascii-green/5 p-2 -m-2 rounded transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-ascii-gray-500 text-xs w-4">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-sm">{token.symbol}</div>
                      <div className="text-xs text-ascii-gray-400">
                        {token.socialMentions} mentions
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${getSignalColor(token.signalScore)}`}>
                      Signal: {token.signalScore}
                    </div>
                    <div className="text-xs text-ascii-gray-400">
                      {formatTimeAgo(token.lastMention)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="pt-2 border-t border-ascii-green/20">
              <Link href="/signals">
                <Button variant="ghost" size="sm" className="w-full">
                  View Signal Dashboard →
                </Button>
              </Link>
            </div>
          </div>
        </Frame>

        {/* Top Signal Tokens */}
        <Frame title="TOP SIGNAL TOKENS">
          <div className="space-y-3">
            {topSignals.map((token, index) => (
              <Link 
                key={token.address} 
                href={`/tokens/${token.address}`}
                className="block hover:bg-ascii-green/5 p-2 -m-2 rounded transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-ascii-gray-500 text-xs w-4">
                      #{index + 1}
                    </span>
                    <div>
                      <div className="font-bold text-sm">{token.symbol}</div>
                      <div className="text-xs text-ascii-gray-400">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getSignalColor(token.averageScore)}`}>
                      {token.averageScore}
                    </div>
                    <div className="text-xs text-ascii-gray-400">
                      {token.eventCount} events
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <div className="pt-2 border-t border-ascii-green/20">
              <Link href="/signals">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Signals →
                </Button>
              </Link>
            </div>
          </div>
        </Frame>

        {/* Latest Reports */}
        <Frame title="LATEST ANALYST REPORTS">
          <div className="space-y-3">
            {latestReports.map((report) => (
              <Link 
                key={report.id} 
                href={`/reports/${report.id}`}
                className="block hover:bg-ascii-green/5 p-2 -m-2 rounded transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm line-clamp-2">
                    {report.title}
                  </div>
                  <div className="flex items-center justify-between text-xs text-ascii-gray-400">
                    <span>{report.tokenSymbol}</span>
                    <span>{formatTimeAgo(report.createdAt)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {report.tags?.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-1 py-0.5 bg-ascii-green/10 text-ascii-green text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            <div className="pt-2 border-t border-ascii-green/20">
              <Link href="/reports">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Reports →
                </Button>
              </Link>
            </div>
          </div>
        </Frame>
      </div>

      {/* Quick Actions */}
      <Frame title="QUICK ACTIONS">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/tokens/search">
            <Button variant="outline" className="w-full">
              🔍 Search Tokens
            </Button>
          </Link>
          <Link href="/watchlist">
            <Button variant="outline" className="w-full">
              ⭐ My Watchlist
            </Button>
          </Link>
          <Link href="/signals">
            <Button variant="outline" className="w-full">
              📊 Signal Dashboard
            </Button>
          </Link>
          <a 
            href="https://t.me/metapulsev2_bot" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full">
              🤖 Telegram Bot
            </Button>
          </a>
        </div>
      </Frame>
    </div>
  );
}