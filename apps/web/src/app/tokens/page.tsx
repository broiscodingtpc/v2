'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { tokensApi } from '@/lib/api';
import { Frame } from '@/components/ui/Frame';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Sparkline } from '@/components/ui/Sparkline';
import { formatPrice, formatPercentage, formatMarketCap, formatTimeAgo, getPriceChangeColor, truncateAddress } from '@/lib/utils';

export default function TokensPage() {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTokens = async () => {
    try {
      setLoading(true);
      const params = {
        query: searchQuery || undefined,
        sortBy,
        sortOrder,
        limit: 20,
        offset: (currentPage - 1) * 20,
      };

      const response = await tokensApi.searchTokens(params);
      setTokens(response.data.tokens);
      setTotalPages(Math.ceil(response.data.total / 20));
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [searchQuery, sortBy, sortOrder, currentPage]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTokens();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Frame title="TOKEN EXPLORER">
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search by symbol, name, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" loading={loading}>
                  Search
                </Button>
              </div>
            </form>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="ascii-input px-3 py-2 font-mono text-sm bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green"
              >
                <option value="marketCap">Market Cap</option>
                <option value="price">Price</option>
                <option value="priceChange24h">24h Change</option>
                <option value="volume24h">24h Volume</option>
                <option value="createdAt">Age</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="py-12">
              <Loading size="lg" text="Loading Tokens" />
            </div>
          ) : (
            <>
              <div className="text-sm text-ascii-gray-400 mb-4">
                Showing {tokens.length} tokens (Page {currentPage} of {totalPages})
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Token</TableHeaderCell>
                    <TableHeaderCell align="right">Price</TableHeaderCell>
                    <TableHeaderCell align="right">24h Change</TableHeaderCell>
                    <TableHeaderCell align="right">Market Cap</TableHeaderCell>
                    <TableHeaderCell align="right">24h Volume</TableHeaderCell>
                    <TableHeaderCell align="center">Chart</TableHeaderCell>
                    <TableHeaderCell align="center">Age</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow 
                      key={token.address}
                      onClick={() => window.open(`/tokens/${token.address}`, '_blank')}
                    >
                      <TableCell>
                        <div>
                          <div className="font-bold">{token.symbol}</div>
                          <div className="text-xs text-ascii-gray-400">
                            {token.name}
                          </div>
                          <div className="text-xs text-ascii-gray-500 font-mono">
                            {truncateAddress(token.address)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono">
                          {formatPrice(token.price)}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className={`font-mono ${getPriceChangeColor(token.priceChange24h)}`}>
                          {formatPercentage(token.priceChange24h)}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono">
                          {formatMarketCap(token.marketCap)}
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="font-mono">
                          {formatMarketCap(token.volume24h)}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Sparkline 
                          data={token.priceHistory || []} 
                          color={token.priceChange24h >= 0 ? 'green' : 'red'}
                          width={20}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="text-xs text-ascii-gray-400">
                          {formatTimeAgo(token.createdAt)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </Button>
                  
                  <span className="font-mono text-sm text-ascii-gray-400 px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Frame>
    </div>
  );
}