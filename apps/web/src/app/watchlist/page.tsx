'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { watchlistApi } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useTokenSubscription } from '@/hooks/useWebSocket';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { Sparkline } from '@/components/ui/Sparkline';
import { formatPrice, formatPercentage, formatMarketCap, formatTimeAgo, getPriceChangeColor, cn } from '@/lib/utils';

interface WatchlistToken {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  signalScore: number;
  priceHistory: number[];
  addedAt: string;
}

export default function WatchlistPage() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'addedAt' | 'priceChangePercent24h' | 'marketCap' | 'signalScore'>('addedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set());

  // Subscribe to real-time price updates for watchlist tokens
  useTokenSubscription(
    watchlist.map(token => token.tokenAddress),
    (update) => {
      setWatchlist(prev => prev.map(token => 
        token.tokenAddress === update.address 
          ? { 
              ...token, 
              currentPrice: update.price,
              priceChange24h: update.priceChange24h,
              priceChangePercent24h: update.priceChangePercent24h,
              volume24h: update.volume24h,
              marketCap: update.marketCap,
              priceHistory: [...token.priceHistory.slice(-23), update.price]
            }
          : token
      ));
    }
  );

  const fetchWatchlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await watchlistApi.getWatchlist();
      setWatchlist(response.data);
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  const handleRemoveToken = async (tokenAddress: string) => {
    try {
      await watchlistApi.removeFromWatchlist(tokenAddress);
      setWatchlist(prev => prev.filter(token => token.tokenAddress !== tokenAddress));
      setSelectedTokens(prev => {
        const newSet = new Set(prev);
        newSet.delete(tokenAddress);
        return newSet;
      });
    } catch (error) {
      console.error('Failed to remove token from watchlist:', error);
    }
  };

  const handleBulkRemove = async () => {
    if (selectedTokens.size === 0) return;

    try {
      await Promise.all(
        Array.from(selectedTokens).map(address => 
          watchlistApi.removeFromWatchlist(address)
        )
      );
      setWatchlist(prev => prev.filter(token => !selectedTokens.has(token.tokenAddress)));
      setSelectedTokens(new Set());
    } catch (error) {
      console.error('Failed to remove tokens from watchlist:', error);
    }
  };

  const handleSort = (field: 'addedAt' | 'priceChangePercent24h' | 'marketCap' | 'signalScore') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const toggleTokenSelection = (tokenAddress: string) => {
    setSelectedTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenAddress)) {
        newSet.delete(tokenAddress);
      } else {
        newSet.add(tokenAddress);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedTokens.size === filteredWatchlist.length) {
      setSelectedTokens(new Set());
    } else {
      setSelectedTokens(new Set(filteredWatchlist.map(token => token.tokenAddress)));
    }
  };

  const filteredWatchlist = watchlist
    .filter(token => {
      const matchesSearch = !searchTerm || 
        token.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.tokenName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      
      return (Number(aValue) - Number(bValue)) * multiplier;
    });

  if (!user) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 p-4 flex items-center justify-center">
        <Frame className="p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-ascii-green mb-4">Authentication Required</h2>
          <p className="text-ascii-green/70 mb-6">Please log in to view your watchlist</p>
          <Link href="/auth/login">
            <Button>Login with Telegram</Button>
          </Link>
        </Frame>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ascii-dark-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Frame className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-ascii-green mb-2">
                ╔═══════════════════════════════════════╗
                ║              WATCHLIST                ║
                ╚═══════════════════════════════════════╝
              </h1>
              <p className="text-ascii-green/70">Track your favorite tokens with real-time updates</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-ascii-green/70">Tracked Tokens</div>
              <div className="text-xl font-bold text-ascii-green">{watchlist.length}</div>
            </div>
          </div>
        </Frame>

        {/* Controls */}
        <Frame className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search watchlist..."
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedTokens.size > 0 && (
                <Button
                  variant="error"
                  onClick={handleBulkRemove}
                >
                  Remove Selected ({selectedTokens.size})
                </Button>
              )}
              
              <Link href="/tokens">
                <Button variant="outline">
                  + Add Tokens
                </Button>
              </Link>
            </div>
          </div>
        </Frame>

        {/* Watchlist Table */}
        <Frame className="p-6">
          {loading ? (
            <Loading text="Loading watchlist..." />
          ) : watchlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👀</div>
              <h3 className="text-xl font-bold text-ascii-green mb-2">Your Watchlist is Empty</h3>
              <p className="text-ascii-green/70 mb-6">Start tracking tokens to monitor their performance</p>
              <Link href="/tokens">
                <Button>Browse Tokens</Button>
              </Link>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>
                      <input
                        type="checkbox"
                        checked={selectedTokens.size === filteredWatchlist.length && filteredWatchlist.length > 0}
                        onChange={toggleSelectAll}
                        className="accent-ascii-green"
                      />
                    </TableHeaderCell>
                    <TableHeaderCell>Token</TableHeaderCell>
                    <TableHeaderCell align="right">Price</TableHeaderCell>
                    <TableHeaderCell align="right" className="cursor-pointer hover:text-ascii-amber">
                      <button type="button" onClick={() => handleSort('priceChangePercent24h')} className="w-full text-right">
                        24h Change {sortBy === 'priceChangePercent24h' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHeaderCell>
                    <TableHeaderCell align="right" className="cursor-pointer hover:text-ascii-amber">
                      <button type="button" onClick={() => handleSort('marketCap')} className="w-full text-right">
                        Market Cap {sortBy === 'marketCap' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHeaderCell>
                    <TableHeaderCell align="right">Volume 24h</TableHeaderCell>
                    <TableHeaderCell align="center" className="cursor-pointer hover:text-ascii-amber">
                      <button type="button" onClick={() => handleSort('signalScore')} className="w-full text-center">
                        Signal {sortBy === 'signalScore' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHeaderCell>
                    <TableHeaderCell align="center">Chart</TableHeaderCell>
                    <TableHeaderCell align="center" className="cursor-pointer hover:text-ascii-amber">
                      <button type="button" onClick={() => handleSort('addedAt')} className="w-full text-center">
                        Added {sortBy === 'addedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHeaderCell>
                    <TableHeaderCell align="center">Actions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWatchlist.map((token) => (
                    <TableRow key={token.tokenAddress} className="hover:bg-ascii-dark-800/50">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedTokens.has(token.tokenAddress)}
                          onChange={() => toggleTokenSelection(token.tokenAddress)}
                          className="accent-ascii-green"
                        />
                      </TableCell>
                      <TableCell>
                        <Link href={`/tokens/${token.tokenAddress}`} className="hover:text-ascii-amber">
                          <div>
                            <div className="font-bold text-ascii-green">{token.tokenSymbol}</div>
                            <div className="text-xs text-ascii-green/70">{token.tokenName}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono text-ascii-green">
                          ${formatPrice(token.currentPrice)}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className={cn(
                          "font-mono font-bold",
                          getPriceChangeColor(token.priceChangePercent24h)
                        )}>
                          {formatPercentage(token.priceChangePercent24h)}
                        </div>
                        <div className={cn(
                          "text-xs font-mono",
                          getPriceChangeColor(token.priceChange24h)
                        )}>
                          ${formatPrice(Math.abs(token.priceChange24h))}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono text-ascii-green">
                          ${formatMarketCap(token.marketCap)}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono text-ascii-green/70">
                          ${formatMarketCap(token.volume24h)}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className={cn(
                          "font-bold text-lg",
                          token.signalScore >= 70 ? 'text-ascii-green' :
                          token.signalScore >= 40 ? 'text-ascii-amber' : 'text-ascii-red'
                        )}>
                          {token.signalScore}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Sparkline
                          data={token.priceHistory}
                          width={60}
                          height={30}
                          color={getPriceChangeColor(token.priceChangePercent24h).includes('green') ? 'green' : 'red'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="text-xs text-ascii-green/70">
                          {formatTimeAgo(token.addedAt)}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="error"
                          size="sm"
                          onClick={() => handleRemoveToken(token.tokenAddress)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredWatchlist.length === 0 && searchTerm && (
                <div className="text-center py-8 text-ascii-green/70">
                  <div className="text-4xl mb-4">🔍</div>
                  <div>No tokens found matching "{searchTerm}"</div>
                </div>
              )}
            </>
          )}
        </Frame>
      </div>
    </div>
  );
}
