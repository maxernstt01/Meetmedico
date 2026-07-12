import type { ReactNode } from 'react';

export type ProgressType = 'line' | 'circle';
export type ProgressStatus = 'primary' | 'secondary' | 'success' | 'error';
export type ProgressSize = 'default' | 'small' | 'micro';

export interface ProgressProps {
  type?: ProgressType;
  percent: number;
  status?: ProgressStatus;
  size?: ProgressSize;
  showInfo?: boolean;
  info?: ReactNode;
  label?: ReactNode;
  loading?: boolean;
  strokeWidth?: number;
  fontSize?: number | string;
  diameter?: number;
  height?: number;
  className?: string;
}
