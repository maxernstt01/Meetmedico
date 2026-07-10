import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import styles from './Chip.module.css';
import type { ChipProps } from './Chip.types';

export function Chip({
  children,
  icon: Icon,
  selected = false,
  disabled = false,
  onClick,
  onRemove,
  className,
}: ChipProps) {
  const interactive = Boolean(onClick);
  const classes = [
    styles.chip,
    interactive && styles.interactive,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {interactive ? (
        <button type="button" className={styles.label} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      ) : (
        <span className={styles.label}>{children}</span>
      )}
      {selected ? (
        <button
          type="button"
          className={styles.removeButton}
          aria-label="Remove"
          disabled={disabled}
          onClick={onRemove}
        >
          <CancelGlyph className={styles.icon} aria-hidden="true" />
        </button>
      ) : (
        Icon && <Icon className={styles.icon} aria-hidden="true" />
      )}
    </span>
  );
}
