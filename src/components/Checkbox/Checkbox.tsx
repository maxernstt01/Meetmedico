import { forwardRef } from 'react';
import TickGlyph from '@/assets/icons/Primary Button/Tick02Icon.svg?react';
import styles from './Checkbox.module.css';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, defaultChecked, onChange, variant = 'line', disabled, label, id, name, value }, ref) => {
    return (
      <label className={styles.wrapper}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className={styles.nativeInput}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className={[styles.box, styles[variant]].filter(Boolean).join(' ')}>
          <TickGlyph className={styles.icon} aria-hidden="true" />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
