import { Children, useEffect, useRef, useState } from 'react';
import ArrowLeftGlyph from '@/assets/icons/Primary Button/ArrowLeft02Icon.svg?react';
import ArrowRightGlyph from '@/assets/icons/Primary Button/ArrowRight02Icon.svg?react';
import styles from './Carousel.module.css';
import type { CarouselProps } from './Carousel.types';

export function Carousel({
  children,
  autoplay = false,
  autoplayInterval = 3000,
  showArrows = true,
  showDots = true,
  dotPosition = 'bottom',
  current: currentProp,
  defaultCurrent = 0,
  onChange,
  infinite = true,
  height = 240,
  className,
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;

  const isControlled = currentProp !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const current = isControlled ? currentProp : internalCurrent;

  const goTo = (index: number) => {
    const next = infinite
      ? ((index % count) + count) % count
      : Math.min(Math.max(index, 0), count - 1);
    if (!isControlled) setInternalCurrent(next);
    onChange?.(next);
  };

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoplay || isHovering || count <= 1) return;
    timerRef.current = setInterval(() => {
      goTo(current + 1);
    }, autoplayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, isHovering, autoplayInterval, current, count]);

  const isVerticalDots = dotPosition === 'left' || dotPosition === 'right';
  const canGoPrev = infinite || current > 0;
  const canGoNext = infinite || current < count - 1;

  return (
    <div
      className={[styles.carousel, className].filter(Boolean).join(' ')}
      style={{ height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide} aria-hidden={index !== current}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            className={[styles.arrow, isVerticalDots ? styles.arrowTop : styles.arrowPrev].join(' ')}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous slide"
          >
            <ArrowLeftGlyph
              className={[styles.arrowIcon, isVerticalDots && styles.arrowIconRotated]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            className={[styles.arrow, isVerticalDots ? styles.arrowBottom : styles.arrowNext].join(' ')}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next slide"
          >
            <ArrowRightGlyph
              className={[styles.arrowIcon, isVerticalDots && styles.arrowIconRotated]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div
          className={[styles.dots, styles[dotPosition], isVerticalDots && styles.dotsVertical]
            .filter(Boolean)
            .join(' ')}
          role="tablist"
          aria-label="Slide navigation"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              className={[styles.dot, index === current && styles.dotActive].filter(Boolean).join(' ')}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
