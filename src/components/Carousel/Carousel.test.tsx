import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from './Carousel';

function makeSlides(count = 3) {
  return Array.from({ length: count }, (_, i) => <div key={i}>Slide {i + 1}</div>);
}

describe('Carousel', () => {
  it('renders all slides in the DOM', () => {
    render(<Carousel>{makeSlides()}</Carousel>);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('renders a dot per slide', () => {
    render(<Carousel>{makeSlides(4)}</Carousel>);
    expect(screen.getAllByRole('tab')).toHaveLength(4);
  });

  it('marks the first slide dot as selected by default', () => {
    render(<Carousel>{makeSlides()}</Carousel>);
    expect(screen.getByRole('tab', { name: 'Go to slide 1' })).toHaveAttribute('aria-selected', 'true');
  });

  it('hides arrows when showArrows is false', () => {
    render(<Carousel showArrows={false}>{makeSlides()}</Carousel>);
    expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
  });

  it('hides dots when showDots is false', () => {
    render(<Carousel showDots={false}>{makeSlides()}</Carousel>);
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  it('advances to the next slide when the next arrow is clicked', async () => {
    const onChange = vi.fn();
    render(<Carousel onChange={onChange}>{makeSlides()}</Carousel>);
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(onChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole('tab', { name: 'Go to slide 2' })).toHaveAttribute('aria-selected', 'true');
  });

  it('wraps to the last slide when going previous from the first slide (infinite)', async () => {
    const onChange = vi.fn();
    render(<Carousel onChange={onChange}>{makeSlides(3)}</Carousel>);
    await userEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables the previous arrow on the first slide when not infinite', () => {
    render(<Carousel infinite={false}>{makeSlides()}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  });

  it('jumps to a slide when its dot is clicked', async () => {
    const onChange = vi.fn();
    render(<Carousel onChange={onChange}>{makeSlides()}</Carousel>);
    await userEvent.click(screen.getByRole('tab', { name: 'Go to slide 3' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('respects a controlled current value', () => {
    render(
      <Carousel current={2} onChange={() => {}}>
        {makeSlides()}
      </Carousel>
    );
    expect(screen.getByRole('tab', { name: 'Go to slide 3' })).toHaveAttribute('aria-selected', 'true');
  });

  it('applies the requested dot position class', () => {
    const { container } = render(<Carousel dotPosition="left">{makeSlides()}</Carousel>);
    expect(container.querySelector('[role="tablist"]')?.className).toMatch(/left/);
  });

  it('keeps arrows on the left/right edges when dots are top or bottom', () => {
    render(<Carousel dotPosition="bottom">{makeSlides()}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' }).className).toMatch(/arrowPrev/);
    expect(screen.getByRole('button', { name: 'Next slide' }).className).toMatch(/arrowNext/);
  });

  it('moves arrows to the top/bottom edges when dots are left or right', () => {
    render(<Carousel dotPosition="right">{makeSlides()}</Carousel>);
    expect(screen.getByRole('button', { name: 'Previous slide' }).className).toMatch(/arrowTop/);
    expect(screen.getByRole('button', { name: 'Next slide' }).className).toMatch(/arrowBottom/);
  });
});

describe('Carousel autoplay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('advances automatically after the autoplay interval', () => {
    const onChange = vi.fn();
    render(
      <Carousel autoplay autoplayInterval={1000} onChange={onChange}>
        {makeSlides()}
      </Carousel>
    );
    vi.advanceTimersByTime(1000);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('does not autoplay when autoplay is false', () => {
    const onChange = vi.fn();
    render(
      <Carousel autoplayInterval={1000} onChange={onChange}>
        {makeSlides()}
      </Carousel>
    );
    vi.advanceTimersByTime(5000);
    expect(onChange).not.toHaveBeenCalled();
  });
});
