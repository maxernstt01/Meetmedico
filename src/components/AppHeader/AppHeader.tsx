import LogoResponsive from '@/assets/images/Logo Responsive.svg';
import SearchGlyph from '@/assets/icons/Primary Button/Search01Icon.svg?react';
import ArrowLeftGlyph from '@/assets/icons/Primary Button/ArrowLeft02Icon.svg?react';
import styles from './AppHeader.module.css';
import type { AppHeaderProps } from './AppHeader.types';

export function AppHeader({
  variant = 'main',
  onSearch,
  onBack,
  label,
  supportingText,
  action,
  className,
}: AppHeaderProps) {
  const classes = [styles.header, variant === 'back' && styles.back, className]
    .filter(Boolean)
    .join(' ');

  if (variant === 'main') {
    return (
      <div className={classes}>
        <img src={LogoResponsive} alt="Logo" className={styles.logo} />
        <button type="button" className={styles.iconButton} aria-label="Search" onClick={onSearch}>
          <SearchGlyph className={styles.icon} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className={classes}>
      <button type="button" className={styles.iconButton} aria-label="Back" onClick={onBack}>
        <ArrowLeftGlyph className={styles.icon} aria-hidden="true" />
      </button>
      {label && <span className={styles.label}>{label}</span>}
      {supportingText && <span className={styles.supportingText}>{supportingText}</span>}
      {action}
    </div>
  );
}
