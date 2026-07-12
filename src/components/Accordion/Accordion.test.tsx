import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';
import type { AccordionItem } from './Accordion.types';

const items: AccordionItem[] = [
  { key: 'a', title: 'Question A', children: 'Answer A' },
  { key: 'b', title: 'Question B', children: 'Answer B' },
  { key: 'c', title: 'Question C', children: 'Answer C', disabled: true },
];

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={items} />);
    expect(screen.getByText('Question A')).toBeInTheDocument();
    expect(screen.getByText('Question B')).toBeInTheDocument();
    expect(screen.getByText('Question C')).toBeInTheDocument();
  });

  it('all panels are collapsed by default', () => {
    render(<Accordion items={items} />);
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('expands a panel when its header is clicked', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Question A' }));
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('allows multiple panels open at once by default', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Question A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Question B' }));
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('closes other panels in accordion mode', async () => {
    render(<Accordion items={items} accordion />);
    await userEvent.click(screen.getByRole('button', { name: 'Question A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Question B' }));
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('does not toggle a disabled item', () => {
    render(<Accordion items={items} />);
    const disabledButton = screen.getByRole('button', { name: 'Question C' });
    expect(disabledButton).toBeDisabled();
    expect(disabledButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onChange with the updated active keys', async () => {
    const onChange = vi.fn();
    render(<Accordion items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Question A' }));
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('respects controlled activeKeys', () => {
    render(<Accordion items={items} activeKeys={['b']} onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
