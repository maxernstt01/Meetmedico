import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('renders the label and required star', () => {
    render(<TextArea label="Label" required />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('updates the character counter as the user types', async () => {
    render(<TextArea label="Label" maxLength={500} />);
    expect(screen.getByText('0 / 500 characters')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/label/i), 'Hello');
    expect(screen.getByText('5 / 500 characters')).toBeInTheDocument();
  });

  it('marks the field as invalid when error is set', () => {
    render(<TextArea label="Label" error helperText="Error helper text" />);
    expect(screen.getByLabelText(/label/i)).toHaveAttribute('aria-invalid', 'true');
  });
});
