'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { reportsApi } from '@/lib/api';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { formatTimeAgo, cn } from '@/lib/utils';

interface Report {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  tokenAddress?: string;
  tokenSymbol?: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

const sentimentOptions = ['all', 'bullish', 'bearish', 'neutral'];
const sortOptions = [
  { value: 'createdAt', label: 'Latest' },
  { value: 'readTime', label: 'Read Time' },
  { value: 'title', label: 'Title' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        search: searchTerm || undefined,
        sentiment: selectedSentiment !== 'all' ? selectedSentiment : undefined,
        tag: selectedTag !== 'all' ? selectedTag : undefined,
        sortBy,
        sortOrder,
      };

      const response = await reportsApi.getReports(params);
      setReports(response.data.reports);
      setTotalPages(response.data.totalPages);
      
      // Extract unique tags
      const tags = new Set<string>();
      response.data.reports.forEach((report: Report) => {
        report.tags.forEach(tag => tags.add(tag));
      });
      setAvailableTags(Array.from(tags));
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, selectedSentiment, selectedTag, sortBy, sortOrder]);

  const handleSearch = () => {
    setPage(1);
    fetchReports();
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '📈';
      case 'bearish': return '📉';
      case 'neutral': return '➡️';
      default: return '📊';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-ascii-green';
      case 'bearish': return 'text-ascii-red';
      case 'neutral': return 'text-ascii-amber';
      default: return 'text-ascii-green/70';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = !searchTerm || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.tokenSymbol && report.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
                ║            ANALYST REPORTS            ║
                ╚═══════════════════════════════════════╝
              </h1>
              <p className="text-ascii-green/70">In-depth analysis and market insights</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-ascii-green/70">Total Reports</div>
              <div className="text-xl font-bold text-ascii-green">{reports.length}</div>
            </div>
          </div>
        </Frame>

        {/* Filters */}
        <Frame className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <Input
                label="Search Reports"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Title, author, token..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ascii-green mb-2">Sentiment</label>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="w-full bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green p-2 font-mono text-sm focus:border-ascii-green focus:outline-none"
              >
                {sentimentOptions.map(sentiment => (
                  <option key={sentiment} value={sentiment}>
                    {sentiment.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ascii-green mb-2">Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green p-2 font-mono text-sm focus:border-ascii-green focus:outline-none"
              >
                <option value="all">ALL TAGS</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ascii-green mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-ascii-dark-800 border border-ascii-green/30 text-ascii-green p-2 font-mono text-sm focus:border-ascii-green focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full">
                Search Reports
              </Button>
            </div>
          </div>
        </Frame>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full">
              <Loading text="Loading reports..." />
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="col-span-full">
              <Frame className="p-8 text-center">
                <div className="text-4xl mb-4">📄</div>
                <div className="text-ascii-green/70">No reports found matching your criteria</div>
              </Frame>
            </div>
          ) : (
            filteredReports.map((report) => (
              <Frame key={report.id} className="p-6 hover:border-ascii-amber/50 transition-colors">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getSentimentIcon(report.sentiment)}</span>
                      <span className={cn(
                        "text-xs uppercase tracking-wide font-bold",
                        getSentimentColor(report.sentiment)
                      )}>
                        {report.sentiment}
                      </span>
                    </div>
                    <div className="text-xs text-ascii-green/70">
                      {report.readTime} min read
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-ascii-green leading-tight">
                    {report.title}
                  </h3>

                  {/* Token Info */}
                  {report.tokenSymbol && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-ascii-green/70">Token:</span>
                      <Link 
                        href={`/tokens/${report.tokenAddress}`}
                        className="text-ascii-amber hover:text-ascii-amber/80 font-bold"
                      >
                        {report.tokenSymbol}
                      </Link>
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-sm text-ascii-green/80 line-clamp-3">
                    {report.summary}
                  </p>

                  {/* Tags */}
                  {report.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {report.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-ascii-dark-800 border border-ascii-green/30 text-xs text-ascii-green/70 font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                      {report.tags.length > 3 && (
                        <span className="text-xs text-ascii-green/50">
                          +{report.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-ascii-green/20">
                    <div className="text-xs text-ascii-green/70">
                      By {report.author}
                    </div>
                    <div className="text-xs text-ascii-green/70">
                      {formatTimeAgo(report.createdAt)}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/reports/${report.id}`}>
                    <Button variant="outline" className="w-full">
                      Read Full Report →
                    </Button>
                  </Link>
                </div>
              </Frame>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Frame className="p-4">
            <div className="flex justify-center items-center space-x-4">
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
          </Frame>
        )}
      </div>
    </div>
  );
}