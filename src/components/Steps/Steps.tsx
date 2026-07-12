import CheckmarkGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import styles from './Steps.module.css';
import type { StepComputedStatus, StepItem, StepsProps } from './Steps.types';

function getStatus(item: StepItem, index: number, current: number): StepComputedStatus {
  if (item.status === 'error') return 'error';
  if (index < current) return 'finished';
  if (index === current) return 'process';
  return 'wait';
}

function StepIndicator({
  item,
  index,
  status,
  variant,
}: {
  item: StepItem;
  index: number;
  status: StepComputedStatus;
  variant: 'default' | 'dot';
}) {
  if (variant === 'dot') {
    return <span className={[styles.dot, styles[status]].join(' ')} />;
  }

  const Icon = item.icon;

  return (
    <span className={[styles.indicator, styles[status]].join(' ')}>
      {Icon ? (
        <Icon className={styles.customIcon} aria-hidden="true" />
      ) : status === 'finished' ? (
        <CheckmarkGlyph className={styles.statusIcon} aria-hidden="true" />
      ) : status === 'error' ? (
        <CancelGlyph className={styles.statusIcon} aria-hidden="true" />
      ) : (
        <span className={styles.number}>{index + 1}</span>
      )}
    </span>
  );
}

export function Steps({
  items,
  current: currentProp,
  defaultCurrent = 0,
  onChange,
  direction = 'horizontal',
  variant = 'default',
  className,
}: StepsProps) {
  const isControlled = currentProp !== undefined;
  const current = isControlled ? currentProp : defaultCurrent;
  const clickable = !!onChange;

  const wrapperClasses = [styles.steps, styles[direction], variant === 'dot' && styles.dotVariant, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} role="list">
      {items.map((item, index) => {
        const status = getStatus(item, index, current);
        const isLast = index === items.length - 1;
        const passed = index < current;
        const disabled = item.disabled;

        const content = (
          <>
            <div className={styles.indicatorRow}>
              <StepIndicator item={item} index={index} status={status} variant={variant} />
              {!isLast && (
                <span className={[styles.connector, passed && styles.connectorPassed].filter(Boolean).join(' ')} />
              )}
            </div>
            <div className={styles.content}>
              <div className={styles.titleRow}>
                <span className={[styles.title, styles[`${status}Title`]].join(' ')}>{item.title}</span>
                {item.extra && <span className={styles.extra}>{item.extra}</span>}
              </div>
              {item.description && (
                <div className={[styles.description, styles[`${status}Description`]].join(' ')}>
                  {item.description}
                </div>
              )}
            </div>
          </>
        );

        return (
          <div key={item.key} role="listitem" className={styles.step}>
            {clickable ? (
              <button
                type="button"
                className={styles.stepButton}
                disabled={disabled}
                onClick={() => onChange?.(index)}
              >
                {content}
              </button>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
}
