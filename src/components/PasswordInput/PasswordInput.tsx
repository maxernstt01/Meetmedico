import { forwardRef, useEffect, useId, useState } from 'react';
import EyeGlyph from '@/assets/icons/Primary Button/EyeIcon.svg?react';
import EyeClosedGlyph from '@/assets/icons/Primary Button/EyeClosedIcon.svg?react';
import CheckmarkCircleGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import { defaultPasswordRules } from './rules';
import styles from './PasswordInput.module.css';
import type { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      showRequirements = false,
      rules = defaultPasswordRules,
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
    const [visible, setVisible] = useState(false);
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = isControlled ? (value ?? '') : internalValue;

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const fieldClasses = [styles.field, focused && styles.focused, error && styles.error]
      .filter(Boolean)
      .join(' ');

    const EyeToggleIcon = visible ? EyeClosedGlyph : EyeGlyph;

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
            ref={ref}
            id={inputId}
            type={visible ? 'text' : 'password'}
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
                setInternalValue(event.target.value);
              }
              onChange?.(event.target.value);
            }}
            {...rest}
          />
          <button
            type="button"
            className={styles.toggleButton}
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((prev) => !prev)}
          >
            <EyeToggleIcon className={styles.icon} aria-hidden="true" />
          </button>
        </div>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
        {showRequirements && (
          <ul className={styles.requirements}>
            {rules.map((rule) => {
              const state =
                currentValue.length === 0 ? 'neutral' : rule.test(currentValue) ? 'valid' : 'invalid';
              return (
                <li
                  key={rule.id}
                  className={[styles.requirement, styles[state]].filter(Boolean).join(' ')}
                >
                  <CheckmarkCircleGlyph className={styles.requirementIcon} aria-hidden="true" />
                  {rule.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
