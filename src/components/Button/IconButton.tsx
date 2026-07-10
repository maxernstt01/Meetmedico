import { forwardRef } from 'react';
import styles from './Button.module.css';
import type { IconButtonProps } from './Button.types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, variant = 'primary', className, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], styles.iconButton, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...rest}>
        <Icon className={styles.icon} aria-hidden="true" />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
