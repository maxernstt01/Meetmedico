import type { ReactNode } from 'react';

export type CarouselDotPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  dotPosition?: CarouselDotPosition;
  current?: number;
  defaultCurrent?: number;
  onChange?: (index: number) => void;
  infinite?: boolean;
  height?: number | string;
  className?: string;
}
