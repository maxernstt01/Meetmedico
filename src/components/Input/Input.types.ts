import type { ComponentType, InputHTMLAttributes, SVGProps } from 'react';

export type InputIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  leftIcon?: InputIcon;
  rightIcon?: InputIcon;
}
