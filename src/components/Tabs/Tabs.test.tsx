import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
  { value: 'one', label: 'Meet Medico' },
  { value: 'two', label: 'Second Tab' },
  { value: 'three', label: 'Disabled Tab', disabled: true },
];

describe('Tabs', () => {
  it('renders each item as a tab', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Meet Medico' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Second Tab' })).toBeInTheDocument();
  });

  it('defaults to the first item as selected', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Meet Medico' })).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a tab on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Second Tab' }));
    expect(onChange).toHaveBeenCalledWith('two');
    expect(screen.getByRole('tab', { name: 'Second Tab' })).toHaveAttribute('aria-selected', 'true');
  });

  it('does not select a disabled tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Disabled Tab' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tab', { name: 'Disabled Tab' })).toBeDisabled();
  });

  it('renders an icon-only tab with an accessible name', () => {
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="tab-icon" {...props} />;
    }
    render(<Tabs items={[{ value: 'icon-only', icon: MockIcon, ariaLabel: 'Preview' }]} />);
    expect(screen.getByRole('tab', { name: 'Preview' })).toBeInTheDocument();
    expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
  });

  it('defaults to the underline variant', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'Meet Medico' }).className).toMatch(/underline/);
  });

  it('applies the box variant class', () => {
    render(<Tabs items={items} variant="box" />);
    expect(screen.getByRole('tab', { name: 'Meet Medico' }).className).toMatch(/box/);
  });

  it('applies the segment variant class to the container and tabs', () => {
    render(<Tabs items={items} variant="segment" />);
    expect(screen.getByRole('tablist').className).toMatch(/segment/);
    expect(screen.getByRole('tab', { name: 'Meet Medico' }).className).toMatch(/segment/);
  });
});
