import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />);
    const el = screen.getByRole('separator');
    expect(el).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders a vertical separator', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies a fixed height for vertical dividers when length is given', () => {
    render(<Divider orientation="vertical" length={40} />);
    expect(screen.getByRole('separator')).toHaveStyle({ height: '40px' });
  });

  it('renders the text label when children are provided', () => {
    render(<Divider>Text</Divider>);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('applies the dotted variant class', () => {
    render(<Divider variant="dotted" />);
    expect(screen.getByRole('separator').className).toMatch(/dotted/);
  });
});
