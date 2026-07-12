import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb.types';

const items: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'menu1', label: 'Menu1', href: '/menu1' },
  { key: 'menu2', label: 'Menu2', href: '/menu1/menu2' },
  { key: 'menu2b', label: 'Menu2' },
];

describe('Breadcrumb', () => {
  it('renders all item labels', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getAllByText('Menu2').length).toBeGreaterThan(0);
  });

  it('marks the last item as the current page and non-interactive', () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText('Menu2', { selector: '[aria-current="page"]' });
    expect(current).toBeInTheDocument();
    expect(current.tagName).toBe('SPAN');
  });

  it('defaults the active item to primary color', () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText('Menu2', { selector: '[aria-current="page"]' });
    expect(current.className).toMatch(/activePrimary/);
  });

  it('applies the neutral active color when requested', () => {
    render(<Breadcrumb items={items} activeColor="neutral" />);
    const current = screen.getByText('Menu2', { selector: '[aria-current="page"]' });
    expect(current.className).toMatch(/activeNeutral/);
  });

  it('calls onClick for a clickable item', async () => {
    const onClick = vi.fn();
    const clickItems: BreadcrumbItem[] = [
      { key: 'home', label: 'Home', onClick },
      { key: 'current', label: 'Current' },
    ];
    render(<Breadcrumb items={clickItems} />);
    await userEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('collapses middle items into an ellipsis when maxItems is exceeded', () => {
    render(<Breadcrumb items={items} maxItems={2} />);
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.queryByText('Menu1')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('does not collapse when items are within maxItems', () => {
    render(<Breadcrumb items={items} maxItems={10} />);
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});
