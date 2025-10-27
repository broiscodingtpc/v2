import React from 'react';
import { AsciiTableProps } from '../types';

export const AsciiTable: React.FC<AsciiTableProps> = ({ 
  headers, 
  rows, 
  className = '', 
  maxWidth = 80 
}) => {
  // Calculate column widths
  const colWidths = headers.map((header, colIndex) => {
    const headerWidth = header.length;
    const maxDataWidth = Math.max(
      ...rows.map(row => String(row[colIndex] || '').length)
    );
    return Math.max(headerWidth, maxDataWidth, 8); // Minimum width of 8
  });

  const totalWidth = colWidths.reduce((sum, width) => sum + width + 3, 1); // +3 for borders and padding

  const createBorder = (type: 'top' | 'middle' | 'bottom') => {
    const chars = {
      top: { left: '┌', right: '┐', horizontal: '─', cross: '┬' },
      middle: { left: '├', right: '┤', horizontal: '─', cross: '┼' },
      bottom: { left: '└', right: '┘', horizontal: '─', cross: '┴' }
    };
    
    const { left, right, horizontal, cross } = chars[type];
    let border = left;
    
    colWidths.forEach((width, index) => {
      border += horizontal.repeat(width + 2); // +2 for padding
      if (index < colWidths.length - 1) {
        border += cross;
      }
    });
    
    border += right;
    return border;
  };

  const formatCell = (content: string | number, width: number) => {
    const str = String(content);
    return str.length > width ? str.substring(0, width - 3) + '...' : str.padEnd(width);
  };

  return (
    <div className={`font-mono text-amber-200 ${className}`}>
      {/* Top border */}
      <div className="whitespace-pre">{createBorder('top')}</div>
      
      {/* Header */}
      <div className="whitespace-pre">
        {'│ ' + headers.map((header, index) => 
          formatCell(header, colWidths[index])
        ).join(' │ ') + ' │'}
      </div>
      
      {/* Middle border */}
      <div className="whitespace-pre">{createBorder('middle')}</div>
      
      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="whitespace-pre">
          {'│ ' + row.map((cell, cellIndex) => 
            formatCell(cell, colWidths[cellIndex])
          ).join(' │ ') + ' │'}
        </div>
      ))}
      
      {/* Bottom border */}
      <div className="whitespace-pre">{createBorder('bottom')}</div>
    </div>
  );
};