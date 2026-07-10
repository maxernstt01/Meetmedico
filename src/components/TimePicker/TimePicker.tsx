import { forwardRef, useId, useRef, useState, type MutableRefObject } from 'react';
import TimeIcon from '@/assets/icons/Primary Button/Time04Icon.svg?react';
import styles from './TimePicker.module.css';
import type { TimePickerProps } from './TimePicker.types';

export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(
  (
    { label, required, helperText, error, className, id, onFocus, onBlur, ...rest },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const internalRef = useRef<HTMLInputElement | null>(null);
    const [focused, setFocused] = useState(false);

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const fieldClasses = [styles.field, focused && styles.focused, error && styles.error]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <div className={fieldClasses}>
          {label && (
            <label className={styles.label} htmlFor={inputId}>
              {label}
              {required && <span className={styles.required}> *</span>}
            </label>
          )}
          <input
            ref={setRefs}
            id={inputId}
            type="time"
            className={[styles.nativeInput, className].filter(Boolean).join(' ')}
            aria-invalid={error || undefined}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            {...rest}
          />
          <button
            type="button"
            className={styles.iconButton}
            tabIndex={-1}
            aria-label="Open time picker"
            onClick={() => internalRef.current?.showPicker?.()}
          >
            <TimeIcon className={styles.icon} aria-hidden="true" />
          </button>
        </div>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';
