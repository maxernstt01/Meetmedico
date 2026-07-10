import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
