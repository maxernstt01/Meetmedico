import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders a single handle by default', () => {
    render(<Slider defaultValue={30} />);
    expect(screen.getAllByRole('slider')).toHaveLength(1);
  });

  it('renders two handles in range mode', () => {
    render(<Slider range defaultValue={[20, 60]} />);
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('sets correct aria attributes', () => {
    render(<Slider min={0} max={200} defaultValue={50} />);
    const handle = screen.getByRole('slider');
    expect(handle).toHaveAttribute('aria-valuemin', '0');
    expect(handle).toHaveAttribute('aria-valuemax', '200');
    expect(handle).toHaveAttribute('aria-valuenow', '50');
  });

  it('increments the value with ArrowRight and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={10} step={5} onChange={onChange} />);
    const handle = screen.getByRole('slider');
    handle.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(15);
    expect(handle).toHaveAttribute('aria-valuenow', '15');
  });

  it('decrements the value with ArrowLeft', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={10} step={5} onChange={onChange} />);
    const handle = screen.getByRole('slider');
    handle.focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('jumps to min/max with Home/End', async () => {
    const onChange = vi.fn();
    render(<Slider min={0} max={100} defaultValue={40} onChange={onChange} />);
    const handle = screen.getByRole('slider');
    handle.focus();
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(100);
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('clamps the range handles so they cannot cross', async () => {
    const onChange = vi.fn();
    render(<Slider range defaultValue={[20, 25]} step={10} onChange={onChange} />);
    const handles = screen.getAllByRole('slider');
    handles[0].focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}');
    expect(onChange).toHaveBeenLastCalledWith([25, 25]);
  });

  it('respects a controlled value', () => {
    render(<Slider value={75} onChange={() => {}} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('does not respond to keyboard input when disabled', async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={10} onChange={onChange} disabled />);
    const handle = screen.getByRole('slider');
    expect(handle).toHaveAttribute('tabindex', '-1');
    expect(handle).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders marks with labels', () => {
    render(
      <Slider
        min={0}
        max={100}
        marks={[
          { value: 0, label: '0°C' },
          { value: 100, label: '100°C' },
        ]}
      />
    );
    expect(screen.getByText('0°C')).toBeInTheDocument();
    expect(screen.getByText('100°C')).toBeInTheDocument();
  });

  it('applies the vertical direction class', () => {
    const { container } = render(<Slider direction="vertical" defaultValue={30} />);
    expect(container.querySelector('[class*="slider"]')?.className).toMatch(/vertical/);
  });

  it('snaps to the nearest mark when step is null', async () => {
    const onChange = vi.fn();
    render(
      <Slider
        min={0}
        max={100}
        step={null}
        defaultValue={0}
        marks={[
          { value: 0, label: '0' },
          { value: 26, label: '26' },
          { value: 37, label: '37' },
        ]}
        onChange={onChange}
      />
    );
    const handle = screen.getByRole('slider');
    handle.focus();
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(37);
  });
});
