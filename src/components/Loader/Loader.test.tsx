import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';
import { DotsLoader } from './DotsLoader';
import { Skeleton } from './Skeleton';

describe('Spinner', () => {
  it('renders with a status role and accessible label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('applies the requested size', () => {
    render(<Spinner size={48} />);
    const svg = screen.getByRole('status', { name: 'Loading' });
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });
});

describe('DotsLoader', () => {
  it('renders three dots with a status role', () => {
    const { container } = render(<DotsLoader />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    expect(container.querySelectorAll('span').length).toBe(3);
  });
});

describe('Skeleton', () => {
  it('renders with a status role', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('defaults to rect shape sizing', () => {
    render(<Skeleton />);
    const el = screen.getByRole('status', { name: 'Loading' });
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('80px');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width={120} height={20} />);
    const el = screen.getByRole('status', { name: 'Loading' });
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('20px');
  });

  it('applies the circle shape class', () => {
    render(<Skeleton shape="circle" />);
    expect(screen.getByRole('status', { name: 'Loading' }).className).toMatch(/circle/);
  });
});
