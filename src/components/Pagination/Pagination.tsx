import { useState } from 'react';
import ArrowLeftGlyph from '@/assets/icons/Primary Button/ArrowLeft02Icon.svg?react';
import ArrowRightGlyph from '@/assets/icons/Primary Button/ArrowRight02Icon.svg?react';
import styles from './Pagination.module.css';
import type { PaginationProps } from './Pagination.types';

type RangeEntry = number | 'ellipsis-start' | 'ellipsis-end';

function range(start: number, end: number): number[] {
  if (end < start) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPaginationRange(
  current: number,
  total: number,
  siblingCount: number,
  boundaryCount: number
): RangeEntry[] {
  if (total <= boundaryCount * 2 + siblingCount * 2 + 1) {
    return range(1, total);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(total - boundaryCount + 1, total);
  const siblingStart = Math.max(current - siblingCount, boundaryCount + 1);
  const siblingEnd = Math.min(current + siblingCount, total - boundaryCount);

  const items: RangeEntry[] = [...startPages];

  if (siblingStart > boundaryCount + 1) {
    items.push('ellipsis-start');
  }

  for (let page = Math.max(siblingStart, boundaryCount + 1); page <= Math.min(siblingEnd, total - boundaryCount); page++) {
    items.push(page);
  }

  if (siblingEnd < total - boundaryCount) {
    items.push('ellipsis-end');
  }

  items.push(...endPages);
  return items;
}

export function Pagination({
  total,
  current: currentProp,
  defaultCurrent = 1,
  onChange,
  showTotal = false,
  totalItems,
  pageSize,
  prevNext = 'none',
  siblingCount = 1,
  boundaryCount = 1,
  className,
}: PaginationProps) {
  const isControlled = currentProp !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const current = isControlled ? currentProp : internalCurrent;

  const handleChange = (page: number) => {
    if (page < 1 || page > total || page === current) return;
    if (!isControlled) setInternalCurrent(page);
    onChange?.(page);
  };

  const items = getPaginationRange(current, total, siblingCount, boundaryCount);

  const rangeStart = pageSize ? (current - 1) * pageSize + 1 : undefined;
  const rangeEnd = pageSize ? Math.min(current * pageSize, totalItems ?? current * pageSize) : undefined;

  const isFirst = current <= 1;
  const isLast = current >= total;

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {showTotal && (
        <span className={styles.total}>
          {rangeStart && rangeEnd
            ? `${rangeStart}-${rangeEnd} out of ${totalItems ?? total} pages`
            : `${total} pages`}
        </span>
      )}
      <nav className={styles.pagination} aria-label="Pagination">
        {prevNext === 'button' && (
          <button
            type="button"
            className={[styles.textButton, isFirst && styles.textButtonDisabled].filter(Boolean).join(' ')}
            disabled={isFirst}
            onClick={() => handleChange(current - 1)}
          >
            <ArrowLeftGlyph className={styles.buttonIcon} aria-hidden="true" />
            <span>Previous</span>
          </button>
        )}
        {prevNext === 'icon' && (
          <button
            type="button"
            className={styles.iconButton}
            disabled={isFirst}
            aria-label="Previous page"
            onClick={() => handleChange(current - 1)}
          >
            <ArrowLeftGlyph className={styles.buttonIcon} aria-hidden="true" />
          </button>
        )}

        {items.map((item, index) => {
          if (item === 'ellipsis-start' || item === 'ellipsis-end') {
            return (
              <span key={item + String(index)} className={styles.ellipsis}>
                ...
              </span>
            );
          }
          const active = item === current;
          return (
            <button
              key={item}
              type="button"
              className={[styles.number, active && styles.numberActive].filter(Boolean).join(' ')}
              aria-current={active ? 'page' : undefined}
              onClick={() => handleChange(item)}
            >
              {item}
            </button>
          );
        })}

        {prevNext === 'button' && (
          <button
            type="button"
            className={[styles.textButton, isLast && styles.textButtonDisabled].filter(Boolean).join(' ')}
            disabled={isLast}
            onClick={() => handleChange(current + 1)}
          >
            <span>Next</span>
            <ArrowRightGlyph className={styles.buttonIcon} aria-hidden="true" />
          </button>
        )}
        {prevNext === 'icon' && (
          <button
            type="button"
            className={styles.iconButton}
            disabled={isLast}
            aria-label="Next page"
            onClick={() => handleChange(current + 1)}
          >
            <ArrowRightGlyph className={styles.buttonIcon} aria-hidden="true" />
          </button>
        )}
      </nav>
    </div>
  );
}
