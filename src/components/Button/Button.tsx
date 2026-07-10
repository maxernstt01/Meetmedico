import { forwardRef } from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', leftIcon: LeftIcon, rightIcon: RightIcon, className, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} {...rest}>
        {LeftIcon && <LeftIcon className={styles.icon} aria-hidden="true" />}
        {children}
        {RightIcon && <RightIcon className={styles.icon} aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
