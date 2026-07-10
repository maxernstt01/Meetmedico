import logoDefault from '@/assets/images/Logo.svg';
import logoResponsive from '@/assets/images/Logo Responsive.svg';
import styles from './Logo.module.css';

export interface LogoProps {
  variant?: 'default' | 'responsive';
  className?: string;
}

const sources = {
  default: logoDefault,
  responsive: logoResponsive,
};

export function Logo({ variant = 'default', className }: LogoProps) {
  return (
    <img
      src={sources[variant]}
      alt="Logo"
      className={[styles.logo, className].filter(Boolean).join(' ')}
    />
  );
}
