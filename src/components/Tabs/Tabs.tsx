import { useState } from 'react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import styles from './Tabs.module.css';
import type { TabItem, TabsProps } from './Tabs.types';

export function Tabs({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  variant = 'underline',
  className,
}: TabsProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const value = isControlled ? valueProp : internalValue;

  const handleSelect = (item: TabItem) => {
    if (item.disabled) return;
    if (!isControlled) setInternalValue(item.value);
    onChange?.(item.value);
  };

  const containerClasses = [
    styles.tabs,
    variant === 'box' && styles.box,
    variant === 'segment' && styles.segment,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} role="tablist">
      {items.map((item) => {
        const active = item.value === value;
        const Icon = item.icon;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={!item.label ? (item.ariaLabel ?? item.value) : undefined}
            className={[styles.tab, styles[variant], active && styles.active]
              .filter(Boolean)
              .join(' ')}
            disabled={item.disabled}
            onClick={() => handleSelect(item)}
          >
            {Icon && <Icon className={styles.icon} aria-hidden="true" />}
            {item.label && <span>{item.label}</span>}
            {item.showDropdown && <ArrowDownGlyph className={styles.icon} aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
