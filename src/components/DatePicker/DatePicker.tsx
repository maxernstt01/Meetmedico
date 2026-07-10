import { forwardRef, useId, useRef, useState, type MutableRefObject } from 'react';
import CalendarIcon from '@/assets/icons/Primary Button/Calendar04Icon.svg?react';
import styles from './DatePicker.module.css';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
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
            type="date"
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
            aria-label="Open date picker"
            onClick={() => internalRef.current?.showPicker?.()}
          >
            <CalendarIcon className={styles.icon} aria-hidden="true" />
          </button>
        </div>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
