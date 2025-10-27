import React from 'react';
import { AsciiSparklineProps } from '../types';

export const AsciiSparkline: React.FC<AsciiSparklineProps> = ({ 
  data, 
  width = 20, 
  height = 8, 
  className = '' 
}) => {
  if (!data || data.length === 0) {
    return <span className={`font-mono text-amber-600 ${className}`}>No data</span>;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Unicode block characters for sparklines
  const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  
  const sparkline = data.slice(-width).map(value => {
    if (range === 0) return blocks[0];
    const normalized = (value - min) / range;
    const blockIndex = Math.min(Math.floor(normalized * blocks.length), blocks.length - 1);
    return blocks[blockIndex];
  }).join('');

  return (
    <span className={`font-mono text-amber-200 ${className}`}>
      {sparkline}
    </span>
  );
};