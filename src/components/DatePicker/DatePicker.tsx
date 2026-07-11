import { forwardRef, useId, useRef, useState, type MutableRefObject } from 'react';
import CalendarIcon from '@/assets/icons/Primary Button/Calendar04Icon.svg?react';
import { Divider } from '../Divider';
import styles from './DatePicker.module.css';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      className,
      id,
      onFocus,
      onBlur,
      mode = 'single',
      fromValue,
      fromDefaultValue,
      onFromChange,
      fromPlaceholder = 'From Date',
      toValue,
      toDefaultValue,
      onToChange,
      toPlaceholder = 'To Date',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const internalRef = useRef<HTMLInputElement | null>(null);
    const internalToRef = useRef<HTMLInputElement | null>(null);
    const [focused, setFocused] = useState(false);

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = node;
    };

    const fieldClasses = [styles.field, focused && styles.focused, error && styles.error]
      .filter(Boolean)
      .join(' ');

    if (mode === 'range') {
      const rangeFieldClasses = [
        styles.field,
        styles.range,
        focused && styles.focused,
        error && styles.error,
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div className={styles.wrapper}>
          <div className={rangeFieldClasses}>
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
              placeholder={fromPlaceholder}
              value={fromValue}
              defaultValue={fromDefaultValue}
              aria-invalid={error || undefined}
              onFocus={(event) => {
                setFocused(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setFocused(false);
                onBlur?.(event);
              }}
              onChange={(event) => onFromChange?.(event.target.value)}
            />
            <button
              type="button"
              className={styles.iconButton}
              tabIndex={-1}
              aria-label="Open from date picker"
              onClick={() => internalRef.current?.showPicker?.()}
            >
              <CalendarIcon className={styles.icon} aria-hidden="true" />
            </button>
            <Divider orientation="vertical" />
            <input
              ref={internalToRef}
              type="date"
              className={styles.nativeInput}
              placeholder={toPlaceholder}
              value={toValue}
              defaultValue={toDefaultValue}
              aria-invalid={error || undefined}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(event) => onToChange?.(event.target.value)}
            />
            <button
              type="button"
              className={styles.iconButton}
              tabIndex={-1}
              aria-label="Open to date picker"
              onClick={() => internalToRef.current?.showPicker?.()}
            >
              <CalendarIcon className={styles.icon} aria-hidden="true" />
            </button>
          </div>
          {helperText && <p className={styles.helperText}>{helperText}</p>}
        </div>
      );
    }

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
