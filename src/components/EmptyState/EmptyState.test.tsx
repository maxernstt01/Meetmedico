import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the noInternet preset with icon, title and description', () => {
    const { container } = render(<EmptyState preset="noInternet" />);
    expect(screen.getByText('No internet connection')).toBeInTheDocument();
    expect(
      screen.getByText('Make sure Wi-Fi or cellular data is turned on, then try again.')
    ).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the noData preset without a description', () => {
    render(<EmptyState preset="noData" />);
    expect(screen.getByText('No Data Found')).toBeInTheDocument();
  });

  it('renders the notFound preset in code mode with no icon', () => {
    const { container } = render(<EmptyState preset="notFound" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops... page not found.')).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders the serverError preset', () => {
    render(<EmptyState preset="serverError" />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  it('renders the forbidden preset', () => {
    render(<EmptyState preset="forbidden" />);
    expect(screen.getByText('403')).toBeInTheDocument();
  });

  it('lets explicit props override the preset defaults', () => {
    render(<EmptyState preset="notFound" title="Custom title" code="410" />);
    expect(screen.getByText('410')).toBeInTheDocument();
    expect(screen.getByText('Custom title')).toBeInTheDocument();
    expect(screen.queryByText('404')).not.toBeInTheDocument();
  });

  it('renders a fully custom icon and text without a preset', () => {
    const { container } = render(<EmptyState icon={UserIcon} title="No teammates yet" />);
    expect(screen.getByText('No teammates yet')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the action node when provided', () => {
    render(<EmptyState preset="noData" action={<button type="button">Retry</button>} />);
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('does not render an action wrapper when action is omitted', () => {
    const { container } = render(<EmptyState preset="noData" />);
    expect(container.querySelector('button')).not.toBeInTheDocument();
  });
});
