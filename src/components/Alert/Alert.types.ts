import type { HTMLAttributes, ReactNode } from 'react';

export type AlertType = 'warning' | 'error' | 'info' | 'success';
export type AlertLevel = 'primary' | 'secondary';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type: AlertType;
  level?: AlertLevel;
  showIcon?: boolean;
  children: ReactNode;
}
