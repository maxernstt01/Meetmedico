import type { ComponentType, HTMLAttributes, ReactNode, SVGProps } from 'react';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type BadgeIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: BadgeIcon;
}
