import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Steps } from './Steps';
import type { StepItem } from './Steps.types';

const items: StepItem[] = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

describe('Steps', () => {
  it('renders all step titles and descriptions', () => {
    render(<Steps items={items} current={1} />);
    expect(screen.getByText('Finished')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Waiting')).toBeInTheDocument();
    expect(screen.getAllByText('This is a content.')).toHaveLength(3);
  });

  it('renders a checkmark icon for finished steps', () => {
    const { container } = render(<Steps items={items} current={1} />);
    const finishedIndicator = container.querySelectorAll('[class*="indicator"][class*="finished"]');
    expect(finishedIndicator.length).toBeGreaterThan(0);
    expect(finishedIndicator[0].querySelector('svg')).toBeInTheDocument();
  });

  it('renders a number for process and wait steps', () => {
    render(<Steps items={items} current={1} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('applies the process title styling to the current step', () => {
    render(<Steps items={items} current={1} />);
    const title = screen.getByText('In Progress');
    expect(title.className).toMatch(/processTitle/);
  });

  it('defaults to horizontal direction', () => {
    const { container } = render(<Steps items={items} current={0} />);
    expect(container.querySelector('[class*="steps"]')?.className).toMatch(/horizontal/);
  });

  it('applies vertical direction when requested', () => {
    const { container } = render(<Steps items={items} current={0} direction="vertical" />);
    expect(container.querySelector('[class*="steps"]')?.className).toMatch(/vertical/);
  });

  it('renders custom icons when provided', () => {
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="custom-step-icon" {...props} />;
    }
    const customItems: StepItem[] = [{ key: 'login', title: 'Login', icon: MockIcon }];
    render(<Steps items={customItems} current={0} />);
    expect(screen.getByTestId('custom-step-icon')).toBeInTheDocument();
  });

  it('shows extra content next to the title', () => {
    const extraItems: StepItem[] = [{ key: 'a', title: 'In Progress', extra: 'Left 00:00:08' }];
    render(<Steps items={extraItems} current={0} />);
    expect(screen.getByText('Left 00:00:08')).toBeInTheDocument();
  });

  it('renders a dot instead of a numbered circle for the dot variant', () => {
    const { container } = render(<Steps items={items} current={1} variant="dot" />);
    expect(container.querySelector('[class*="dot"]')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('calls onChange when a step is clicked', async () => {
    const onChange = vi.fn();
    render(<Steps items={items} current={0} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: /Waiting/ }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('does not render steps as buttons when onChange is not provided', () => {
    render(<Steps items={items} current={0} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies error status styling when an item has status="error"', () => {
    const errorItems: StepItem[] = [
      { key: 'a', title: 'Step A', status: 'error' },
      { key: 'b', title: 'Step B' },
    ];
    render(<Steps items={errorItems} current={0} />);
    expect(screen.getByText('Step A').className).toMatch(/errorTitle/);
  });
});
