import type { ReactNode } from 'react';

export type ModalType = 'default' | 'info' | 'success' | 'warning' | 'error' | 'confirm';
export type ModalMask = 'none' | 'blur' | 'dimmed';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  type?: ModalType;
  mask?: ModalMask;
  closable?: boolean;
  footer?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  width?: number | string;
  centered?: boolean;
  className?: string;
  children?: ReactNode;
}
