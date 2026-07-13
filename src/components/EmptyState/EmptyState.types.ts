import type { ComponentType, ReactNode, SVGProps } from 'react';

export type EmptyStateIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type EmptyStatePreset = 'noInternet' | 'noData' | 'notFound' | 'serverError' | 'forbidden';

export interface EmptyStateProps {
  preset?: EmptyStatePreset;
  icon?: EmptyStateIcon;
  code?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}
