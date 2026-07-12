import styles from './Typography.module.css';
import type { TypographyProps, TypographyVariant, TypographyWeight } from './Typography.types';

const variantTagMap: Record<TypographyVariant, ElementTag> = {
  display: 'h1',
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  body: 'p',
  label: 'span',
  labelCaps: 'span',
  caption: 'span',
};

const defaultWeightMap: Record<TypographyVariant, TypographyWeight> = {
  display: 'extrabold',
  h1: 'extrabold',
  h2: 'bold',
  h3: 'bold',
  h4: 'bold',
  body: 'semibold',
  label: 'bold',
  labelCaps: 'bold',
  caption: 'semibold',
};

type ElementTag = keyof JSX.IntrinsicElements;

export function Typography({
  children,
  variant = 'body',
  weight,
  as,
  color,
  className,
  style,
  ...rest
}: TypographyProps) {
  const Tag = as ?? variantTagMap[variant];
  const resolvedWeight = weight ?? defaultWeightMap[variant];
  const classes = [styles.base, styles[variant], styles[resolvedWeight], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} style={color ? { color, ...style } : style} {...rest}>
      {children}
    </Tag>
  );
}
