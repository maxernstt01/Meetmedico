import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneNumberInput } from './PhoneNumberInput';

describe('PhoneNumberInput', () => {
  it('renders the country code prefix', () => {
    render(<PhoneNumberInput label="Mobile Number" required />);
    expect(screen.getByText('+91')).toBeInTheDocument();
  });

  it('renders a custom country code', () => {
    render(<PhoneNumberInput label="Mobile Number" countryCode="+1" />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('accepts typed digits', async () => {
    render(<PhoneNumberInput label="Mobile Number" />);
    const input = screen.getByLabelText(/mobile number/i);
    await userEvent.type(input, '8836490087');
    expect(input).toHaveValue('8836490087');
  });

  it('marks the field as invalid when error is set', () => {
    render(<PhoneNumberInput label="Mobile Number" error helperText="Error helper text" />);
    expect(screen.getByLabelText(/mobile number/i)).toHaveAttribute('aria-invalid', 'true');
  });
});
