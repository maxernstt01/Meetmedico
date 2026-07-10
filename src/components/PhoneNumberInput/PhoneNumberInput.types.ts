import type { InputHTMLAttributes } from 'react';

export interface PhoneNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  countryCode?: string;
}
