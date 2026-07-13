import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import { Statistic } from './Statistic';

describe('Statistic', () => {
  it('renders the title and a static value when animate is false', () => {
    render(<Statistic title="Active Users" value={112893} animate={false} />);
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('112,893')).toBeInTheDocument();
  });

  it('formats decimals using an explicit precision', () => {
    render(<Statistic title="Account Balance (CNY)" value={112893} precision={2} animate={false} />);
    expect(screen.getByText('112,893.00')).toBeInTheDocument();
  });

  it('infers precision from a decimal value when precision is not given', () => {
    render(<Statistic title="Active" value={11.28} animate={false} />);
    expect(screen.getByText('11.28')).toBeInTheDocument();
  });

  it('renders without a thousands separator when groupSeparator is false', () => {
    render(<Statistic value={112893} groupSeparator={false} animate={false} />);
    expect(screen.getByText('112893')).toBeInTheDocument();
  });

  it('renders a non-numeric string value as-is', () => {
    render(<Statistic title="Unmerged" value="93 / 100" animate={false} />);
    expect(screen.getByText('93 / 100')).toBeInTheDocument();
  });

  it('renders prefix and suffix content', () => {
    render(<Statistic value={1128} prefix={<span>👍</span>} suffix={<span>votes</span>} animate={false} />);
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('votes')).toBeInTheDocument();
  });

  it('shows a skeleton instead of the value when loading', () => {
    render(<Statistic title="Active Users" value={112893} loading animate={false} />);
    expect(screen.queryByText('112,893')).not.toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders an up-trend value in green with an arrow icon', () => {
    const { container } = render(<Statistic title="Active" value={11.28} suffix="%" trend="up" animate={false} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    const value = screen.getByText('11.28');
    expect(value).toHaveStyle({ color: 'var(--sucess-600)' });
  });

  it('renders a down-trend value in red with an arrow icon', () => {
    render(<Statistic title="Idle" value={9.3} suffix="%" trend="down" animate={false} />);
    const value = screen.getByText('9.3');
    expect(value).toHaveStyle({ color: 'var(--error-600)' });
  });

  it('lets valueColor override the trend color', () => {
    render(<Statistic value={5} trend="up" valueColor="var(--secondary-600)" animate={false} />);
    expect(screen.getByText('5')).toHaveStyle({ color: 'var(--secondary-600)' });
  });

  it('animates from 0 up to the target value by default', async () => {
    render(<Statistic title="Active Users" value={100} />);
    await waitFor(() => expect(screen.getByText('100')).toBeInTheDocument(), { timeout: 2000 });
  });

  it('renders an icon badge when icon is provided', () => {
    const { container } = render(
      <Statistic title="Monthly Active Users" value={93241} icon={UserIcon} animate={false} />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('defaults the icon badge variant to success/error when trend is set', () => {
    const { container } = render(
      <Statistic title="Active" value={11.28} icon={UserIcon} trend="up" animate={false} />
    );
    const badge = container.querySelector('svg')?.parentElement;
    expect(badge?.className).toMatch(/success/);
  });

  it('lets iconVariant override the trend-derived badge color', () => {
    const { container } = render(
      <Statistic title="Active" value={11.28} icon={UserIcon} trend="up" iconVariant="secondary" animate={false} />
    );
    const badge = container.querySelector('svg')?.parentElement;
    expect(badge?.className).toMatch(/secondary/);
  });
});
