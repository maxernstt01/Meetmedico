import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders the label and required star', () => {
    render(<Input label="Label" required />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange and updates the typed value', async () => {
    const onChange = vi.fn();
    render(<Input label="Label" onChange={onChange} />);
    const input = screen.getByLabelText(/label/i);
    await userEvent.type(input, 'Qadir AK');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue('Qadir AK');
  });

  it('shows helper text', () => {
    render(<Input label="Label" helperText="Support Text" />);
    expect(screen.getByText('Support Text')).toBeInTheDocument();
  });

  it('marks the field as invalid when error is set', () => {
    render(<Input label="Label" error helperText="Error helper text" />);
    expect(screen.getByLabelText(/label/i)).toHaveAttribute('aria-invalid', 'true');
  });
});
