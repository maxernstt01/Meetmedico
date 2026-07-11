import type { InputHTMLAttributes } from 'react';

export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  mode?: DatePickerMode;
  /** range mode only */
  fromValue?: string;
  fromDefaultValue?: string;
  onFromChange?: (value: string) => void;
  fromPlaceholder?: string;
  toValue?: string;
  toDefaultValue?: string;
  onToChange?: (value: string) => void;
  toPlaceholder?: string;
}
