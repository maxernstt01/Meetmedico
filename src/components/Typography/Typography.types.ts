import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'label'
  | 'labelCaps'
  | 'caption';

export type TypographyWeight = 'extrabold' | 'bold' | 'semibold' | 'medium' | 'regular';

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  children: ReactNode;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  as?: ElementType;
  color?: string;
}
