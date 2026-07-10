import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OTPInput } from './OTPInput';

describe('OTPInput', () => {
  it('renders the configured number of digit boxes', () => {
    render(<OTPInput length={6} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('auto-advances focus to the next box when typing', async () => {
    render(<OTPInput length={4} />);
    const boxes = screen.getAllByRole('textbox');
    await userEvent.type(boxes[0], '1');
    expect(boxes[1]).toHaveFocus();
  });

  it('moves focus back on backspace from an empty box', async () => {
    render(<OTPInput length={4} />);
    const boxes = screen.getAllByRole('textbox');
    await userEvent.type(boxes[0], '1');
    boxes[1].focus();
    await userEvent.keyboard('{Backspace}');
    expect(boxes[0]).toHaveFocus();
  });

  it('calls onComplete once every box is filled', async () => {
    const onComplete = vi.fn();
    render(<OTPInput length={3} onComplete={onComplete} />);
    const boxes = screen.getAllByRole('textbox');
    await userEvent.type(boxes[0], '1');
    await userEvent.type(boxes[1], '2');
    await userEvent.type(boxes[2], '3');
    expect(onComplete).toHaveBeenCalledWith('123');
  });

  it('shows the countdown text with the configured resend seconds', () => {
    render(<OTPInput resendSeconds={30} />);
    expect(screen.getByText('Request OTP in 00:30s')).toBeInTheDocument();
  });

  it('shows the Resend OTP button once resendSeconds reaches zero, and calls onResend on click', async () => {
    const onResend = vi.fn();
    render(<OTPInput resendSeconds={0} onResend={onResend} />);
    await userEvent.click(screen.getByRole('button', { name: 'Resend OTP' }));
    expect(onResend).toHaveBeenCalled();
  });
});
