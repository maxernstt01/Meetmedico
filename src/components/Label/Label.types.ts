import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from 'react';

export type LabelVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type LabelIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface LabelProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode;
  variant?: LabelVariant;
  icon?: LabelIcon;
}
