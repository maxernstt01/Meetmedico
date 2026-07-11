import type { ReactNode } from 'react';

export type CheckboxVariant = 'line' | 'fill';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: CheckboxVariant;
  disabled?: boolean;
  label?: ReactNode;
  id?: string;
  name?: string;
  value?: string;
}
