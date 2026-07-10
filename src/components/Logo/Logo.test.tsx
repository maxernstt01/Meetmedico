import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders an image', () => {
    render(<Logo />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('switches the source for the responsive variant', () => {
    const { rerender } = render(<Logo variant="default" />);
    const defaultSrc = screen.getByAltText('Logo').getAttribute('src');

    rerender(<Logo variant="responsive" />);
    const responsiveSrc = screen.getByAltText('Logo').getAttribute('src');

    expect(defaultSrc).not.toEqual(responsiveSrc);
  });
});
