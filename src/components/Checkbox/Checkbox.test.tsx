import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('toggles and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('defaults to the line variant', () => {
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.nextElementSibling?.className).toMatch(/line/);
  });

  it('applies the fill variant class', () => {
    render(<Checkbox label="Accept terms" variant="fill" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.nextElementSibling?.className).toMatch(/fill/);
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Accept terms' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeDisabled();
  });
});
