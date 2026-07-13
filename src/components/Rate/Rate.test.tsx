import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Rate } from './Rate';

describe('Rate', () => {
  it('renders 5 stars by default', () => {
    render(<Rate />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('renders a custom star count', () => {
    render(<Rate count={3} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('sets the rating on click (uncontrolled) and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Rate onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Rate 3 stars' }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('radio', { name: 'Rate 3 stars' })).toHaveAttribute('aria-checked', 'true');
  });

  it('respects a controlled value', () => {
    render(<Rate value={4} onChange={() => {}} />);
    expect(screen.getByRole('radio', { name: 'Rate 4 stars' })).toHaveAttribute('aria-checked', 'true');
  });

  it('clears the rating when the same star is clicked again (allowClear)', async () => {
    const onChange = vi.fn();
    render(<Rate defaultValue={3} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Rate 3 stars' }));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('does not clear when allowClear is false', async () => {
    const onChange = vi.fn();
    render(<Rate defaultValue={3} onChange={onChange} allowClear={false} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Rate 3 stars' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not respond to clicks when disabled', async () => {
    const onChange = vi.fn();
    render(<Rate onChange={onChange} disabled />);
    expect(screen.getByRole('radio', { name: 'Rate 3 stars' })).toBeDisabled();
  });

  it('applies the requested icon size', () => {
    render(<Rate size={26} />);
    const icon = screen.getByRole('radio', { name: 'Rate 1 star' }).querySelector('svg');
    expect(icon).toHaveStyle({ width: '26px', height: '26px' });
  });

  it('renders a read-only badge with the formatted value', () => {
    render(<Rate variant="badge" value={3.6} />);
    expect(screen.getByText('3.6')).toBeInTheDocument();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });
});
