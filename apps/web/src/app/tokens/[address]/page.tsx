'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { tokensApi, signalsApi, watchlistApi } from '@/lib/api';
import { useTokenSubscription } from '@/hooks/useWebSocket';
import { useAuth } from '@/hooks/useAuth';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { ASCIIChart } from '@/components/ui/Sparkline';
import { formatPrice, formatPercentage, formatMarketCap, formatTimeAgo, getSignalColor, getPriceChangeColor, truncateAddress } from '@/lib/utils';

export default function TokenDetailsPage() {
  const params = useParams();
  const address = params.address as string;
  const { user } = useAuth();
  
  const [token, setToken] = useState<any>(null);
  const [signalScores, setSignalScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  const priceData = useTokenSubscription(address);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        setLoading(true);
        const [tokenResponse, signalsResponse] = await Promise.all([
          tokensApi.getTokenDetails(address),
          signalsApi.getTokenSignalScores(address, 50),
        ]);

        setToken(tokenResponse.data);
        setSignalScores(signalsResponse.data);
        
        // Check if token is in user's watchlist
        if (user) {
          try {
            const watchlistResponse = await watchlistApi.getUserWatchlist();
            const isInWatchlist = watchlistResponse.data.some((item: any) => 
              item.tokenAddress === address
            );
            setInWatchlist(isInWatchlist);
          } catch (error) {
            console.error('Failed to check watchlist status:', error);
          }
        }
      } catch (error) {
        console.error('Failed to fetch token details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchTokenDetails();
    }
  }, [address, user]);

  // Update token price with real-time data
  useEffect(() => {
    if (priceData && token) {
      setToken((prev: any) => ({
        ...prev,
        price: priceData.price,
        priceChange24h: priceData.priceChange24h,
        volume24h: priceData.volume24h,
      }));
    }
  }, [priceData, token]);

  const handleAddToWatchlist = async () => {
    if (!user || !token) return;

    try {
      setAddingToWatchlist(true);
      await watchlistApi.addToWatchlist({
        tokenAddress: token.address,
        alertEnabled: true,
        priceThreshold: token.price * 1.1, // 10% above current price
      });
      setInWatchlist(true);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    } finally {
      setAddingToWatchlist(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading size="lg" text="Loading Token Details" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Frame title="TOKEN NOT FOUND">
          <div className="text-center py-8">
            <p className="font-mono text-ascii-red">
              Token with address {address} not found.
            </p>
          </div>
        </Frame>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Token Header */}
      <Frame title={`${token.symbol} - TOKEN DETAILS`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-ascii-green mb-2">
                {token.name} ({token.symbol})
              </h1>
              <p className="font-mono text-xs text-ascii-gray-400 break-all">
                {token.address}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-ascii-gray-400 mb-1">Price</div>
                <div className="font-mono text-lg font-bold">
                  {formatPrice(token.price)}
                </div>
              </div>
              <div>
                <div className="text-xs text-ascii-gray-400 mb-1">24h Change</div>
                <div className={`font-mono text-lg font-bold ${getPriceChangeColor(token.priceChange24h)}`}>
                  {formatPercentage(token.priceChange24h)}
                </div>
              </div>
              <div>
                <div className="text-xs text-ascii-gray-400 mb-1">Market Cap</div>
                <div className="font-mono text-lg font-bold">
                  {formatMarketCap(token.marketCap)}
                </div>
              </div>
              <div>
                <div className="text-xs text-ascii-gray-400 mb-1">24h Volume</div>
                <div className="font-mono text-lg font-bold">
                  {formatMarketCap(token.volume24h)}
                </div>
              </div>
            </div>

            {token.description && (
              <div>
                <div className="text-xs text-ascii-gray-400 mb-2">Description</div>
                <p className="text-sm text-ascii-gray-300">
                  {token.description}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {user && (
              <Button
                onClick={handleAddToWatchlist}
                loading={addingToWatchlist}
                disabled={inWatchlist}
                className="w-full"
              >
                {inWatchlist ? '✓ In Watchlist' : '⭐ Add to Watchlist'}
              </Button>
            )}

            <div className="space-y-2">
              <div className="text-xs text-ascii-gray-400">Quick Stats</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatTimeAgo(token.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pairs:</span>
                  <span>{token.pairs?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Signal Score:</span>
                  <span className={getSignalColor(token.signalScore)}>
                    {token.signalScore || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* Price Chart */}
      {token.priceHistory && token.priceHistory.length > 0 && (
        <Frame title="PRICE CHART (24H)">
          <div className="py-4">
            <ASCIIChart 
              data={token.priceHistory} 
              width={80} 
              height={12}
            />
          </div>
        </Frame>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trading Pairs */}
        {token.pairs && token.pairs.length > 0 && (
          <Frame title="TRADING PAIRS">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Pair</TableHeaderCell>
                  <TableHeaderCell align="right">Price</TableHeaderCell>
                  <TableHeaderCell align="right">24h Vol</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {token.pairs.slice(0, 5).map((pair: any) => (
                  <TableRow key={pair.address}>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {pair.baseToken.symbol}/{pair.quoteToken.symbol}
                      </div>
                      <div className="text-xs text-ascii-gray-400">
                        {pair.dexId}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="font-mono">
                        {formatPrice(pair.priceUsd)}
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="font-mono">
                        {formatMarketCap(pair.volume24h)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Frame>
        )}

        {/* Signal History */}
        {signalScores.length > 0 && (
          <Frame title="SIGNAL HISTORY">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {signalScores.slice(0, 10).map((score, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-ascii-gray-400">
                    {formatTimeAgo(score.timestamp)}
                  </span>
                  <span className={`font-mono ${getSignalColor(score.score)}`}>
                    {score.score}
                  </span>
                </div>
              ))}
            </div>
          </Frame>
        )}
      </div>

      {/* Social Mentions */}
      {token.socialMentions && token.socialMentions.length > 0 && (
        <Frame title="RECENT SOCIAL MENTIONS">
          <div className="space-y-3">
            {token.socialMentions.slice(0, 5).map((mention: any, index: number) => (
              <div key={index} className="border-b border-ascii-green/20 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-ascii-green">
                    @{mention.author}
                  </span>
                  <span className="text-xs text-ascii-gray-400">
                    {formatTimeAgo(mention.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-ascii-gray-300">
                  {mention.content}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-ascii-gray-500">
                    {mention.platform}
                  </span>
                  <span className={`text-xs ${getSignalColor(mention.sentimentScore)}`}>
                    Sentiment: {mention.sentimentScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      )}
    </div>
  );
}