import styles from './Badge.module.css';
import type { BadgeProps } from './Badge.types';

export function Badge({ children, variant = 'neutral', icon: Icon, className, ...rest }: BadgeProps) {
  const classes = [styles.badge, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
    </span>
  );
}
