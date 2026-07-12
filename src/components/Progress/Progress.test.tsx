import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a line progress bar with role progressbar', () => {
    render(<Progress percent={40} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '40');
  });

  it('shows the percent text by default', () => {
    render(<Progress percent={40} />);
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('clamps percent above 100', () => {
    render(<Progress percent={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps percent below 0', () => {
    render(<Progress percent={-20} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders a custom label before the bar', () => {
    render(<Progress percent={50} label="Task In Progress" />);
    expect(screen.getByText('Task In Progress')).toBeInTheDocument();
  });

  it('renders custom info content instead of the percent', () => {
    render(<Progress percent={50} info="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('hides the info section when showInfo is false', () => {
    render(<Progress percent={50} showInfo={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('renders a circle progress bar', () => {
    render(<Progress type="circle" percent={68} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '68');
    expect(screen.getByText('68%')).toBeInTheDocument();
  });

  it('applies a custom diameter to the circle svg', () => {
    render(<Progress type="circle" percent={68} diameter={80} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveStyle({ width: '80px', height: '80px' });
  });

  it('applies a custom height to the line track', () => {
    const { container } = render(<Progress percent={40} height={20} />);
    const track = container.querySelector('[role="progressbar"]');
    expect(track).toHaveStyle({ height: '20px' });
  });

  it('applies a custom strokeWidth to the circle', () => {
    render(<Progress type="circle" percent={50} strokeWidth={12} />);
    const circles = document.querySelectorAll('circle');
    circles.forEach((c) => expect(c).toHaveAttribute('stroke-width', '12'));
  });
});
