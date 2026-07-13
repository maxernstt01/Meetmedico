import type { ReactNode } from 'react';

export type NotificationType = 'default' | 'success' | 'info' | 'warning' | 'error';

export type NotificationPlacement =
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface NotificationOptions {
  title: ReactNode;
  description?: ReactNode;
  type?: NotificationType;
  placement?: NotificationPlacement;
  duration?: number;
}

export interface NotificationInstance extends NotificationOptions {
  id: string;
}

export interface NotificationContextValue {
  open: (options: NotificationOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
}
