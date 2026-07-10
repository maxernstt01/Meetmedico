import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Dropdown', () => {
  it('renders the label and placeholder, options hidden until opened', () => {
    render(<Dropdown label="Dropdown" required options={options} />);
    expect(screen.getByText('Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Select Dropdown')).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 1' })).not.toBeInTheDocument();
  });

  it('opens the panel on trigger click and shows all options', async () => {
    render(<Dropdown label="Dropdown" options={options} />);
    await userEvent.click(screen.getByRole('button', { name: /select dropdown/i }));
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('normal mode: selecting an option closes the panel and updates the trigger text', async () => {
    const onChange = vi.fn();
    render(<Dropdown label="Dropdown" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /select dropdown/i }));
    await userEvent.click(screen.getByRole('option', { name: 'Option 2' }));
    expect(onChange).toHaveBeenCalledWith(['2']);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Option 1' })).not.toBeInTheDocument();
  });

  it('multi mode: selecting options keeps the panel open and accumulates values', async () => {
    const onChange = vi.fn();
    render(<Dropdown label="Dropdown" mode="multi" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /select dropdown/i }));
    await userEvent.click(screen.getByRole('option', { name: 'Option 1' }));
    expect(onChange).toHaveBeenLastCalledWith(['1']);
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('option', { name: 'Option 2' }));
    expect(onChange).toHaveBeenLastCalledWith(['1', '2']);
  });

  it('showSelectedTags: trigger always shows the placeholder, selections render as removable tags', async () => {
    const onChange = vi.fn();
    render(
      <Dropdown
        label="Dropdown"
        mode="multi"
        showSelectedTags
        defaultValue={['1', '2']}
        options={options}
        onChange={onChange}
      />
    );
    expect(screen.getByText('Select Dropdown')).toBeInTheDocument();
    const tag1 = screen.getByText('Option 1');
    const tag2 = screen.getByText('Option 2');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Remove Option 1' }));
    expect(onChange).toHaveBeenCalledWith(['2']);
  });

  it('tertiary variant renders a text-link trigger', async () => {
    render(<Dropdown variant="tertiary" label="Dropdown" options={options} />);
    const trigger = screen.getByRole('button', { name: 'Dropdown' });
    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
  });
});
