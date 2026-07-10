import type { ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error';
export type IconButtonVariant = 'primary' | 'secondary';
export type ButtonIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ButtonIcon;
  rightIcon?: ButtonIcon;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ButtonIcon;
  variant?: IconButtonVariant;
  'aria-label': string;
}
