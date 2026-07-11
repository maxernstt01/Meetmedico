import styles from './Tooltip.module.css';
import type { TooltipProps } from './Tooltip.types';

export function Tooltip({
  title,
  description,
  placement = 'top',
  children,
  disabled = false,
}: TooltipProps) {
  if (disabled || (!title && !description)) {
    return <>{children}</>;
  }

  return (
    <span className={styles.wrapper}>
      {children}
      <span className={[styles.tooltip, styles[placement]].filter(Boolean).join(' ')} role="tooltip">
        <span className={styles.arrow} aria-hidden="true" />
        {title && <span className={styles.title}>{title}</span>}
        {description && <span className={styles.description}>{description}</span>}
      </span>
    </span>
  );
}
