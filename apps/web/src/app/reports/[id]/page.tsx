'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { reportsApi } from '@/lib/api';
import { Frame } from '@/components/ui/Frame';
import { Button } from '@/components/ui/Button';
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

export default function ReportDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await reportsApi.getReport(params.id as string);
        setReport(response.data);
      } catch (error) {
        console.error('Failed to fetch report:', error);
        setError('Failed to load report');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReport();
    }
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 p-4 flex items-center justify-center">
        <Loading text="Loading report..." />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-ascii-dark-900 p-4 flex items-center justify-center">
        <Frame className="p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-ascii-red mb-4">Report Not Found</h2>
          <p className="text-ascii-green/70 mb-6">
            {error || 'The requested report could not be found.'}
          </p>
          <Link href="/reports">
            <Button>Back to Reports</Button>
          </Link>
        </Frame>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ascii-dark-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center space-x-2 text-ascii-green/70">
          <Link href="/reports" className="hover:text-ascii-green">
            Reports
          </Link>
          <span>→</span>
          <span className="text-ascii-green">{report.title}</span>
        </div>

        {/* Header */}
        <Frame className="p-8">
          <div className="space-y-6">
            {/* Sentiment and Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getSentimentIcon(report.sentiment)}</span>
                  <span className={cn(
                    "text-sm uppercase tracking-wide font-bold",
                    getSentimentColor(report.sentiment)
                  )}>
                    {report.sentiment}
                  </span>
                </div>
                
                {report.tokenSymbol && (
                  <div className="flex items-center space-x-2">
                    <span className="text-ascii-green/70">•</span>
                    <Link 
                      href={`/tokens/${report.tokenAddress}`}
                      className="text-ascii-amber hover:text-ascii-amber/80 font-bold"
                    >
                      ${report.tokenSymbol}
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="text-right text-sm text-ascii-green/70">
                <div>{report.readTime} min read</div>
                <div>{formatTimeAgo(report.createdAt)}</div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-ascii-green leading-tight">
              {report.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center justify-between border-t border-ascii-green/20 pt-4">
              <div className="flex items-center space-x-4">
                <div className="text-ascii-green">
                  <div className="font-bold">By {report.author}</div>
                  <div className="text-sm text-ascii-green/70">
                    Published {formatTimeAgo(report.createdAt)}
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {report.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {report.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-ascii-dark-800 border border-ascii-green/30 text-xs text-ascii-green/70 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Frame>

        {/* Summary */}
        <Frame className="p-6">
          <h2 className="text-lg font-bold text-ascii-green mb-4">
            ╔═══════════════════════════════════════╗
            ║               SUMMARY                 ║
            ╚═══════════════════════════════════════╝
          </h2>
          <p className="text-ascii-green/90 leading-relaxed">
            {report.summary}
          </p>
        </Frame>

        {/* Content */}
        <Frame className="p-6">
          <h2 className="text-lg font-bold text-ascii-green mb-4">
            ╔═══════════════════════════════════════╗
            ║            FULL ANALYSIS              ║
            ╚═══════════════════════════════════════╝
          </h2>
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-ascii-green/90 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: report.content.replace(/\n/g, '<br />') 
              }}
            />
          </div>
        </Frame>

        {/* Footer Actions */}
        <Frame className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-ascii-green/70">
              Last updated: {formatTimeAgo(report.updatedAt)}
            </div>
            
            <div className="flex items-center space-x-4">
              {report.tokenAddress && (
                <Link href={`/tokens/${report.tokenAddress}`}>
                  <Button variant="outline">
                    View Token Details
                  </Button>
                </Link>
              )}
              
              <Link href="/reports">
                <Button>
                  Back to Reports
                </Button>
              </Link>
            </div>
          </div>
        </Frame>

        {/* Related Reports */}
        <Frame className="p-6">
          <h3 className="text-lg font-bold text-ascii-green mb-4">
            Related Reports
          </h3>
          <div className="text-center py-8 text-ascii-green/70">
            <div className="text-2xl mb-2">🔍</div>
            <div>Related reports feature coming soon...</div>
          </div>
        </Frame>
      </div>
    </div>
  );
}