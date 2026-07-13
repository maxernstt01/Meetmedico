import type { ReactNode } from 'react';
import CheckmarkGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import styles from './Timeline.module.css';
import type { TimelineItem, TimelineProps } from './Timeline.types';

function TimelineDot({ item }: { item: TimelineItem }) {
  const status = item.status ?? 'default';
  const Icon = item.icon;

  return (
    <span
      className={[styles.dot, styles[status], Icon && styles.dotWithIcon].filter(Boolean).join(' ')}
      style={item.color ? { borderColor: item.color } : undefined}
    >
      {Icon ? (
        <Icon className={styles.dotIcon} aria-hidden="true" />
      ) : status === 'success' ? (
        <CheckmarkGlyph className={styles.dotIcon} aria-hidden="true" />
      ) : status === 'error' ? (
        <CancelGlyph className={styles.dotIcon} aria-hidden="true" />
      ) : null}
    </span>
  );
}

type RenderEntry =
  | { type: 'item'; item: TimelineItem; index: number }
  | { type: 'pending'; content: ReactNode };

export function Timeline({
  items,
  orientation = 'vertical',
  placement = 'left',
  reverse = false,
  pending,
  className,
}: TimelineProps) {
  const isCenter = orientation === 'vertical' && placement === 'center';
  const displayItems = reverse ? [...items].reverse() : items;

  const entries: RenderEntry[] = displayItems.map((item, index) => ({ type: 'item', item, index }));
  if (pending) {
    const pendingEntry: RenderEntry = { type: 'pending', content: pending };
    if (reverse) entries.unshift(pendingEntry);
    else entries.push(pendingEntry);
  }

  const wrapperClasses = [styles.timeline, styles[orientation], isCenter && styles.center, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} role="list">
      {entries.map((entry, position) => {
        const isLast = position === entries.length - 1;
        const key = entry.type === 'pending' ? 'pending' : entry.item.key ?? entry.index;
        const side = position % 2 === 0 ? 'left' : 'right';

        const indicator =
          entry.type === 'pending' ? (
            <span className={styles.spinnerDot} aria-hidden="true" />
          ) : (
            <TimelineDot item={entry.item} />
          );

        const content = entry.type === 'pending' ? entry.content : entry.item.children;

        const indicatorColumn = (
          <div className={styles.indicatorCol}>
            {indicator}
            {!isLast && <span className={styles.connector} />}
          </div>
        );

        if (isCenter) {
          return (
            <div key={key} role="listitem" className={styles.item}>
              <div className={styles.sideLeft}>{side === 'left' ? content : null}</div>
              {indicatorColumn}
              <div className={styles.sideRight}>{side === 'right' ? content : null}</div>
            </div>
          );
        }

        return (
          <div key={key} role="listitem" className={styles.item}>
            {indicatorColumn}
            <div className={styles.content}>{content}</div>
          </div>
        );
      })}
    </div>
  );
}
