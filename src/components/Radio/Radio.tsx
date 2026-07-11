import { forwardRef } from 'react';
import styles from './Radio.module.css';
import type { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, defaultChecked, onChange, disabled, label, id, name, value }, ref) => {
    return (
      <label className={styles.wrapper}>
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className={styles.nativeInput}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className={styles.circle}>
          <span className={styles.dot} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
