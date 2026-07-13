import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import AlertGlyph from '@/assets/icons/Primary Button/Alert01Icon.svg?react';
import CancelCircleGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import AlertSquareGlyph from '@/assets/icons/Primary Button/AlertSquareIcon.svg?react';
import CheckmarkCircleGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Typography } from '../Typography';
import styles from './Modal.module.css';
import type { ModalProps, ModalType } from './Modal.types';

const iconByType: Partial<Record<ModalType, typeof AlertGlyph>> = {
  info: AlertSquareGlyph,
  success: CheckmarkCircleGlyph,
  warning: AlertGlyph,
  error: CancelCircleGlyph,
  confirm: AlertGlyph,
};

export function Modal({
  open,
  onClose,
  title,
  type = 'default',
  mask = 'dimmed',
  closable = type === 'default',
  footer,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  width = 480,
  centered = true,
  className,
  children,
}: ModalProps) {
  const titleId = useId();
  const isStatusType = type !== 'default';
  const Icon = iconByType[type];

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

  const handleCancel = onCancel ?? onClose;

  const resolvedFooter =
    footer === null ? null : (footer ?? (
      <div className={styles.actions}>
        <Button variant="secondary" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onOk}>
          {okText}
        </Button>
      </div>
    ));

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
        className={[
          styles.panel,
          centered ? styles.centered : styles.top,
          open && styles.panelOpen,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
      >
        {isStatusType ? (
          <div className={[styles.statusBody, styles[type]].join(' ')}>
            <div className={styles.statusHeader}>
              {Icon && <Icon className={styles.statusIcon} aria-hidden="true" />}
              <div className={styles.statusTitleWrap}>
                {title && (
                  <Typography as="h2" variant="h4" id={titleId}>
                    {title}
                  </Typography>
                )}
              </div>
              {closable && (
                <button
                  type="button"
                  className={styles.closeButton}
                  aria-label="Close"
                  onClick={onClose}
                >
                  <CancelGlyph className={styles.closeIcon} aria-hidden="true" />
                </button>
              )}
            </div>
            {children && <div className={styles.statusDescription}>{children}</div>}
            {resolvedFooter && <div className={styles.statusFooter}>{resolvedFooter}</div>}
          </div>
        ) : (
          <>
            <div className={styles.header}>
              {title && (
                <Typography as="h2" variant="h3" id={titleId}>
                  {title}
                </Typography>
              )}
              {closable && (
                <button
                  type="button"
                  className={styles.closeButton}
                  aria-label="Close"
                  onClick={onClose}
                >
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
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
