import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  it('renders the title', () => {
    render(<Header title="Account Rejected" />);
    expect(screen.getByText('Account Rejected')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<Header title="Account Rejected" description="Your profile has been reviewed." />);
    expect(screen.getByText('Your profile has been reviewed.')).toBeInTheDocument();
  });

  it('renders eyebrow tags above the title', () => {
    const { container } = render(
      <Header
        title="Workshop"
        eyebrowTags={[
          { key: 'category', label: 'Category' },
          { key: 'tag', label: 'Tag' },
        ]}
      />
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Tag')).toBeInTheDocument();
    const tagsRow = container.querySelector('[class*="tags"]');
    expect(tagsRow?.compareDocumentPosition(screen.getByText('Workshop')) as number).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('renders below tags after the description', () => {
    render(
      <Header
        title="Dr. Thangavelu. S"
        description="Mumbai, India"
        belowTags={[
          { key: 'english', label: 'English' },
          { key: 'hindi', label: 'Hindi' },
        ]}
      />
    );
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Hindi')).toBeInTheDocument();
  });

  it('applies the secondary tone to a tag', () => {
    render(
      <Header title="Discover" eyebrowTags={[{ key: 'verified', label: 'Certified & Verified', tone: 'secondary' }]} />
    );
    expect(screen.getByText('Certified & Verified').className).toMatch(/tagSecondary/);
  });

  it('renders meta left and right content', () => {
    render(<Header title="Workshop" meta={{ left: 'Pune, Maharashtra', right: 'Sep 16, 2026' }} />);
    expect(screen.getByText('Pune, Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('Sep 16, 2026')).toBeInTheDocument();
  });

  it('renders a clickable Read More link inside the description', async () => {
    const onClick = vi.fn();
    render(<Header title="About Doctor" description="Bio text." readMore={{ onClick }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Read More' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies center alignment', () => {
    const { container } = render(<Header title="Mr. Chinmay" align="center" />);
    expect(container.querySelector('[class*="header"]')?.className).toMatch(/center/);
  });
});
