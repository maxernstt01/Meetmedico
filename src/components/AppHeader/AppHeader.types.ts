import type { ReactNode } from 'react';

export type AppHeaderVariant = 'main' | 'back';

export interface AppHeaderProps {
  variant?: AppHeaderVariant;
  /** main variant */
  onSearch?: () => void;
  /** back variant */
  onBack?: () => void;
  label?: ReactNode;
  supportingText?: ReactNode;
  action?: ReactNode;
  className?: string;
}
