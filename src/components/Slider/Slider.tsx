import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import styles from './Slider.module.css';
import type { SliderMark, SliderProps, SliderValue } from './Slider.types';

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function roundTo(val: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(val * factor) / factor;
}

function stepPrecision(step: number | null): number {
  if (!step) return 0;
  const str = String(step);
  const dot = str.indexOf('.');
  return dot === -1 ? 0 : str.length - dot - 1;
}

function snapValue(raw: number, min: number, max: number, step: number | null, marks?: SliderMark[]): number {
  const clamped = clamp(raw, min, max);
  if (step) {
    const snapped = min + Math.round((clamped - min) / step) * step;
    return roundTo(clamp(snapped, min, max), stepPrecision(step));
  }
  if (marks && marks.length > 0) {
    return marks.reduce(
      (closest, mark) => (Math.abs(mark.value - clamped) < Math.abs(closest - clamped) ? mark.value : closest),
      marks[0].value
    );
  }
  return clamped;
}

function toArray(value: SliderValue, range: boolean): number[] {
  if (Array.isArray(value)) return value;
  return range ? [value, value] : [value];
}

export function Slider({
  range = false,
  value: valueProp,
  defaultValue,
  onChange,
  onChangeComplete,
  min = 0,
  max = 100,
  step = 1,
  marks,
  included = true,
  reverse = false,
  direction = 'horizontal',
  disabled = false,
  tooltip = true,
  tooltipFormatter,
  startIcon: StartIcon,
  endIcon: EndIcon,
  className,
}: SliderProps) {
  const isControlled = valueProp !== undefined;
  const resolveDefault = (): SliderValue => {
    if (defaultValue !== undefined) return defaultValue;
    return range ? [min, min] : min;
  };
  const [internalValue, setInternalValue] = useState<SliderValue>(resolveDefault);
  const value = isControlled ? valueProp : internalValue;
  const values = useMemo(() => toArray(value, range), [value, range]);

  const trackRef = useRef<HTMLDivElement>(null);
  const handleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeHandle, setActiveHandle] = useState<number | null>(null);
  const [hoverHandle, setHoverHandle] = useState<number | null>(null);
  const draggingRef = useRef<{ index: number } | null>(null);

  const commit = (next: number[], complete: boolean) => {
    const nextValue: SliderValue = range ? [next[0], next[1]] : next[0];
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
    if (complete) onChangeComplete?.(nextValue);
  };

  const percentToValue = useCallback(
    (percent: number) => {
      const visual = clamp(percent, 0, 1);
      const valuePercent = reverse ? 1 - visual : visual;
      return snapValue(min + valuePercent * (max - min), min, max, step, marks);
    },
    [min, max, step, marks, reverse]
  );

  const valueToVisualPercent = useCallback(
    (val: number) => {
      const valuePercent = (val - min) / (max - min || 1);
      return reverse ? 1 - valuePercent : valuePercent;
    },
    [min, max, reverse]
  );

  const percentFromPointer = (clientX: number, clientY: number): number => {
    const rect = trackRef.current!.getBoundingClientRect();
    if (direction === 'horizontal') {
      return (clientX - rect.left) / rect.width;
    }
    return 1 - (clientY - rect.top) / rect.height;
  };

  const updateFromPointer = (clientX: number, clientY: number, index: number, complete: boolean) => {
    const percent = percentFromPointer(clientX, clientY);
    let nextVal = percentToValue(percent);
    const next = [...values];

    if (range) {
      if (index === 0) nextVal = Math.min(nextVal, next[1]);
      else nextVal = Math.max(nextVal, next[0]);
    }
    next[index] = nextVal;
    commit(next, complete);
  };

  const handlePointerDown = (index: number) => (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore: some environments (synthetic events, certain assistive tools)
      // dispatch pointerdown without a browser-registered active pointer.
    }
    handleRefs.current[index]?.focus();
    draggingRef.current = { index };
    setActiveHandle(index);
    updateFromPointer(e.clientX, e.clientY, index, false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromPointer(e.clientX, e.clientY, draggingRef.current.index, false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromPointer(e.clientX, e.clientY, draggingRef.current.index, true);
    draggingRef.current = null;
    setActiveHandle(null);
  };

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    if (disabled || (e.target as HTMLElement).dataset.handle) return;
    const percent = percentFromPointer(e.clientX, e.clientY);
    const target = percentToValue(percent);
    let index = 0;
    if (range) {
      index = Math.abs(target - values[0]) <= Math.abs(target - values[1]) ? 0 : 1;
    }
    handlePointerDown(index)(e);
  };

  const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
    if (disabled) return;
    const s = step ?? 1;
    const isVertical = direction === 'vertical';
    let delta: number;
    if ((!isVertical && e.key === 'ArrowRight') || (isVertical && e.key === 'ArrowUp')) delta = s;
    else if ((!isVertical && e.key === 'ArrowLeft') || (isVertical && e.key === 'ArrowDown')) delta = -s;
    else if (e.key === 'Home') delta = min - values[index];
    else if (e.key === 'End') delta = max - values[index];
    else return;

    if (reverse) delta = -delta;
    e.preventDefault();
    const next = [...values];
    let nextVal = snapValue(values[index] + delta, min, max, step, marks);
    if (range) {
      nextVal = index === 0 ? Math.min(nextVal, next[1]) : Math.max(nextVal, next[0]);
    }
    next[index] = nextVal;
    commit(next, true);
  };

  const formatTooltip = (val: number) => (tooltipFormatter ? tooltipFormatter(val) : val);

  const handleVisualPercents = values.map(valueToVisualPercent);
  const barStart = range ? Math.min(...handleVisualPercents) : Math.min(reverse ? 1 : 0, handleVisualPercents[0]);
  const barEnd = range ? Math.max(...handleVisualPercents) : Math.max(reverse ? 1 : 0, handleVisualPercents[0]);

  const barStyle =
    direction === 'horizontal'
      ? { left: `${barStart * 100}%`, width: `${(barEnd - barStart) * 100}%` }
      : { bottom: `${barStart * 100}%`, height: `${(barEnd - barStart) * 100}%` };

  const wrapperClasses = [
    styles.slider,
    styles[direction],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {StartIcon && <StartIcon className={styles.icon} aria-hidden="true" />}
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className={styles.rail} />
        {included && <div className={styles.bar} style={barStyle} />}

        {marks?.map((mark) => {
          const percent = valueToVisualPercent(clamp(mark.value, min, max));
          const style = direction === 'horizontal' ? { left: `${percent * 100}%` } : { bottom: `${percent * 100}%` };
          return (
            <Fragment key={mark.value}>
              <span className={styles.markDot} style={style} />
              <span className={styles.markLabel} style={style}>
                {mark.label}
              </span>
            </Fragment>
          );
        })}

        {values.map((val, index) => {
          const percent = valueToVisualPercent(val);
          const style = direction === 'horizontal' ? { left: `${percent * 100}%` } : { bottom: `${percent * 100}%` };
          const showTooltip = tooltip && (activeHandle === index || hoverHandle === index);
          return (
            <div
              key={index}
              ref={(el) => {
                handleRefs.current[index] = el;
              }}
              data-handle="true"
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={val}
              aria-disabled={disabled}
              aria-orientation={direction}
              className={styles.handle}
              style={style}
              onPointerDown={handlePointerDown(index)}
              onPointerEnter={() => setHoverHandle(index)}
              onPointerLeave={() => setHoverHandle(null)}
              onKeyDown={handleKeyDown(index)}
            >
              {showTooltip && <span className={styles.tooltip}>{formatTooltip(val)}</span>}
            </div>
          );
        })}
      </div>
      {EndIcon && <EndIcon className={styles.icon} aria-hidden="true" />}
    </div>
  );
}
