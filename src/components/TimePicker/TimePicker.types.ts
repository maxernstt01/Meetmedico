import type { InputHTMLAttributes } from 'react';

export interface TimePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
}
