import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders the title and children when open', () => {
    render(
      <Modal open title="Basic Modal">
        Some contents...
      </Modal>
    );
    expect(screen.getByRole('dialog', { name: 'Basic Modal' })).toBeInTheDocument();
    expect(screen.getByText('Some contents...')).toBeInTheDocument();
  });

  it('shows a close button by default for the default type and calls onClose', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Basic Modal" onClose={onClose}>
        Content
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides the close button when closable is false', () => {
    render(
      <Modal open title="Basic Modal" closable={false}>
        Content
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('calls onClose when the mask is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Basic Modal" onClose={onClose}>
        Content
      </Modal>
    );
    const mask = document.body.querySelector('[aria-hidden="true"]');
    expect(mask).not.toBeNull();
    await userEvent.click(mask as Element);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders default Cancel/OK actions and calls onOk / onCancel', async () => {
    const onOk = vi.fn();
    const onCancel = vi.fn();
    render(
      <Modal open title="Basic Modal" onOk={onOk} onCancel={onCancel}>
        Content
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onOk).toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });

  it('falls back to onClose when Cancel is clicked without an explicit onCancel', async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Basic Modal" onClose={onClose}>
        Content
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders custom footer content when provided', () => {
    render(
      <Modal open title="Basic Modal" footer={<span>Custom footer</span>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Custom footer')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
  });

  it('hides the footer entirely when footer is null', () => {
    render(
      <Modal open title="Basic Modal" footer={null}>
        Content
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'OK' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
  });

  it('does not show a close button by default for status types', () => {
    render(
      <Modal open type="confirm" title="Confirm">
        Bla bla...
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('renders the description under the title for status types', () => {
    render(
      <Modal open type="error" title="Error occurred">
        Something went wrong.
      </Modal>
    );
    expect(screen.getByRole('dialog', { name: 'Error occurred' })).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
