import type { ComponentType, ReactNode, SVGProps } from 'react';

export type SliderDirection = 'horizontal' | 'vertical';
export type SliderValue = number | [number, number];
export type SliderIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface SliderMark {
  value: number;
  label: ReactNode;
}

export interface SliderProps {
  range?: boolean;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  onChangeComplete?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number | null;
  marks?: SliderMark[];
  included?: boolean;
  reverse?: boolean;
  direction?: SliderDirection;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipFormatter?: (value: number) => ReactNode;
  startIcon?: SliderIcon;
  endIcon?: SliderIcon;
  className?: string;
}
