import type { InputHTMLAttributes } from 'react';

export interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'defaultValue'> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  showRequirements?: boolean;
  rules?: PasswordRule[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}
