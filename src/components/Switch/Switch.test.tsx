import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with a label and switch role', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('toggles and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch', { name: 'Notifications' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch', { name: 'Notifications' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
  });
});
