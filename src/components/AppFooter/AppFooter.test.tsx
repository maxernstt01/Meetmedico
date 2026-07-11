import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppFooter } from './AppFooter';

function MockIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg data-testid="footer-icon" {...props} />;
}

const items = [
  { value: 'home', label: 'Home', icon: MockIcon },
  { value: 'records', label: 'My Records', icon: MockIcon },
  { value: 'events', label: 'Events', icon: MockIcon },
];

describe('AppFooter', () => {
  it('renders each item as a tab', () => {
    render(<AppFooter items={items} />);
    expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'My Records' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Events' })).toBeInTheDocument();
  });

  it('defaults to the first item as selected', () => {
    render(<AppFooter items={items} />);
    expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
  });

  it('selects a tab on click and calls onChange', async () => {
    const onChange = vi.fn();
    render(<AppFooter items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Events' }));
    expect(onChange).toHaveBeenCalledWith('events');
    expect(screen.getByRole('tab', { name: 'Events' })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows the home indicator bar by default', () => {
    const { container } = render(<AppFooter items={items} />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('hides the home indicator bar when showHomeIndicator is false', () => {
    const { container } = render(<AppFooter items={items} showHomeIndicator={false} />);
    const indicatorBars = Array.from(container.querySelectorAll('div')).filter((el) =>
      el.className.includes('indicatorBar')
    );
    expect(indicatorBars).toHaveLength(0);
  });
});
