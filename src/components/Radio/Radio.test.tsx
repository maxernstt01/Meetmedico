import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with a label', () => {
    render(<Radio label="Option A" name="group" />);
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
  });

  it('selects and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Radio label="Option A" name="group" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('only one radio in a group can be selected', async () => {
    render(
      <>
        <Radio label="Option A" name="group" />
        <Radio label="Option B" name="group" />
      </>
    );
    const optionA = screen.getByRole('radio', { name: 'Option A' });
    const optionB = screen.getByRole('radio', { name: 'Option B' });

    await userEvent.click(optionA);
    expect(optionA).toBeChecked();
    expect(optionB).not.toBeChecked();

    await userEvent.click(optionB);
    expect(optionA).not.toBeChecked();
    expect(optionB).toBeChecked();
  });

  it('does not fire onChange when disabled', async () => {
    const onChange = vi.fn();
    render(<Radio label="Option A" name="group" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'Option A' })).toBeDisabled();
  });
});
