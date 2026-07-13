import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import { Timeline } from './Timeline';
import type { TimelineItem } from './Timeline.types';

const items: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01' },
  { key: '2', children: 'Solve initial network problems 2015-09-01' },
  { key: '3', children: 'Technical testing 2015-09-01' },
];

describe('Timeline', () => {
  it('renders every item as a list item', () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Create a services site 2015-09-01')).toBeInTheDocument();
  });

  it('places content in the sideLeft/sideRight columns alternately for center placement', () => {
    const { container } = render(<Timeline items={items} placement="center" />);
    const sideLefts = container.querySelectorAll('[class*="sideLeft"]');
    const sideRights = container.querySelectorAll('[class*="sideRight"]');
    expect(sideLefts[0]?.textContent).toContain('Create a services site');
    expect(sideRights[0]?.textContent).toBe('');
    expect(sideRights[1]?.textContent).toContain('Solve initial network problems');
    expect(sideLefts[1]?.textContent).toBe('');
  });

  it('reverses the item order when reverse is set', () => {
    render(<Timeline items={items} reverse />);
    const rendered = screen.getAllByRole('listitem').map((el) => el.textContent);
    expect(rendered[0]).toContain('Technical testing');
    expect(rendered[2]).toContain('Create a services site');
  });

  it('renders a success icon dot for success status', () => {
    const { container } = render(
      <Timeline items={[{ key: '1', children: 'Done', status: 'success' }]} />
    );
    expect(container.querySelector('[class*="dot"][class*="success"] svg')).toBeInTheDocument();
  });

  it('renders an error icon dot for error status', () => {
    const { container } = render(
      <Timeline items={[{ key: '1', children: 'Failed', status: 'error' }]} />
    );
    expect(container.querySelector('[class*="dot"][class*="error"] svg')).toBeInTheDocument();
  });

  it('renders a custom icon inside the dot when provided', () => {
    const { container } = render(
      <Timeline items={[{ key: '1', children: 'Custom', icon: UserIcon }]} />
    );
    expect(container.querySelector('[class*="dotWithIcon"] svg')).toBeInTheDocument();
  });

  it('appends a pending item with a spinner dot at the end by default', () => {
    const { container } = render(<Timeline items={items} pending="Recording..." />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
    expect(listItems[3].textContent).toBe('Recording...');
    expect(container.querySelector('[class*="spinnerDot"]')).toBeInTheDocument();
  });

  it('prepends the pending item when reverse is set', () => {
    render(<Timeline items={items} pending="Recording..." reverse />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('Recording...');
  });

  it('applies the horizontal orientation class', () => {
    const { container } = render(<Timeline items={items} orientation="horizontal" />);
    expect(container.querySelector('[class*="timeline"][class*="horizontal"]')).toBeInTheDocument();
  });
});
