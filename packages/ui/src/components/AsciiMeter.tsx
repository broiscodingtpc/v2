import React from 'react';
import { AsciiMeterProps } from '../types';

export const AsciiMeter: React.FC<AsciiMeterProps> = ({ 
  label, 
  value, 
  max, 
  className = '', 
  showValue = true 
}) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const filledBars = Math.round(percentage * 10);
  const emptyBars = 10 - filledBars;
  
  const meter = '#'.repeat(filledBars) + '-'.repeat(emptyBars);
  const displayValue = showValue ? ` ${value}/${max}` : '';

  return (
    <div className={`font-mono text-amber-200 ${className}`}>
      <span className="text-amber-300">{label}:</span>
      <span className="ml-2 text-amber-100">[{meter}]</span>
      {showValue && (
        <span className="ml-2 text-amber-400">{displayValue}</span>
      )}
    </div>
  );
};