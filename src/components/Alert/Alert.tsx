import AlertGlyph from '@/assets/icons/Primary Button/Alert01Icon.svg?react';
import CancelCircleGlyph from '@/assets/icons/Primary Button/CancelCircleIcon.svg?react';
import AlertSquareGlyph from '@/assets/icons/Primary Button/AlertSquareIcon.svg?react';
import CheckmarkCircleGlyph from '@/assets/icons/Primary Button/CheckmarkCircle02Icon.svg?react';
import styles from './Alert.module.css';
import type { AlertProps, AlertType } from './Alert.types';

const iconByType: Record<AlertType, typeof AlertGlyph> = {
  warning: AlertGlyph,
  error: CancelCircleGlyph,
  info: AlertSquareGlyph,
  success: CheckmarkCircleGlyph,
};

export function Alert({
  type,
  level = 'primary',
  showIcon = true,
  children,
  className,
  ...rest
}: AlertProps) {
  const Icon = iconByType[type];
  const classes = [styles.alert, styles[level], styles[type], className].filter(Boolean).join(' ');

  return (
    <div role="alert" className={classes} {...rest}>
      {showIcon && <Icon className={styles.icon} aria-hidden="true" />}
      <span className={styles.message}>{children}</span>
    </div>
  );
}
