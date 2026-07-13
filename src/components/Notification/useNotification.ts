import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import type { NotificationContextValue } from './Notification.types';

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
