import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';

const results = [
  { id: '1', title: 'Search Title', description: 'Notification description sample text.' },
  { id: '2', title: 'Second Result', description: 'Another description.' },
];

describe('Search', () => {
  it('renders the placeholder', () => {
    render(<Search placeholder="Search by Location" />);
    expect(screen.getByPlaceholderText('Search by Location')).toBeInTheDocument();
  });

  it('calls onChange while typing and shows the clear button', async () => {
    const onChange = vi.fn();
    render(<Search onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Token');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clears the value when the clear button is clicked', async () => {
    render(<Search defaultValue="Token News" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveValue('Token News');
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(input).toHaveValue('');
  });

  it('calls onSubmit when Enter is pressed', async () => {
    const onSubmit = vi.fn();
    render(<Search defaultValue="Token News" onSubmit={onSubmit} />);
    await userEvent.type(screen.getByRole('textbox'), '{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('Token News');
  });

  it('shows results when focused with a value, and calls onResultSelect on click', async () => {
    const onResultSelect = vi.fn();
    render(<Search defaultValue="Token News" results={results} onResultSelect={onResultSelect} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    expect(screen.getByText('Search Title')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Search Title'));
    expect(onResultSelect).toHaveBeenCalledWith(results[0]);
  });

  it('does not show results when there is no value', () => {
    render(<Search results={results} />);
    expect(screen.queryByText('Search Title')).not.toBeInTheDocument();
  });
});
