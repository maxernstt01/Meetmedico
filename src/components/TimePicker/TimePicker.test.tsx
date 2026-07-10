import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders a native time input with a label', () => {
    render(<TimePicker label="Time" required />);
    const input = screen.getByLabelText(/^time/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'time');
  });

  it('renders the clock icon button', () => {
    render(<TimePicker label="Time" />);
    expect(screen.getByRole('button', { name: /open time picker/i })).toBeInTheDocument();
  });

  it('marks the field as invalid when error is set', () => {
    render(<TimePicker label="Time" error helperText="Error helper text" />);
    expect(screen.getByLabelText(/^time/i)).toHaveAttribute('aria-invalid', 'true');
  });
});
