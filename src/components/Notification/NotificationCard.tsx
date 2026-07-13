import type { ReactNode } from 'react';
import BellGlyph from '@/assets/icons/Primary Button/BellIcon.svg?react';
import AlertGlyph from '@/assets/icons/Primary Button/Alert01Icon.svg?react';
import CancelCircleGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import AlertSquareGlyph from '@/assets/icons/Primary Button/AlertSquareIcon.svg?react';
import CheckmarkCircleGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import { Typography } from '../Typography';
import styles from './NotificationCard.module.css';
import type { NotificationType } from './Notification.types';

const iconByType: Record<NotificationType, typeof BellGlyph> = {
  default: BellGlyph,
  success: CheckmarkCircleGlyph,
  info: AlertSquareGlyph,
  warning: AlertGlyph,
  error: CancelCircleGlyph,
};

export interface NotificationCardProps {
  title: ReactNode;
  description?: ReactNode;
  type?: NotificationType;
  onClose?: () => void;
}

export function NotificationCard({ title, description, type = 'default', onClose }: NotificationCardProps) {
  const Icon = iconByType[type];

  return (
    <div className={[styles.card, styles[type]].join(' ')} role="alert">
      <div className={styles.iconBadge}>
        <Icon className={styles.icon} aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <Typography variant="caption" weight="medium" color="var(--neutral-900)">
          {title}
        </Typography>
        {description && (
          <Typography variant="caption" weight="medium" color="var(--neutral-500)">
            {description}
          </Typography>
        )}
      </div>
      <button type="button" className={styles.closeButton} aria-label="Close" onClick={onClose}>
        <CancelGlyph className={styles.closeIcon} aria-hidden="true" />
      </button>
    </div>
  );
}
