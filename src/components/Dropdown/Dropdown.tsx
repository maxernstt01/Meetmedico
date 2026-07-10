import { useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import ArrowUpGlyph from '@/assets/icons/Primary Button/ArrowUp01Icon.svg?react';
import TickGlyph from '@/assets/icons/Primary Button/Tick02Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import styles from './Dropdown.module.css';
import type { DropdownOption, DropdownProps } from './Dropdown.types';

export function Dropdown({
  label,
  required,
  helperText,
  error,
  variant = 'default',
  mode = 'normal',
  options,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = 'Select Dropdown',
  disabled,
  id,
  showSelectedTags = false,
}: DropdownProps) {
  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
  const value = isControlled ? (valueProp ?? []) : internalValue;

  const [open, setOpen] = useState(false);

  const setValue = (next: string[]) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleToggleOpen = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    if (mode === 'multi') {
      const next = value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue];
      setValue(next);
    } else {
      setValue([optionValue]);
      setOpen(false);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') setOpen(false);
  };

  const selectedOptions = value
    .map((item) => options.find((option) => option.value === item))
    .filter((option): option is DropdownOption => Boolean(option));
  const selectedLabels = selectedOptions.map((option) => option.label);

  const hasValue = selectedLabels.length > 0;
  const triggerText = showSelectedTags || !hasValue
    ? placeholder
    : mode === 'multi' && selectedLabels.length > 2
      ? `${selectedLabels.length} selected`
      : selectedLabels.join(', ');

  const ArrowIcon = open ? ArrowUpGlyph : ArrowDownGlyph;
  const showCheckbox = mode !== 'normal';

  const optionsPanel = open && (
    <div className={styles.panel} role="listbox" aria-multiselectable={mode === 'multi'}>
      {options.map((option) => {
        const checked = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={checked}
            className={styles.option}
            onClick={() => handleSelect(option.value)}
          >
            <span className={styles.optionLabel}>{option.label}</span>
            {showCheckbox && (
              <span
                className={[styles.checkbox, checked && styles.checkboxChecked]
                  .filter(Boolean)
                  .join(' ')}
              >
                <TickGlyph className={styles.tickIcon} aria-hidden="true" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  if (variant === 'tertiary') {
    return (
      <div
        className={styles.wrapper}
        ref={containerRef}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          id={triggerId}
          className={styles.tertiaryTrigger}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={handleToggleOpen}
        >
          {hasValue ? triggerText : label || 'Dropdown'}
          <ArrowIcon className={styles.tertiaryIcon} aria-hidden="true" />
        </button>
        {optionsPanel}
      </div>
    );
  }

  return (
    <div className={styles.wrapper} ref={containerRef} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <div className={[styles.field, open && styles.focused, error && styles.error].filter(Boolean).join(' ')}>
        {label && (
          <span className={styles.label} id={`${triggerId}-label`}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </span>
        )}
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={error || undefined}
          aria-labelledby={label ? `${triggerId}-label ${triggerId}-value` : undefined}
          onClick={handleToggleOpen}
        >
          <span
            id={`${triggerId}-value`}
            className={[styles.triggerText, (showSelectedTags || !hasValue) && styles.placeholder]
              .filter(Boolean)
              .join(' ')}
          >
            {triggerText}
          </span>
          <ArrowIcon className={styles.icon} aria-hidden="true" />
        </button>
      </div>
      {showSelectedTags && selectedOptions.length > 0 && (
        <div className={styles.selectedTags}>
          {selectedOptions.map((option) => (
            <span key={option.value} className={styles.selectedTag}>
              <span className={styles.selectedTagLabel}>{option.label}</span>
              <button
                type="button"
                className={styles.selectedTagRemove}
                aria-label={`Remove ${option.label}`}
                onClick={() => handleSelect(option.value)}
              >
                <CancelGlyph className={styles.selectedTagIcon} aria-hidden="true" />
              </button>
            </span>
          ))}
        </div>
      )}
      {helperText && <p className={styles.helperText}>{helperText}</p>}
      {optionsPanel}
    </div>
  );
}
