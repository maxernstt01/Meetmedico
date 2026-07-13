import type { ComponentType, ReactNode, SVGProps } from 'react';

export type StatisticTrend = 'up' | 'down';
export type StatisticIconVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type StatisticIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface StatisticProps {
  title?: ReactNode;
  value: number | string;
  precision?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  trend?: StatisticTrend;
  icon?: StatisticIcon;
  iconVariant?: StatisticIconVariant;
  loading?: boolean;
  animate?: boolean;
  valueColor?: string;
  groupSeparator?: boolean;
  className?: string;
}
