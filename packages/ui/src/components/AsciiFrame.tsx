import React from 'react';
import { AsciiFrameProps } from '../types';

export const AsciiFrame: React.FC<AsciiFrameProps> = ({ 
  title, 
  children, 
  className = '', 
  width = 60 
}) => {
  const topBorder = '╔' + '═'.repeat(width - 2) + '╗';
  const bottomBorder = '╚' + '═'.repeat(width - 2) + '╝';
  const titleBorder = title ? '╠' + '═'.repeat(width - 2) + '╣' : '';

  return (
    <div className={`font-mono text-amber-200 ${className}`}>
      <div className="whitespace-pre">{topBorder}</div>
      {title && (
        <>
          <div className="whitespace-pre">
            {'║ ' + title.padEnd(width - 4) + ' ║'}
          </div>
          <div className="whitespace-pre">{titleBorder}</div>
        </>
      )}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 text-amber-200">║</div>
        <div className="absolute right-0 top-0 bottom-0 text-amber-200">║</div>
        <div className="px-2 py-1">
          {children}
        </div>
      </div>
      <div className="whitespace-pre">{bottomBorder}</div>
    </div>
  );
};