import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('renders as a masked password field by default', () => {
    render(<PasswordInput label="Password" required />);
    expect(screen.getByLabelText(/^password/i)).toHaveAttribute('type', 'password');
  });

  it('toggles visibility when the eye icon is clicked', async () => {
    render(<PasswordInput label="Password" required />);
    const input = screen.getByLabelText(/^password/i);
    const toggle = screen.getByRole('button', { name: 'Show password' });

    await userEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('does not show the requirements checklist unless showRequirements is set', () => {
    render(<PasswordInput label="Password" />);
    expect(screen.queryByText(/8 Character/)).not.toBeInTheDocument();
  });

  it('live-validates each rule as the user types', async () => {
    render(<PasswordInput label="Password" showRequirements />);
    const input = screen.getByLabelText(/^password/i);

    const lengthRule = screen.getByText('Password Must have 8 Character');
    expect(lengthRule.className).not.toMatch(/valid|invalid/);

    await userEvent.type(input, 'short');
    expect(lengthRule.className).toMatch(/invalid/);

    await userEvent.type(input, '1Aa!');
    expect(screen.getByText('Password Must have 8 Character').className).toMatch(/valid/);
    expect(screen.getByText('Password Must have 1 small Letter').className).toMatch(/valid/);
    expect(screen.getByText('Password Must have 1 Capital Letter').className).toMatch(/valid/);
    expect(screen.getByText('Password Must have 1 Special Character').className).toMatch(/valid/);
    expect(screen.getByText('Password Must have 1 Number').className).toMatch(/valid/);
  });
});
