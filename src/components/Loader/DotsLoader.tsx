import styles from './DotsLoader.module.css';

export interface DotsLoaderProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export function DotsLoader({
  size = 8,
  className,
  'aria-label': ariaLabel = 'Loading',
}: DotsLoaderProps) {
  return (
    <div
      className={[styles.dots, className].filter(Boolean).join(' ')}
      role="status"
      aria-label={ariaLabel}
    >
      <span className={styles.dot} style={{ width: size, height: size }} />
      <span className={styles.dot} style={{ width: size, height: size }} />
      <span className={styles.dot} style={{ width: size, height: size }} />
    </div>
  );
}
