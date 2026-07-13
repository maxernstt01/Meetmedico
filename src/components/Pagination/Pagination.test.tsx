import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders boundary pages with an ellipsis for a large total', () => {
    render(<Pagination total={102} defaultCurrent={1} boundaryCount={3} siblingCount={1} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '100' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '101' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '102' })).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '50' })).not.toBeInTheDocument();
  });

  it('marks the current page as active', () => {
    render(<Pagination total={10} defaultCurrent={2} />);
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page');
  });

  it('changes page when a number is clicked (uncontrolled)', async () => {
    const onChange = vi.fn();
    render(<Pagination total={10} defaultCurrent={1} onChange={onChange} boundaryCount={3} />);
    await userEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page');
  });

  it('respects a controlled current value', () => {
    render(<Pagination total={10} current={5} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Previous/Next text buttons and disables them at the boundaries', () => {
    render(<Pagination total={5} defaultCurrent={1} prevNext="button" />);
    expect(screen.getByRole('button', { name: /Previous/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next/ })).not.toBeDisabled();
  });

  it('renders icon-only Previous/Next buttons', () => {
    render(<Pagination total={5} defaultCurrent={5} prevNext="icon" />);
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('shows the total range text when showTotal is set', () => {
    render(<Pagination total={3} defaultCurrent={1} pageSize={50} totalItems={109} showTotal />);
    expect(screen.getByText('1-50 out of 109 pages')).toBeInTheDocument();
  });

  it('collapses to a minimal responsive range with small boundary/sibling counts', () => {
    render(<Pagination total={102} defaultCurrent={1} boundaryCount={1} siblingCount={0} />);
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '102' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('defaults to left alignment', () => {
    const { container } = render(<Pagination total={3} />);
    expect(container.querySelector('[class*="wrapper"]')?.className).toMatch(/left/);
  });

  it('applies the requested alignment class', () => {
    const { container } = render(<Pagination total={3} align="center" />);
    expect(container.querySelector('[class*="wrapper"]')?.className).toMatch(/center/);
  });
});
