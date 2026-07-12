import type { ReactNode } from 'react';
import ChevronRightGlyph from '@/assets/icons/Primary Button/ChevronRightIcon.svg?react';
import styles from './Breadcrumb.module.css';
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types';

type CollapsedEntry = BreadcrumbItem | 'ellipsis';

function collapseItems(items: BreadcrumbItem[], maxItems?: number): CollapsedEntry[] {
  if (!maxItems || items.length <= maxItems) return items;
  const tailCount = Math.max(maxItems - 1, 1);
  const tail = items.slice(items.length - tailCount);
  return [items[0], 'ellipsis', ...tail];
}

function renderLabel(entry: BreadcrumbItem): ReactNode {
  if (entry.href) {
    return (
      <a href={entry.href} className={styles.link} onClick={entry.onClick}>
        {entry.label}
      </a>
    );
  }
  if (entry.onClick) {
    return (
      <button type="button" className={styles.link} onClick={entry.onClick}>
        {entry.label}
      </button>
    );
  }
  return <span className={styles.link}>{entry.label}</span>;
}

export function Breadcrumb({ items, activeColor = 'primary', maxItems, className }: BreadcrumbProps) {
  const visible = collapseItems(items, maxItems);

  return (
    <nav className={[styles.breadcrumb, className].filter(Boolean).join(' ')} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {visible.map((entry, index) => {
          const isLast = index === visible.length - 1;

          if (entry === 'ellipsis') {
            return (
              <li key="ellipsis" className={styles.segment}>
                <span className={styles.ellipsis}>...</span>
                {!isLast && <ChevronRightGlyph className={styles.chevron} aria-hidden="true" />}
              </li>
            );
          }

          return (
            <li key={entry.key} className={styles.segment}>
              {isLast ? (
                <span
                  className={[
                    styles.active,
                    activeColor === 'neutral' ? styles.activeNeutral : styles.activePrimary,
                  ].join(' ')}
                  aria-current="page"
                >
                  {entry.label}
                </span>
              ) : (
                renderLabel(entry)
              )}
              {!isLast && <ChevronRightGlyph className={styles.chevron} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
