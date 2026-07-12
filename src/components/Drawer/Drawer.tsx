import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Typography } from '../Typography';
import styles from './Drawer.module.css';
import type { DrawerProps } from './Drawer.types';

export function Drawer({
  open,
  onClose,
  title,
  placement = 'right',
  mask = 'dimmed',
  closable = true,
  footer,
  onSubmit,
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  width,
  height,
  children,
}: DrawerProps) {
  const titleId = useId();
  const isHorizontal = placement === 'left' || placement === 'right';

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const resolvedFooter =
    footer ??
    (onSubmit || onCancel ? (
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {submitText}
        </Button>
      </div>
    ) : null);

  return createPortal(
    <div className={[styles.root, open && styles.rootOpen].filter(Boolean).join(' ')}>
      {mask !== 'none' && (
        <div
          className={[styles.mask, styles[mask], open && styles.maskOpen].filter(Boolean).join(' ')}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        className={[styles.panel, styles[placement], open && styles.panelOpen]
          .filter(Boolean)
          .join(' ')}
        style={isHorizontal ? { width } : { height }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        <div className={styles.header}>
          {title && (
            <Typography as="h2" variant="h3" id={titleId}>
              {title}
            </Typography>
          )}
          {closable && (
            <button type="button" className={styles.closeButton} aria-label="Close" onClick={onClose}>
              <CancelGlyph className={styles.closeIcon} aria-hidden="true" />
            </button>
          )}
        </div>
        <Divider />
        <div className={styles.body}>{children}</div>
        {resolvedFooter && (
          <>
            <Divider />
            <div className={styles.footer}>{resolvedFooter}</div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
