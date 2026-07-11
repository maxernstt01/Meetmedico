import type { ComponentType, SVGProps } from 'react';

export type AppFooterIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface AppFooterItem {
  value: string;
  label: string;
  icon: AppFooterIcon;
}

export interface AppFooterProps {
  items: AppFooterItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Decorative bar mimicking a phone's home indicator. Default true. */
  showHomeIndicator?: boolean;
  className?: string;
}
