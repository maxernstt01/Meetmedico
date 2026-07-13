import { useEffect, useRef, useState } from 'react';
import ArrowUpGlyph from '@/assets/icons/Primary Button/ArrowUp01Icon.svg?react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import { Typography } from '../Typography';
import { Skeleton } from '../Loader';
import styles from './Statistic.module.css';
import type { StatisticProps } from './Statistic.types';

function inferPrecision(value: number): number {
  const str = String(value);
  const dot = str.indexOf('.');
  return dot === -1 ? 0 : str.length - dot - 1;
}

function formatNumber(num: number, precision: number, groupSeparator: boolean): string {
  const fixed = num.toFixed(precision);
  if (!groupSeparator) return fixed;
  const [intPart, decPart] = fixed.split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
}

export function Statistic({
  title,
  value,
  precision,
  prefix,
  suffix,
  trend,
  icon: Icon,
  iconVariant,
  loading = false,
  animate = true,
  valueColor,
  groupSeparator = true,
  className,
}: StatisticProps) {
  const isNumeric = typeof value === 'number';
  const targetValue = isNumeric ? value : 0;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const prevValueRef = useRef(targetValue);

  useEffect(() => {
    if (!animate || !isNumeric) {
      prevValueRef.current = targetValue;
      return;
    }
    const start = prevValueRef.current;
    const end = targetValue;
    const duration = 1000;
    const startTime = performance.now();
    let frameId: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(start + (end - start) * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        prevValueRef.current = end;
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, animate, isNumeric]);

  const renderedValue = animate && isNumeric ? displayValue : targetValue;
  const effectivePrecision = precision ?? (isNumeric ? inferPrecision(targetValue) : 0);
  const formattedValue = isNumeric
    ? formatNumber(renderedValue, effectivePrecision, groupSeparator)
    : value;

  const trendColor =
    trend === 'up' ? 'var(--sucess-600)' : trend === 'down' ? 'var(--error-600)' : undefined;
  const resolvedColor = valueColor ?? trendColor;
  const TrendIcon = trend === 'up' ? ArrowUpGlyph : trend === 'down' ? ArrowDownGlyph : null;
  const resolvedIconVariant =
    iconVariant ?? (trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'primary');

  const body = (
    <div className={styles.body}>
      {title && (
        <Typography variant="body" weight="regular" color="var(--neutral-600)">
          {title}
        </Typography>
      )}
      {loading ? (
        <Skeleton shape="text" width={120} height={24} />
      ) : (
        <div className={styles.valueRow}>
          {TrendIcon && trend && (
            <TrendIcon className={[styles.trendIcon, styles[trend]].join(' ')} aria-hidden="true" />
          )}
          {prefix && (
            <span className={styles.prefix} style={resolvedColor ? { color: resolvedColor } : undefined}>
              {prefix}
            </span>
          )}
          <Typography as="span" variant="h2" className={styles.value} color={resolvedColor}>
            {formattedValue}
          </Typography>
          {suffix && (
            <span className={styles.suffix} style={resolvedColor ? { color: resolvedColor } : undefined}>
              {suffix}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (Icon) {
    return (
      <div className={[styles.statistic, styles.withIcon, className].filter(Boolean).join(' ')}>
        <div className={[styles.iconBadge, styles[resolvedIconVariant]].join(' ')}>
          <Icon className={styles.iconGlyph} aria-hidden="true" />
        </div>
        {body}
      </div>
    );
  }

  return <div className={[styles.statistic, className].filter(Boolean).join(' ')}>{body}</div>;
}
