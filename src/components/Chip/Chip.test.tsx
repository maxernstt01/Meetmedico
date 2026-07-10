import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders as static (non-interactive) when no onClick is given', () => {
    render(<Chip>Default</Chip>);
    expect(screen.getByText('Default').tagName).toBe('SPAN');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as a button and calls onClick when interactive', async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>Default</Chip>);
    await userEvent.click(screen.getByRole('button', { name: 'Default' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('shows a trailing icon when provided', () => {
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="chip-icon" {...props} />;
    }
    render(<Chip icon={MockIcon}>Default</Chip>);
    expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
  });

  it('shows a remove button instead of the icon when selected, and calls onRemove', async () => {
    const onRemove = vi.fn();
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="chip-icon" {...props} />;
    }
    render(
      <Chip icon={MockIcon} selected onClick={() => {}} onRemove={onRemove}>
        Selected
      </Chip>
    );
    expect(screen.queryByTestId('chip-icon')).not.toBeInTheDocument();
    const removeButton = screen.getByRole('button', { name: 'Remove' });
    expect(removeButton).toBeInTheDocument();
    await userEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalled();
  });
});
