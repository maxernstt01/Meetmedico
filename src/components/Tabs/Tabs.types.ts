import type { ComponentType, SVGProps } from 'react';

export type TabIcon = ComponentType<SVGProps<SVGSVGElement>>;
export type TabsVariant = 'underline' | 'box' | 'segment';

export interface TabItem {
  value: string;
  label?: string;
  icon?: TabIcon;
  showDropdown?: boolean;
  disabled?: boolean;
  /** Accessible name, required when no label is given (icon-only tab). */
  ariaLabel?: string;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  className?: string;
}
