import type { ReactNode } from 'react';

export type TooltipPlacement =
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

export interface TooltipProps {
  title?: ReactNode;
  description?: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
  disabled?: boolean;
}
