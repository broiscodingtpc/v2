'use client';

import { useState, useEffect } from 'react';
import { signalsApi } from '@/lib/api';
import { useSignalSubscription } from '@/hooks/useWebSocket';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell } from '@/components/ui/Table';
import { formatTimeAgo, getSignalColor, cn } from '@/lib/utils';

interface Signal {
  id: string;
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  signalType: string;
  score: number;
  confidence: number;
  description: string;
  metadata: any;
  createdAt: string;
}

const signalTypes = ['all', 'bullish', 'bearish', 'neutral', 'whale_activity', 'social_buzz'];
const scoreRanges = [
  { label: 'All Scores', min: 0, max: 100 },
  { label: 'High (80-100)', min: 80, max: 100 },
  { label: 'Medium (50-79)', min: 50, max: 79 },
  { label: 'Low (0-49)', min: 0, max: 49 },
];

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedScoreRange, setSelectedScoreRange] = useState(scoreRanges[0]);
  const [sortBy, setSortBy] = useState<'createdAt' | 'score' | 'confidence'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Subscribe to real-time signal updates
  useSignalSubscription((signal) => {
    setSignals(prev => [signal, ...prev.slice(0, 49)]); // Keep latest 50 signals
  });

  const fetchSignals = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 20,
        search: searchTerm || undefined,
        signalType: selectedType !== 'all' ? selectedType : undefined,
        minScore: selectedScoreRange.min,
        maxScore: selectedScoreRange.max,
        sortBy,
        sortOrder,
      };

      const response = await signalsApi.getSignals(params);
      setSignals(response.data.signals);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch signals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, [page, selectedType, selectedScoreRange, sortBy, sortOrder]);

  const handleSearch = () => {
    setPage(1);
    fetchSignals();
  };

  const handleSort = (field: 'createdAt' | 'score' | 'confidence') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSignalTypeIcon = (type: string) => {
    switch (type) {
      case 'bullish': return '↗';
      case 'bearish': return '↘';
      case 'neutral': return '→';
      case 'whale_activity': return '🐋';
      case 'social_buzz': return '📢';
      default: return '•';
    }
  };

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = !searchTerm || 
      signal.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signal.tokenName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-ascii-dark-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Frame className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-ascii-green mb-2">
                ╔═══════════════════════════════════════╗
                ║              SIGNAL FEED              ║
                ╚═══════════════════════════════════════╝
              </h1>
              <p className="text-ascii-green/70">Real-time trading signals and market intelligence</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-ascii-green/70">Total Signals</div>
              <div className="text-xl font-bold text-ascii-green">{signals.length}</div>
            </div>
          </div>
        </Frame>

        {/* Filters */}
        <Frame className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <Input
                label="Search Tokens"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Symbol or name..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ascii-green mb-2">Signal Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green p-2 font-mono text-sm focus:border-ascii-green focus:outline-none"
              >
                {signalTypes.map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ascii-green mb-2">Score Range</label>
              <select
                value={selectedScoreRange.label}
                onChange={(e) => {
                  const range = scoreRanges.find(r => r.label === e.target.value);
                  if (range) setSelectedScoreRange(range);
                }}
                className="w-full bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green p-2 font-mono text-sm focus:border-ascii-green focus:outline-none"
              >
                {scoreRanges.map(range => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full">
                Search Signals
              </Button>
            </div>
          </div>
        </Frame>

        {/* Signals Table */}
        <Frame className="p-6">
          {loading ? (
            <Loading text="Loading signals..." />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Token</TableHeaderCell>
                    <TableHeaderCell 
                      onClick={() => handleSort('score')}
                      className="cursor-pointer hover:text-ascii-amber"
                    >
                      Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHeaderCell>
                    <TableHeaderCell 
                      onClick={() => handleSort('confidence')}
                      className="cursor-pointer hover:text-ascii-amber"
                    >
                      Confidence {sortBy === 'confidence' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell 
                      onClick={() => handleSort('createdAt')}
                      className="cursor-pointer hover:text-ascii-amber"
                    >
                      Time {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignals.map((signal) => (
                    <TableRow key={signal.id} className="hover:bg-ascii-dark-800/50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getSignalTypeIcon(signal.signalType)}</span>
                          <span className="text-xs uppercase tracking-wide">
                            {signal.signalType.replace('_', ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-bold text-ascii-green">{signal.tokenSymbol}</div>
                          <div className="text-xs text-ascii-green/70">{signal.tokenName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={cn(
                          "font-bold text-lg",
                          getSignalColor(signal.score)
                        )}>
                          {signal.score}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-ascii-amber">
                          {signal.confidence}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm max-w-xs truncate" title={signal.description}>
                          {signal.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-ascii-green/70">
                          {formatTimeAgo(signal.createdAt)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredSignals.length === 0 && (
                <div className="text-center py-8 text-ascii-green/70">
                  <div className="text-4xl mb-4">📡</div>
                  <div>No signals found matching your criteria</div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-ascii-green">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </Frame>
      </div>
    </div>
  );
}