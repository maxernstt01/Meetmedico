import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders the message', () => {
    render(<Alert type="warning">Warning message</Alert>);
    expect(screen.getByText('Warning message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('defaults to the primary level', () => {
    render(<Alert type="error">Error message</Alert>);
    expect(screen.getByRole('alert').className).toMatch(/primary/);
  });

  it('applies the requested level and type classes', () => {
    render(
      <Alert type="success" level="secondary">
        Success message
      </Alert>
    );
    const alert = screen.getByRole('alert');
    expect(alert.className).toMatch(/secondary/);
    expect(alert.className).toMatch(/success/);
  });

  it('shows the type icon by default', () => {
    render(<Alert type="info">Info message</Alert>);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('hides the icon when showIcon is false', () => {
    render(
      <Alert type="info" showIcon={false}>
        Info message
      </Alert>
    );
    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });
});
