import type { ComponentType, ReactNode, SVGProps } from 'react';

export type StepsDirection = 'horizontal' | 'vertical';
export type StepsVariant = 'default' | 'dot';
export type StepItemStatus = 'error';
export type StepComputedStatus = 'wait' | 'process' | 'finished' | 'error';

export interface StepItem {
  key: string;
  title: ReactNode;
  description?: ReactNode;
  extra?: ReactNode;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  status?: StepItemStatus;
  disabled?: boolean;
}

export interface StepsProps {
  items: StepItem[];
  current?: number;
  defaultCurrent?: number;
  onChange?: (index: number) => void;
  direction?: StepsDirection;
  variant?: StepsVariant;
  className?: string;
}
