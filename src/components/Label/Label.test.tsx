import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders its text', () => {
    render(<Label>Neutral</Label>);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('defaults to the neutral variant', () => {
    render(<Label>Neutral</Label>);
    expect(screen.getByText('Neutral').className).toMatch(/neutral/);
  });

  it('applies the requested variant', () => {
    render(<Label variant="error">Error</Label>);
    expect(screen.getByText('Error').className).toMatch(/error/);
  });

  it('renders an icon when provided', () => {
    function MockIcon(props: React.SVGProps<SVGSVGElement>) {
      return <svg data-testid="label-icon" {...props} />;
    }
    render(<Label icon={MockIcon}>Neutral</Label>);
    expect(screen.getByTestId('label-icon')).toBeInTheDocument();
  });
});
