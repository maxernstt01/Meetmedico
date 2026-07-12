import type { ReactNode } from 'react';

export type AccordionVariant = 'borderless' | 'bordered';

export interface AccordionItem {
  key: string;
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: AccordionVariant;
  accordion?: boolean;
  activeKeys?: string[];
  defaultActiveKeys?: string[];
  onChange?: (activeKeys: string[]) => void;
  className?: string;
}
