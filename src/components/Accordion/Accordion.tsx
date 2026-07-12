import { useId, useState } from 'react';
import ArrowDownGlyph from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import { Divider } from '../Divider';
import { Typography } from '../Typography';
import styles from './Accordion.module.css';
import type { AccordionItem, AccordionProps } from './Accordion.types';

export function Accordion({
  items,
  variant = 'borderless',
  accordion = false,
  activeKeys: activeKeysProp,
  defaultActiveKeys,
  onChange,
  className,
}: AccordionProps) {
  const baseId = useId();
  const isControlled = activeKeysProp !== undefined;
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(defaultActiveKeys ?? []);
  const activeKeys = isControlled ? activeKeysProp : internalActiveKeys;

  const handleToggle = (item: AccordionItem) => {
    if (item.disabled) return;
    const isOpen = activeKeys.includes(item.key);
    const next = accordion
      ? isOpen
        ? []
        : [item.key]
      : isOpen
        ? activeKeys.filter((key) => key !== item.key)
        : [...activeKeys, item.key];

    if (!isControlled) setInternalActiveKeys(next);
    onChange?.(next);
  };

  return (
    <div className={[styles.accordion, styles[variant], className].filter(Boolean).join(' ')}>
      {items.map((item, index) => {
        const isOpen = activeKeys.includes(item.key);
        const panelId = `${baseId}-${item.key}-panel`;
        const headerId = `${baseId}-${item.key}-header`;

        return (
          <div
            key={item.key}
            className={[styles.item, item.disabled && styles.disabled].filter(Boolean).join(' ')}
          >
            <button
              type="button"
              id={headerId}
              className={styles.header}
              onClick={() => handleToggle(item)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <Typography as="span" variant="label" weight="medium" className={styles.title}>
                {item.title}
              </Typography>
              <ArrowDownGlyph
                className={[styles.icon, isOpen && styles.iconOpen].filter(Boolean).join(' ')}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={[styles.panel, isOpen && styles.panelOpen].filter(Boolean).join(' ')}
            >
              <div className={styles.panelInner}>
                <Typography variant="caption" weight="medium" color="var(--neutral-500)">
                  {item.children}
                </Typography>
              </div>
            </div>
            {variant === 'borderless' && index < items.length - 1 && <Divider />}
          </div>
        );
      })}
    </div>
  );
}
