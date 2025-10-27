import { ReactNode } from 'react';

export interface AsciiFrameProps {
  title?: string;
  children: ReactNode;
  className?: string;
  width?: number;
}

export interface AsciiTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    href?: string;
  }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export interface AsciiTableProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
  maxWidth?: number;
}

export interface AsciiMeterProps {
  label: string;
  value: number;
  max: number;
  className?: string;
  showValue?: boolean;
}

export interface AsciiSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}