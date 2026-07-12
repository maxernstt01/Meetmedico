import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders the title and children when open', () => {
    render(
      <Drawer open title="Basic Drawer">
        Some contents...
      </Drawer>
    );
    expect(screen.getByRole('dialog', { name: 'Basic Drawer' })).toBeInTheDocument();
    expect(screen.getByText('Some contents...')).toBeInTheDocument();
  });

  it('shows a close button by default and calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <Drawer open title="Basic Drawer" onClose={onClose}>
        Content
      </Drawer>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides the close button when closable is false', () => {
    render(
      <Drawer open title="Basic Drawer" closable={false}>
        Content
      </Drawer>
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('calls onClose when the mask is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Drawer open title="Basic Drawer" onClose={onClose}>
        Content
      </Drawer>
    );
    const mask = document.body.querySelector('[aria-hidden="true"]');
    expect(mask).not.toBeNull();
    await userEvent.click(mask as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders default Submit/Cancel actions when onSubmit or onCancel is given', async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    render(
      <Drawer open title="Basic Drawer" onSubmit={onSubmit} onCancel={onCancel}>
        Content
      </Drawer>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });

  it('renders custom footer content when provided', () => {
    render(
      <Drawer open title="Basic Drawer" footer={<span>Custom footer</span>}>
        Content
      </Drawer>
    );
    expect(screen.getByText('Custom footer')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument();
  });
});
