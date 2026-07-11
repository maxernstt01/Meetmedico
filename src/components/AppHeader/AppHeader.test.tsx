import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  it('main variant: renders logo and a search button', () => {
    render(<AppHeader variant="main" />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('main variant: calls onSearch when the search button is clicked', async () => {
    const onSearch = vi.fn();
    render(<AppHeader variant="main" onSearch={onSearch} />);
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalled();
  });

  it('back variant: renders only the back button when no label/action given', () => {
    render(<AppHeader variant="back" />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
  });

  it('back variant: calls onBack when the back button is clicked', async () => {
    const onBack = vi.fn();
    render(<AppHeader variant="back" onBack={onBack} />);
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(onBack).toHaveBeenCalled();
  });

  it('back variant: renders label and supporting text', () => {
    render(<AppHeader variant="back" label="Label" supportingText="1/3 Steps" />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('1/3 Steps')).toBeInTheDocument();
  });

  it('back variant: renders custom action content', () => {
    render(<AppHeader variant="back" action={<button type="button">Skip To Home</button>} />);
    expect(screen.getByRole('button', { name: 'Skip To Home' })).toBeInTheDocument();
  });
});
