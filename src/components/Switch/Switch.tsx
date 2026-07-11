import { forwardRef } from 'react';
import styles from './Switch.module.css';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, defaultChecked, onChange, disabled, label, id, name }, ref) => {
    return (
      <label className={styles.wrapper}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className={styles.nativeInput}
          onChange={(event) => onChange?.(event.target.checked)}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
