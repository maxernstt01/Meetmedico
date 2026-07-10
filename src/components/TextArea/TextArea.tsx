import { forwardRef, useEffect, useId, useState } from 'react';
import styles from './TextArea.module.css';
import type { TextAreaProps } from './TextArea.types';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      maxLength = 500,
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
    const [length, setLength] = useState(() => String(value ?? defaultValue ?? '').length);

    useEffect(() => {
      if (value !== undefined) {
        setLength(String(value).length);
      }
    }, [value]);

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
          <textarea
            ref={ref}
            id={inputId}
            className={[styles.nativeTextArea, className].filter(Boolean).join(' ')}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
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
                setLength(event.target.value.length);
              }
              onChange?.(event);
            }}
            {...rest}
          />
        </div>
        <div className={styles.footer}>
          {helperText && <p className={styles.helperText}>{helperText}</p>}
          <span className={styles.counter}>
            {length} / {maxLength} characters
          </span>
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
