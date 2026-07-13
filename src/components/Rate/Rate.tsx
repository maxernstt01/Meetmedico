import { useState } from 'react';
import StarGlyph from '@/assets/icons/Primary Button/StarIcon.svg?react';
import styles from './Rate.module.css';
import type { RateProps } from './Rate.types';

export function Rate({
  value: valueProp,
  defaultValue = 0,
  onChange,
  count = 5,
  variant = 'outline',
  size = 20,
  allowClear = true,
  disabled = false,
  className,
}: RateProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? valueProp : internalValue;
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  if (variant === 'badge') {
    return (
      <span className={[styles.badge, className].filter(Boolean).join(' ')}>
        <StarGlyph className={styles.badgeIcon} aria-hidden="true" />
        <span className={styles.badgeValue}>{value.toFixed(1)}</span>
      </span>
    );
  }

  const displayValue = hoverValue ?? value;

  const handleClick = (star: number) => {
    if (disabled) return;
    const next = allowClear && value === star ? 0 : star;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <span
      className={[styles.rate, className].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-label="Rating"
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: count }, (_, i) => i + 1).map((star) => {
        const rated = star <= displayValue;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            className={styles.star}
            disabled={disabled}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoverValue(star)}
          >
            <StarGlyph
              className={[
                styles.icon,
                variant === 'filled' ? styles.solidVariant : styles.outlineVariant,
                rated && styles.rated,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ width: size, height: size }}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </span>
  );
}
