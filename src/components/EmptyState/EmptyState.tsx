import SignalNoGlyph from '@/assets/icons/Primary Button/SignalNo01Icon.svg?react';
import ArchiveGlyph from '@/assets/icons/Primary Button/Archive04Icon.svg?react';
import { Typography } from '../Typography';
import styles from './EmptyState.module.css';
import type { EmptyStateIcon, EmptyStatePreset, EmptyStateProps } from './EmptyState.types';

interface PresetConfig {
  icon?: EmptyStateIcon;
  code?: string;
  title: string;
  description?: string;
}

const presetConfig: Record<EmptyStatePreset, PresetConfig> = {
  noInternet: {
    icon: SignalNoGlyph,
    title: 'No internet connection',
    description: 'Make sure Wi-Fi or cellular data is turned on, then try again.',
  },
  noData: {
    icon: ArchiveGlyph,
    title: 'No Data Found',
  },
  notFound: {
    code: '404',
    title: 'Oops... page not found.',
    description: "We don't know how you ended up here, but you should go away now.",
  },
  serverError: {
    code: '500',
    title: 'Something went wrong on our end.',
    description: "We're working to fix the problem. Please try again shortly.",
  },
  forbidden: {
    code: '403',
    title: "You don't have access to this page.",
    description: 'Contact your administrator if you think this is a mistake.',
  },
};

export function EmptyState({ preset, icon, code, title, description, action, className }: EmptyStateProps) {
  const config = preset ? presetConfig[preset] : undefined;
  const Icon = icon ?? config?.icon;
  const resolvedCode = code ?? config?.code;
  const resolvedTitle = title ?? config?.title;
  const resolvedDescription = description ?? config?.description;
  const isCodeMode = Boolean(resolvedCode);

  return (
    <div
      className={[styles.emptyState, isCodeMode ? styles.codeMode : styles.iconMode, className]
        .filter(Boolean)
        .join(' ')}
    >
      {isCodeMode ? (
        <Typography as="p" variant="display" weight="extrabold" color="var(--primary-600)" className={styles.code}>
          {resolvedCode}
        </Typography>
      ) : (
        Icon && <Icon className={styles.icon} aria-hidden="true" />
      )}
      {resolvedTitle && (
        <Typography
          as="p"
          variant={isCodeMode ? 'body' : 'label'}
          weight={isCodeMode ? 'semibold' : 'regular'}
          color={isCodeMode ? 'var(--neutral-900)' : 'var(--neutral-600)'}
          className={styles.title}
        >
          {resolvedTitle}
        </Typography>
      )}
      {resolvedDescription && (
        <Typography
          as="p"
          variant="label"
          weight="regular"
          color={isCodeMode ? 'var(--neutral-900)' : 'var(--neutral-600)'}
          className={styles.description}
        >
          {resolvedDescription}
        </Typography>
      )}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
