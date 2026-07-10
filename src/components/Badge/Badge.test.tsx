import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('defaults to the neutral variant', () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText('Neutral').className).toMatch(/neutral/);
  });

  it('applies the requested variant', () => {
    render(<Badge variant="error">Error</Badge>);
    expect(screen.getByText('Error').className).toMatch(/error/);
  });

  it('renders an icon when provided', () => {
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="badge-icon" {...props} />;
    }
    render(<Badge icon={MockIcon}>Neutral</Badge>);
    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
  });
});
