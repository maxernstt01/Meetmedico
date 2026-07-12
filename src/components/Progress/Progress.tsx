import CheckmarkGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import styles from './Progress.module.css';
import type { ProgressProps, ProgressSize } from './Progress.types';

const circleDiameter: Record<ProgressSize, number> = {
  default: 120,
  small: 48,
  micro: 20,
};

const circleStrokeWidth: Record<ProgressSize, number> = {
  default: 8,
  small: 6,
  micro: 2,
};

const circleInfoFontSize: Record<ProgressSize, string> = {
  default: 'var(--font-size-title-h3)',
  small: 'var(--font-size-caption)',
  micro: 'var(--font-size-caption)',
};

function renderStatusIcon(status: ProgressProps['status'], sizePx: number) {
  if (status === 'success') {
    return (
      <CheckmarkGlyph
        className={[styles.statusIcon, styles.success].join(' ')}
        style={{ width: sizePx, height: sizePx }}
        aria-hidden="true"
      />
    );
  }
  if (status === 'error') {
    return (
      <CancelGlyph
        className={[styles.statusIcon, styles.error].join(' ')}
        style={{ width: sizePx, height: sizePx }}
        aria-hidden="true"
      />
    );
  }
  return null;
}

export function Progress({
  type = 'line',
  percent,
  status = 'secondary',
  size = 'default',
  showInfo = true,
  info,
  label,
  loading = false,
  strokeWidth,
  fontSize,
  diameter: diameterProp,
  height: heightProp,
  className,
}: ProgressProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const isMicro = size === 'micro';

  if (type === 'circle') {
    const diameter = diameterProp ?? circleDiameter[size];
    const stroke = strokeWidth ?? circleStrokeWidth[size];
    const radius = (diameter - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - clampedPercent / 100);
    const centerIconSize = isMicro ? diameter * 0.7 : diameter * 0.32;
    const circleStatusIcon = renderStatusIcon(status, centerIconSize);
    const circleInfo = info ?? circleStatusIcon ?? `${Math.round(clampedPercent)}%`;

    const circleWrapperClasses = [styles.wrapper, styles.circle, isMicro && styles.micro, className]
      .filter(Boolean)
      .join(' ');

    const circleEl = (
      <div
        className={[styles.circleContainer, loading && styles.spinning].filter(Boolean).join(' ')}
        style={{ width: diameter, height: diameter }}
        role="progressbar"
        aria-valuenow={clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <svg viewBox={`0 0 ${diameter} ${diameter}`} width={diameter} height={diameter}>
          <circle
            className={styles.circleTrack}
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            className={[styles.circleFill, styles[status]].join(' ')}
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={loading ? `${circumference * 0.25} ${circumference}` : circumference}
            strokeDashoffset={loading ? 0 : offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
          />
        </svg>
        {showInfo && !isMicro && (
          <span
            className={[styles.circleInfo, circleStatusIcon ? styles.circleInfoIcon : ''].join(' ')}
            style={{ fontSize: fontSize ?? circleInfoFontSize[size] }}
          >
            {circleInfo}
          </span>
        )}
        {showInfo && isMicro && !loading && circleStatusIcon && (
          <span className={styles.microIcon}>{circleStatusIcon}</span>
        )}
      </div>
    );

    return (
      <div className={circleWrapperClasses}>
        {isMicro ? (
          <>
            {circleEl}
            {label && <span className={styles.label}>{label}</span>}
          </>
        ) : (
          <>
            {label && <span className={styles.label}>{label}</span>}
            {circleEl}
          </>
        )}
      </div>
    );
  }

  const wrapperClasses = [styles.wrapper, styles.line, className].filter(Boolean).join(' ');

  const lineStatusIcon = renderStatusIcon(status, 16);
  const lineInfo = info ?? lineStatusIcon ?? `${Math.round(clampedPercent)}%`;

  return (
    <div className={wrapperClasses}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={[styles.track, styles[size]].join(' ')}
        style={heightProp ? { height: heightProp } : undefined}
        role="progressbar"
        aria-valuenow={clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={[styles.fill, styles[status], loading && styles.pulsing].filter(Boolean).join(' ')}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
      {showInfo && (
        <span className={styles.info} style={fontSize ? { fontSize } : undefined}>
          {lineInfo}
        </span>
      )}
    </div>
  );
}
