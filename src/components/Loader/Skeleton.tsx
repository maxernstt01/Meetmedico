import styles from './Skeleton.module.css';

export type SkeletonShape = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const defaultSize: Record<SkeletonShape, { width: number | string; height: number | string }> = {
  text: { width: '100%', height: 12 },
  circle: { width: 40, height: 40 },
  rect: { width: '100%', height: 80 },
};

export function Skeleton({ shape = 'rect', width, height, className }: SkeletonProps) {
  const size = defaultSize[shape];

  return (
    <span
      className={[styles.skeleton, styles[shape], className].filter(Boolean).join(' ')}
      style={{ width: width ?? size.width, height: height ?? size.height }}
      role="status"
      aria-label="Loading"
    />
  );
}
