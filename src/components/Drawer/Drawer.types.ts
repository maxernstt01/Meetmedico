import type { ReactNode } from 'react';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DrawerMask = 'none' | 'blur' | 'dimmed';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  placement?: DrawerPlacement;
  mask?: DrawerMask;
  closable?: boolean;
  footer?: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
}
