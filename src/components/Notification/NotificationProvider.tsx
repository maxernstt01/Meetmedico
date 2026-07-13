import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { NotificationCard } from './NotificationCard';
import { NotificationContext } from './NotificationContext';
import styles from './NotificationProvider.module.css';
import type {
  NotificationInstance,
  NotificationOptions,
  NotificationPlacement,
} from './Notification.types';

const placements: NotificationPlacement[] = [
  'top',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
];

const DEFAULT_DURATION = 4500;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotificationInstance[]>([]);
  const idRef = useRef(0);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const close = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const open = useCallback(
    (options: NotificationOptions) => {
      const id = `notification-${idRef.current++}`;
      const duration = options.duration ?? DEFAULT_DURATION;
      setItems((prev) => [...prev, { ...options, id }]);
      if (duration > 0) {
        const timer = setTimeout(() => close(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [close]
  );

  const closeAll = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setItems([]);
  }, []);

  const value = useMemo(() => ({ open, close, closeAll }), [open, close, closeAll]);

  const grouped = useMemo(() => {
    const map = new Map<NotificationPlacement, NotificationInstance[]>();
    for (const item of items) {
      const placement = item.placement ?? 'topRight';
      const list = map.get(placement) ?? [];
      list.push(item);
      map.set(placement, list);
    }
    return map;
  }, [items]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {createPortal(
        <>
          {placements.map((placement) => {
            const list = grouped.get(placement);
            if (!list || list.length === 0) return null;
            return (
              <div key={placement} className={[styles.container, styles[placement]].join(' ')}>
                {list.map((item) => (
                  <NotificationCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    type={item.type}
                    onClose={() => close(item.id)}
                  />
                ))}
              </div>
            );
          })}
        </>,
        document.body
      )}
    </NotificationContext.Provider>
  );
}
