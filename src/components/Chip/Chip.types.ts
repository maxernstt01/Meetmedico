import type { ComponentType, ReactNode, SVGProps } from 'react';

export type ChipIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface ChipProps {
  children: ReactNode;
  icon?: ChipIcon;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}
