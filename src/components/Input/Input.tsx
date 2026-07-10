import { forwardRef, useEffect, useId, useState } from 'react';
import styles from './Input.module.css';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className,
      id,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(() => Boolean(value ?? defaultValue));

    useEffect(() => {
      if (value !== undefined) {
        setHasValue(String(value).length > 0);
      }
    }, [value]);

    const fieldClasses = [
      styles.field,
      focused && styles.focused,
      !focused && hasValue && styles.filled,
      error && styles.error,
    ]
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
          {LeftIcon && <LeftIcon className={styles.icon} aria-hidden="true" />}
          <input
            ref={ref}
            id={inputId}
            className={[styles.nativeInput, className].filter(Boolean).join(' ')}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={error || undefined}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            onChange={(event) => {
              if (value === undefined) {
                setHasValue(event.target.value.length > 0);
              }
              onChange?.(event);
            }}
            {...rest}
          />
          {RightIcon && <RightIcon className={styles.icon} aria-hidden="true" />}
        </div>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
