import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders its text', () => {
    render(<Typography>Hello</Typography>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('defaults to the body variant rendered as a <p>', () => {
    render(<Typography>Body text</Typography>);
    const el = screen.getByText('Body text');
    expect(el.tagName).toBe('P');
    expect(el.className).toMatch(/body/);
    expect(el.className).toMatch(/semibold/);
  });

  it('maps display to <h1> with extrabold weight by default', () => {
    render(<Typography variant="display">Display</Typography>);
    const el = screen.getByText('Display');
    expect(el.tagName).toBe('H1');
    expect(el.className).toMatch(/display/);
    expect(el.className).toMatch(/extrabold/);
  });

  it('offsets heading levels so display and h1 do not both render <h1>', () => {
    render(<Typography variant="h1">Heading</Typography>);
    expect(screen.getByText('Heading').tagName).toBe('H2');
  });

  it('allows overriding the default weight', () => {
    render(
      <Typography variant="h2" weight="semibold">
        Heading 2
      </Typography>
    );
    expect(screen.getByText('Heading 2').className).toMatch(/semibold/);
  });

  it('allows overriding the rendered tag via the as prop', () => {
    render(
      <Typography variant="body" as="span">
        Inline text
      </Typography>
    );
    expect(screen.getByText('Inline text').tagName).toBe('SPAN');
  });

  it('applies uppercase styling for labelCaps', () => {
    render(<Typography variant="labelCaps">Eyebrow</Typography>);
    expect(screen.getByText('Eyebrow').className).toMatch(/labelCaps/);
  });

  it('applies an explicit color when provided', () => {
    render(
      <Typography variant="body" color="var(--error-600)">
        Error text
      </Typography>
    );
    expect(screen.getByText('Error text')).toHaveStyle({ color: 'var(--error-600)' });
  });
});
