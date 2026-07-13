import type { ComponentType, ReactNode, SVGProps } from 'react';

export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelinePlacement = 'left' | 'center';
export type TimelineItemStatus = 'default' | 'success' | 'error';
export type TimelineIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface TimelineItem {
  key?: string | number;
  children: ReactNode;
  status?: TimelineItemStatus;
  icon?: TimelineIcon;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  placement?: TimelinePlacement;
  reverse?: boolean;
  pending?: ReactNode;
  className?: string;
}
