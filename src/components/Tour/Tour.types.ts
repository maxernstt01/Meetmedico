import type { ReactNode, RefObject } from 'react';

export type TourPlacement =
  | 'center'
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

export type TourMask = 'none' | 'blur' | 'dimmed';
export type TourType = 'default' | 'primary';
export type TourTarget = RefObject<HTMLElement | null> | (() => HTMLElement | null) | null;

export interface TourActionsRenderProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export interface TourStep {
  title: ReactNode;
  description?: ReactNode;
  target?: TourTarget;
  placement?: TourPlacement;
  mask?: TourMask;
  type?: TourType;
  closable?: boolean;
  showSkip?: boolean;
  nextButtonText?: string;
  prevButtonText?: string;
  actions?: (props: TourActionsRenderProps) => ReactNode;
}

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  current?: number;
  defaultCurrent?: number;
  onChange?: (current: number) => void;
  onClose?: () => void;
  onFinish?: () => void;
  mask?: TourMask;
  type?: TourType;
  closable?: boolean;
  showSkip?: boolean;
  indicatorRender?: (current: number, total: number) => ReactNode;
  className?: string;
}
