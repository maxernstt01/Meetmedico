import { useState } from 'react';
import styles from './AppFooter.module.css';
import type { AppFooterItem, AppFooterProps } from './AppFooter.types';

export function AppFooter({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  showHomeIndicator = true,
  className,
}: AppFooterProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value);
  const value = isControlled ? valueProp : internalValue;

  const handleSelect = (item: AppFooterItem) => {
    if (!isControlled) setInternalValue(item.value);
    onChange?.(item.value);
  };

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.bar} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          const Icon = item.icon;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              className={[styles.tab, active && styles.active].filter(Boolean).join(' ')}
              onClick={() => handleSelect(item)}
            >
              <Icon className={styles.icon} aria-hidden="true" />
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
      {showHomeIndicator && (
        <div className={styles.indicatorBar} aria-hidden="true">
          <div className={styles.indicator} />
        </div>
      )}
    </div>
  );
}
