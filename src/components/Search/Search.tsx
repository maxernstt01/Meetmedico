import { useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import SearchGlyph from '@/assets/icons/Primary Button/Search01Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import BellGlyph from '@/assets/icons/Primary Button/BellIcon.svg?react';
import styles from './Search.module.css';
import type { SearchProps, SearchResultItem } from './Search.types';

export function Search({
  value: valueProp,
  defaultValue,
  onChange,
  onClear,
  onSubmit,
  results = [],
  onResultSelect,
  placeholder = 'Search by Location',
  className,
  id,
  disabled,
  onFocus,
  onKeyDown,
  ...rest
}: SearchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const value = isControlled ? (valueProp ?? '') : internalValue;

  const [focused, setFocused] = useState(false);
  const showResults = focused && value.length > 0 && results.length > 0;

  const setValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleClear = () => {
    setValue('');
    onClear?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit?.(value);
    } else if (event.key === 'Escape') {
      setFocused(false);
    }
    onKeyDown?.(event);
  };

  const handleContainerBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const handleResultSelect = (result: SearchResultItem) => {
    onResultSelect?.(result);
    setFocused(false);
  };

  const fieldClasses = [styles.field, focused && styles.focused].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper} ref={containerRef} onBlur={handleContainerBlur}>
      <div className={fieldClasses}>
        <SearchGlyph className={styles.icon} aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          className={[styles.nativeInput, className].filter(Boolean).join(' ')}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onKeyDown={handleKeyDown}
          onChange={(event) => setValue(event.target.value)}
          {...rest}
        />
        {value.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Clear search"
            onClick={handleClear}
          >
            <CancelGlyph className={styles.icon} aria-hidden="true" />
          </button>
        )}
      </div>

      {showResults && (
        <div className={styles.results} role="listbox">
          {results.map((result) => {
            const Icon = result.icon ?? BellGlyph;
            return (
              <button
                key={result.id}
                type="button"
                className={styles.resultItem}
                role="option"
                aria-selected="false"
                onClick={() => handleResultSelect(result)}
              >
                <span className={styles.resultIconFrame}>
                  <Icon className={styles.resultIcon} aria-hidden="true" />
                </span>
                <span className={styles.resultText}>
                  <span className={styles.resultTitle}>{result.title}</span>
                  {result.description && (
                    <span className={styles.resultDescription}>{result.description}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
