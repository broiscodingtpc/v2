'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  color?: 'green' | 'red' | 'amber' | 'blue';
}

const colorClasses = {
  green: 'text-ascii-green',
  red: 'text-ascii-red',
  amber: 'text-ascii-amber',
  blue: 'text-ascii-blue',
};

export function Sparkline({ 
  data, 
  width = 60, 
  height = 20, 
  className, 
  color = 'green' 
}: SparklineProps) {
  const sparklineChars = useMemo(() => {
    if (!data || data.length === 0) return '';

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    if (range === 0) return '─'.repeat(Math.min(data.length, width));

    const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    const step = range / (chars.length - 1);

    return data
      .slice(0, width)
      .map(value => {
        const normalized = (value - min) / range;
        const index = Math.min(Math.floor(normalized * (chars.length - 1)), chars.length - 1);
        return chars[index];
      })
      .join('');
  }, [data, width]);

  const colorClass = colorClasses[color];

  return (
    <div className={cn('font-mono text-xs leading-none', colorClass, className)}>
      {sparklineChars || '─'.repeat(10)}
    </div>
  );
}

export function ASCIIChart({ 
  data, 
  width = 40, 
  height = 8, 
  className 
}: { 
  data: number[]; 
  width?: number; 
  height?: number; 
  className?: string; 
}) {
  const chart = useMemo(() => {
    if (!data || data.length === 0) return [];

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    if (range === 0) {
      return Array(height).fill('─'.repeat(width));
    }

    const normalizedData = data.map(value => 
      Math.floor(((value - min) / range) * (height - 1))
    );

    const lines: string[] = [];
    
    for (let y = height - 1; y >= 0; y--) {
      let line = '';
      for (let x = 0; x < Math.min(width, normalizedData.length); x++) {
        const dataIndex = Math.floor((x / width) * normalizedData.length);
        const value = normalizedData[dataIndex];
        
        if (value === y) {
          line += '█';
        } else if (value > y) {
          line += '│';
        } else {
          line += ' ';
        }
      }
      lines.push(line.padEnd(width));
    }

    return lines;
  }, [data, width, height]);

  return (
    <div className={cn('font-mono text-xs text-ascii-green whitespace-pre', className)}>
      {chart.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}