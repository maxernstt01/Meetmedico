import { Typography } from '../Typography';
import styles from './Header.module.css';
import type { HeaderProps, HeaderTagItem } from './Header.types';

function TagRow({ tags }: { tags: HeaderTagItem[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span
          key={tag.key}
          className={[styles.tag, tag.tone === 'secondary' && styles.tagSecondary].filter(Boolean).join(' ')}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export function Header({
  eyebrowTags,
  belowTags,
  title,
  titleVariant = 'h2',
  titleWeight = 'bold',
  description,
  descriptionVariant = 'label',
  descriptionWeight,
  descriptionColor = 'var(--neutral-600)',
  readMore,
  meta,
  align = 'left',
  className,
}: HeaderProps) {
  return (
    <div className={[styles.header, styles[align], className].filter(Boolean).join(' ')}>
      {eyebrowTags && eyebrowTags.length > 0 && <TagRow tags={eyebrowTags} />}

      <Typography as="div" variant={titleVariant} weight={titleWeight} className={styles.title}>
        {title}
      </Typography>

      {description && (
        <Typography
          as="p"
          variant={descriptionVariant}
          weight={descriptionWeight}
          color={descriptionColor}
          className={styles.description}
        >
          {description}
          {readMore && (
            <button type="button" className={styles.readMore} onClick={readMore.onClick}>
              {readMore.label ?? 'Read More'}
            </button>
          )}
        </Typography>
      )}

      {belowTags && belowTags.length > 0 && <TagRow tags={belowTags} />}

      {meta && (meta.left || meta.right) && (
        <div className={styles.meta}>
          <Typography
            as="span"
            variant="caption"
            weight="semibold"
            color="var(--neutral-600)"
            className={styles.metaLeft}
          >
            {meta.left}
          </Typography>
          <Typography as="span" variant="caption" weight="medium" color="var(--neutral-500)">
            {meta.right}
          </Typography>
        </div>
      )}
    </div>
  );
}
