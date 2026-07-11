import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders a native date input with a label', () => {
    render(<DatePicker label="Date" required />);
    const input = screen.getByLabelText(/^date/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders the calendar icon button', () => {
    render(<DatePicker label="Date" />);
    expect(screen.getByRole('button', { name: /open date picker/i })).toBeInTheDocument();
  });

  it('marks the field as invalid when error is set', () => {
    render(<DatePicker label="Date" error helperText="Error helper text" />);
    expect(screen.getByLabelText(/^date/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('range mode: renders From/To date inputs with independent onChange callbacks', () => {
    const onFromChange = vi.fn();
    const onToChange = vi.fn();
    render(
      <DatePicker
        label="Date"
        required
        mode="range"
        onFromChange={onFromChange}
        onToChange={onToChange}
      />
    );

    expect(screen.getByPlaceholderText('From Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('To Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open from date picker/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open to date picker/i })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('From Date'), { target: { value: '2026-01-01' } });
    expect(onFromChange).toHaveBeenCalledWith('2026-01-01');

    fireEvent.change(screen.getByPlaceholderText('To Date'), { target: { value: '2026-01-31' } });
    expect(onToChange).toHaveBeenCalledWith('2026-01-31');
  });
});
