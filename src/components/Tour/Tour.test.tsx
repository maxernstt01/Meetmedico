import { useRef } from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tour } from './Tour';
import type { TourStep } from './Tour.types';

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

const steps: TourStep[] = [
  { title: 'Step One', description: 'First description' },
  { title: 'Step Two', description: 'Second description' },
  { title: 'Step Three', description: 'Third description' },
];

describe('Tour', () => {
  it('renders nothing when open is false', () => {
    render(<Tour steps={steps} open={false} />);
    expect(screen.queryByText('Step One')).not.toBeInTheDocument();
  });

  it('renders the current step title and description', () => {
    render(<Tour steps={steps} open />);
    expect(screen.getByText('Step One')).toBeInTheDocument();
    expect(screen.getByText('First description')).toBeInTheDocument();
  });

  it('does not show a Previous button on the first step', () => {
    render(<Tour steps={steps} open />);
    expect(screen.queryByRole('button', { name: 'Previous' })).not.toBeInTheDocument();
  });

  it('advances to the next step and back', async () => {
    const user = userEvent.setup();
    render(<Tour steps={steps} open />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Step Two')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByText('Step One')).toBeInTheDocument();
  });

  it('shows Finish on the last step and calls onFinish + onClose', async () => {
    const onFinish = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Tour steps={steps} open current={2} onFinish={onFinish} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Finish' }));
    expect(onFinish).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('hides the Skip button on the last step', () => {
    render(<Tour steps={steps} open current={2} />);
    expect(screen.queryByRole('button', { name: 'Skip' })).not.toBeInTheDocument();
  });

  it('calls onClose when Skip is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Tour steps={steps} open onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Skip' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides the close button when closable is false', () => {
    render(<Tour steps={steps} open closable={false} />);
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Tour steps={steps} open onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render skip or close when both are disabled (forced completion)', () => {
    render(<Tour steps={steps} open closable={false} showSkip={false} />);
    expect(screen.queryByRole('button', { name: 'Skip' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('renders custom actions when a step provides an actions render function', async () => {
    const customSteps: TourStep[] = [
      {
        title: 'Custom',
        actions: ({ onNext }) => (
          <button type="button" onClick={onNext}>
            Custom Next
          </button>
        ),
      },
    ];
    render(<Tour steps={customSteps} open />);
    expect(screen.getByRole('button', { name: 'Custom Next' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });

  it('renders a custom indicator via indicatorRender', () => {
    render(<Tour steps={steps} open indicatorRender={(current, total) => <span>{`${current + 1} / ${total}`}</span>} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('does not render a mask element when mask is none', () => {
    render(<Tour steps={steps} open mask="none" />);
    expect(document.body.querySelector('[class*="mask"]')).not.toBeInTheDocument();
  });

  it('renders a mask element for dimmed and blur', () => {
    const { unmount } = render(<Tour steps={steps} open mask="dimmed" />);
    expect(document.body.querySelector('[class*="mask"]')).toBeInTheDocument();
    unmount();

    render(<Tour steps={[{ title: 'Blur' }]} open mask="blur" />);
    expect(document.body.querySelector('[class*="mask"]')).toBeInTheDocument();
  });

  it('applies the primary type class to the card', () => {
    render(<Tour steps={steps} open type="primary" />);
    expect(document.body.querySelector('[class*="card"]')?.className).toMatch(/primary/);
  });

  it('scrolls the target element into view and positions relative to it', () => {
    function Harness() {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} type="button">
            Target
          </button>
          <Tour steps={[{ title: 'Targeted step', target: ref }]} open />
        </>
      );
    }
    render(<Harness />);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    expect(screen.getByText('Targeted step')).toBeInTheDocument();
  });
});
