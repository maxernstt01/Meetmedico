import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';
import type { NavigationItem } from './Navigation.types';

const horizontalItems: NavigationItem[] = [
  { key: 'home', label: 'Home' },
  {
    key: 'professionals',
    label: 'Professionals',
    children: [
      { key: 'doctors', label: 'Doctors' },
      { key: 'nurses', label: 'Nurses' },
    ],
  },
  { key: 'events', label: 'Events' },
];

const verticalItems: NavigationItem[] = [
  { key: 'one', label: 'Navigation One' },
  {
    key: 'two',
    label: 'Navigation Two',
    children: [
      { key: 'opt1', label: 'Option 1' },
      {
        key: 'submenu',
        label: 'Submenu',
        children: [
          { key: 'sub1', label: 'Sub Option 1' },
          { key: 'sub2', label: 'Sub Option 2' },
        ],
      },
    ],
  },
  { key: 'three', label: 'Navigation Three', disabled: true },
];

describe('Navigation - horizontal', () => {
  it('renders top-level items', () => {
    render(<Navigation items={horizontalItems} mode="horizontal" />);
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Professionals/ })).toBeInTheDocument();
  });

  it('renders dropdown children for items with children', () => {
    render(<Navigation items={horizontalItems} mode="horizontal" />);
    expect(screen.getByRole('menuitem', { name: 'Doctors' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Nurses' })).toBeInTheDocument();
  });

  it('calls onSelect when a top-level item is clicked', async () => {
    const onSelect = vi.fn();
    render(<Navigation items={horizontalItems} mode="horizontal" onSelect={onSelect} />);
    await userEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(onSelect).toHaveBeenCalledWith('home');
  });

  it('marks the active item', () => {
    render(<Navigation items={horizontalItems} mode="horizontal" activeKey="events" onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: 'Events' }).className).toMatch(/hItemActive/);
  });

  it('supports a 3rd-level flyout submenu inside a dropdown item', () => {
    const items: NavigationItem[] = [
      {
        key: 'professionals',
        label: 'Professionals',
        children: [
          {
            key: 'doctors',
            label: 'Doctors',
            children: [
              { key: 'general', label: 'General Physicians' },
              { key: 'specialists', label: 'Specialists' },
            ],
          },
        ],
      },
    ];
    render(<Navigation items={items} mode="horizontal" />);
    expect(screen.getByRole('menuitem', { name: /Doctors/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'General Physicians' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Specialists' })).toBeInTheDocument();
  });
});

describe('Navigation - vertical', () => {
  it('renders top-level items', () => {
    render(<Navigation items={verticalItems} mode="vertical" />);
    expect(screen.getByRole('button', { name: 'Navigation One' })).toBeInTheDocument();
  });

  it('expands a submenu on click', async () => {
    render(<Navigation items={verticalItems} mode="vertical" />);
    const twoBtn = screen.getByRole('button', { name: 'Navigation Two' });
    expect(twoBtn).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(twoBtn);
    expect(twoBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
  });

  it('supports 3 levels of nesting', async () => {
    render(<Navigation items={verticalItems} mode="vertical" defaultOpenKeys={['two', 'submenu']} />);
    expect(screen.getByRole('button', { name: 'Sub Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sub Option 2' })).toBeInTheDocument();
  });

  it('closes sibling submenus in accordion mode', async () => {
    const items: NavigationItem[] = [
      { key: 'a', label: 'A', children: [{ key: 'a1', label: 'A1' }] },
      { key: 'b', label: 'B', children: [{ key: 'b1', label: 'B1' }] },
    ];
    render(<Navigation items={items} mode="vertical" accordion />);
    await userEvent.click(screen.getByRole('button', { name: 'A' }));
    await userEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('accordion mode keeps ancestors open when a nested submenu is expanded', async () => {
    render(<Navigation items={verticalItems} mode="vertical" accordion defaultOpenKeys={['two']} />);
    const twoBtn = screen.getByRole('button', { name: 'Navigation Two' });
    const submenuBtn = screen.getByRole('button', { name: 'Submenu' });
    expect(twoBtn).toHaveAttribute('aria-expanded', 'true');
    expect(submenuBtn).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(submenuBtn);

    expect(twoBtn).toHaveAttribute('aria-expanded', 'true');
    expect(submenuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Sub Option 1' })).toBeInTheDocument();
  });

  it('does not expand or select a disabled item', () => {
    render(<Navigation items={verticalItems} mode="vertical" />);
    expect(screen.getByRole('button', { name: 'Navigation Three' })).toBeDisabled();
  });

  it('renders group labels', () => {
    const items: NavigationItem[] = [
      { key: 'g1', label: 'Group One', type: 'group', children: [{ key: 'g1item', label: 'Grouped Item' }] },
    ];
    render(<Navigation items={items} mode="vertical" />);
    expect(screen.getByText('Group One')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Grouped Item' })).toBeInTheDocument();
  });

  it('toggles collapsed state via the collapse button', async () => {
    const { container } = render(<Navigation items={verticalItems} mode="vertical" collapsible />);
    const toggle = container.querySelector('button');
    expect(toggle).not.toBeNull();
    await userEvent.click(toggle!);
    expect(container.querySelector('nav')?.className).toMatch(/collapsed/);
  });
});
