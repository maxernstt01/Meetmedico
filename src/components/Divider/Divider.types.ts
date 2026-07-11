import type { ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dotted' | 'dash';
export type DividerTextAlign = 'left' | 'center' | 'right';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  /** Vertical only. Fixed height (number = px, or any CSS length string). Omit to stretch to fill the parent. */
  length?: number | string;
  /** Horizontal only. */
  children?: ReactNode;
  textAlign?: DividerTextAlign;
  className?: string;
}
