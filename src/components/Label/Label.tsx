import styles from './Label.module.css';
import type { LabelProps } from './Label.types';

export function Label({ children, variant = 'neutral', icon: Icon, className, ...rest }: LabelProps) {
  const classes = [styles.label, styles[variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
    </span>
  );
}
