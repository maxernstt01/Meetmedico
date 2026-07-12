import type { ReactNode } from 'react';

export type BreadcrumbActiveColor = 'primary' | 'neutral';

export interface BreadcrumbItem {
  key: string;
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  activeColor?: BreadcrumbActiveColor;
  maxItems?: number;
  className?: string;
}
