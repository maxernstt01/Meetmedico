import styles from './Divider.module.css';
import type { DividerProps } from './Divider.types';

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  length,
  children,
  textAlign = 'center',
  className,
}: DividerProps) {
  const variantClass = variant === 'dotted' ? styles.dotted : variant === 'dash' ? styles.dash : '';

  if (orientation === 'vertical') {
    const classes = [styles.divider, styles.vertical, variantClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={classes}
        style={length !== undefined ? { height: typeof length === 'number' ? `${length}px` : length } : undefined}
      />
    );
  }

  if (children) {
    const alignClass =
      textAlign === 'left'
        ? styles.alignLeft
        : textAlign === 'right'
          ? styles.alignRight
          : styles.alignCenter;
    const classes = [styles.divider, styles.withText, variantClass, alignClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div role="separator" aria-orientation="horizontal" className={classes}>
        <span className={[styles.textSegment, styles.textSegmentBefore].join(' ')} />
        <span className={styles.textLabel}>{children}</span>
        <span className={[styles.textSegment, styles.textSegmentAfter].join(' ')} />
      </div>
    );
  }

  const classes = [styles.divider, styles.horizontal, variantClass, className].filter(Boolean).join(' ');
  return <div role="separator" aria-orientation="horizontal" className={classes} />;
}
