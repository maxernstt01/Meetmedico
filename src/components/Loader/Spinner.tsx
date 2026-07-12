import { useId } from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-label'?: string;
}

export function Spinner({
  size = 32,
  strokeWidth = 4,
  className,
  'aria-label': ariaLabel = 'Loading',
}: SpinnerProps) {
  const gradientId = useId();

  return (
    <svg
      className={[styles.spinner, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      role="status"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-600)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--primary-600)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="90 125"
      />
    </svg>
  );
}
