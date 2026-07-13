import type { ReactNode } from 'react';
import type { TypographyVariant, TypographyWeight } from '../Typography';

export type HeaderAlign = 'left' | 'center';
export type HeaderTagTone = 'neutral' | 'secondary';

export interface HeaderTagItem {
  key: string;
  label: string;
  tone?: HeaderTagTone;
}

export interface HeaderMeta {
  left?: ReactNode;
  right?: ReactNode;
}

export interface HeaderReadMore {
  label?: string;
  onClick?: () => void;
}

export interface HeaderProps {
  eyebrowTags?: HeaderTagItem[];
  belowTags?: HeaderTagItem[];
  title: ReactNode;
  titleVariant?: TypographyVariant;
  titleWeight?: TypographyWeight;
  description?: ReactNode;
  descriptionVariant?: TypographyVariant;
  descriptionWeight?: TypographyWeight;
  descriptionColor?: string;
  readMore?: HeaderReadMore;
  meta?: HeaderMeta;
  align?: HeaderAlign;
  className?: string;
}
