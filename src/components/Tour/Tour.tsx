import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import CancelGlyph from '@/assets/icons/Primary Button/Cancel01Icon.svg?react';
import { Button } from '../Button';
import { Typography } from '../Typography';
import styles from './Tour.module.css';
import type { TourPlacement, TourProps, TourStep, TourTarget } from './Tour.types';

const GAP = 12;
const SPOTLIGHT_PADDING = 4;
const VIEWPORT_MARGIN = 8;

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function clampToViewport(pos: { top: number; left: number }, card: CardSize): { top: number; left: number } {
  const maxLeft = window.innerWidth - card.width - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - card.height - VIEWPORT_MARGIN;
  return {
    left: clampNumber(pos.left, VIEWPORT_MARGIN, Math.max(maxLeft, VIEWPORT_MARGIN)),
    top: clampNumber(pos.top, VIEWPORT_MARGIN, Math.max(maxTop, VIEWPORT_MARGIN)),
  };
}

function resolveTarget(target: TourTarget | undefined): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'function') return target();
  return target.current;
}

interface CardSize {
  width: number;
  height: number;
}

function computeCardPosition(
  targetRect: DOMRect | null,
  placement: TourPlacement,
  card: CardSize
): { top: number; left: number } {
  if (!targetRect || placement === 'center') {
    return {
      top: window.innerHeight / 2 - card.height / 2,
      left: window.innerWidth / 2 - card.width / 2,
    };
  }

  const { top, left, right, bottom, width, height } = targetRect;
  const cx = left + width / 2;
  const cy = top + height / 2;

  switch (placement) {
    case 'top':
      return { top: top - GAP - card.height, left: cx - card.width / 2 };
    case 'topLeft':
      return { top: top - GAP - card.height, left };
    case 'topRight':
      return { top: top - GAP - card.height, left: right - card.width };
    case 'bottom':
      return { top: bottom + GAP, left: cx - card.width / 2 };
    case 'bottomLeft':
      return { top: bottom + GAP, left };
    case 'bottomRight':
      return { top: bottom + GAP, left: right - card.width };
    case 'left':
      return { top: cy - card.height / 2, left: left - GAP - card.width };
    case 'leftTop':
      return { top, left: left - GAP - card.width };
    case 'leftBottom':
      return { top: bottom - card.height, left: left - GAP - card.width };
    case 'right':
      return { top: cy - card.height / 2, left: right + GAP };
    case 'rightTop':
      return { top, left: right + GAP };
    case 'rightBottom':
      return { top: bottom - card.height, left: right + GAP };
    default:
      return { top: bottom + GAP, left: cx - card.width / 2 };
  }
}

function arrowGroup(placement: TourPlacement): string {
  if (placement.startsWith('top')) return 'arrowBottom';
  if (placement.startsWith('bottom')) return 'arrowTop';
  if (placement.startsWith('left')) return 'arrowRight';
  if (placement.startsWith('right')) return 'arrowLeft';
  return '';
}

export function Tour({
  steps,
  open,
  current: currentProp,
  defaultCurrent = 0,
  onChange,
  onClose,
  onFinish,
  mask = 'dimmed',
  type = 'default',
  closable = true,
  showSkip = true,
  indicatorRender,
  className,
}: TourProps) {
  const isControlled = currentProp !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const current = isControlled ? currentProp : internalCurrent;
  const total = steps.length;
  const step: TourStep | undefined = steps[current];

  const cardRef = useRef<HTMLDivElement>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [cardPos, setCardPos] = useState<{ top: number; left: number } | null>(null);
  const [arrowOffset, setArrowOffset] = useState<number | null>(null);

  const resolvedMask = step?.mask ?? mask;
  const resolvedType = step?.type ?? type;
  const resolvedClosable = step?.closable ?? closable;
  const resolvedShowSkip = step?.showSkip ?? showSkip;
  const placement = step?.placement ?? (step?.target ? 'bottom' : 'center');

  const goTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), total - 1);
    if (!isControlled) setInternalCurrent(next);
    onChange?.(next);
  };

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => {
    if (current === total - 1) {
      onFinish?.();
      onClose?.();
    } else {
      goTo(current + 1);
    }
  };
  const handleSkip = () => onClose?.();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !step) return;

    const updateRect = () => {
      const el = resolveTarget(step.target);
      setTargetRect(el ? el.getBoundingClientRect() : null);
    };

    const el = resolveTarget(step.target);
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    updateRect();

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [open, current, step]);

  useLayoutEffect(() => {
    if (!open || !cardRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const rawPosition = computeCardPosition(targetRect, placement, cardRect);
    const clamped = clampToViewport(rawPosition, cardRect);
    setCardPos(clamped);

    if (targetRect && placement !== 'center') {
      const isHorizontalArrow = placement.startsWith('top') || placement.startsWith('bottom');
      if (isHorizontalArrow) {
        const targetCenterX = targetRect.left + targetRect.width / 2;
        setArrowOffset(clampNumber(targetCenterX - clamped.left, 12, cardRect.width - 12));
      } else {
        const targetCenterY = targetRect.top + targetRect.height / 2;
        setArrowOffset(clampNumber(targetCenterY - clamped.top, 12, cardRect.height - 12));
      }
    } else {
      setArrowOffset(null);
    }
  }, [open, targetRect, placement, step]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && resolvedClosable) onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, resolvedClosable, onClose]);

  if (!open || !step) return null;

  const defaultIndicator = (
    <div className={styles.indicators}>
      {steps.map((_, index) => (
        <span
          key={index}
          className={[styles.dot, index === current && styles.dotActive].filter(Boolean).join(' ')}
        />
      ))}
    </div>
  );

  const defaultActions = (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        {indicatorRender ? indicatorRender(current, total) : defaultIndicator}
      </div>
      <div className={styles.footerRight}>
        {resolvedShowSkip && current < total - 1 && (
          <button type="button" className={styles.skipButton} onClick={handleSkip}>
            Skip
          </button>
        )}
        {current > 0 && (
          <Button variant="secondary" onClick={handlePrev}>
            {step.prevButtonText ?? 'Previous'}
          </Button>
        )}
        <Button variant="primary" onClick={handleNext}>
          {current === total - 1 ? (step.nextButtonText ?? 'Finish') : (step.nextButtonText ?? 'Next')}
        </Button>
      </div>
    </div>
  );

  const footer = step.actions
    ? step.actions({ current, total, onPrev: handlePrev, onNext: handleNext, onClose: () => onClose?.() })
    : defaultActions;

  const maskClipPath = targetRect
    ? `path(evenodd, "M0 0 H${window.innerWidth} V${window.innerHeight} H0 Z M${
        targetRect.left - SPOTLIGHT_PADDING
      } ${targetRect.top - SPOTLIGHT_PADDING} H${targetRect.right + SPOTLIGHT_PADDING} V${
        targetRect.bottom + SPOTLIGHT_PADDING
      } H${targetRect.left - SPOTLIGHT_PADDING} Z")`
    : undefined;

  return createPortal(
    <div className={styles.root}>
      {resolvedMask !== 'none' && (
        <div
          className={[styles.mask, styles[resolvedMask]].join(' ')}
          style={maskClipPath ? { clipPath: maskClipPath } : undefined}
        />
      )}
      <div
        ref={cardRef}
        className={[styles.card, styles[resolvedType], targetRect && styles[arrowGroup(placement)], className]
          .filter(Boolean)
          .join(' ')}
        style={
          {
            ...(cardPos ? { top: cardPos.top, left: cardPos.left, opacity: 1 } : { top: 0, left: 0, opacity: 0 }),
            ...(arrowOffset !== null ? { '--arrow-offset': `${arrowOffset}px` } : {}),
          } as CSSProperties
        }
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          <Typography as="span" variant="label" weight="bold" className={styles.title}>
            {step.title}
          </Typography>
          {resolvedClosable && (
            <button type="button" className={styles.closeButton} aria-label="Close" onClick={() => onClose?.()}>
              <CancelGlyph className={styles.closeIcon} aria-hidden="true" />
            </button>
          )}
        </div>
        {step.description && (
          <Typography as="p" variant="caption" weight="regular" className={styles.description}>
            {step.description}
          </Typography>
        )}
        {footer}
      </div>
    </div>,
    document.body
  );
}
