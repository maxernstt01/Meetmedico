import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationCard } from './NotificationCard';
import { NotificationProvider } from './NotificationProvider';
import { useNotification } from './useNotification';
import type { NotificationOptions } from './Notification.types';

describe('NotificationCard', () => {
  it('renders the title and description', () => {
    render(<NotificationCard title="Notification Title" description="Some description" />);
    expect(screen.getByText('Notification Title')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<NotificationCard title="Title" onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('applies the type-specific class', () => {
    const { container } = render(<NotificationCard title="Title" type="error" />);
    expect(container.querySelector('[role="alert"]')?.className).toMatch(/error/);
  });
});

function Trigger({ options }: { options: NotificationOptions }) {
  const { open } = useNotification();
  return (
    <button type="button" onClick={() => open(options)}>
      trigger
    </button>
  );
}

function CloseAllTrigger() {
  const { closeAll } = useNotification();
  return (
    <button type="button" onClick={() => closeAll()}>
      close-all
    </button>
  );
}

describe('useNotification', () => {
  it('throws when used outside a NotificationProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger options={{ title: 'Title' }} />)).toThrow(
      'useNotification must be used within a NotificationProvider'
    );
    consoleError.mockRestore();
  });
});

describe('NotificationProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens a notification with the default placement (topRight)', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'Notification Title', description: 'Some description' }} />
      </NotificationProvider>
    );
    await user.click(screen.getByRole('button', { name: 'trigger' }));
    expect(screen.getByText('Notification Title')).toBeInTheDocument();
    const alert = screen.getByRole('alert');
    expect(alert.closest('div')?.parentElement?.className).toMatch(/topRight/);
  });

  it('groups notifications by their requested placement', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'Top Left', placement: 'topLeft' }} />
      </NotificationProvider>
    );
    await user.click(screen.getByRole('button', { name: 'trigger' }));
    const alert = screen.getByRole('alert');
    expect(alert.parentElement?.className).toMatch(/topLeft/);
  });

  it('auto-dismisses after the default duration', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'Auto Dismiss' }} />
      </NotificationProvider>
    );
    await user.click(screen.getByRole('button', { name: 'trigger' }));
    expect(screen.getByText('Auto Dismiss')).toBeInTheDocument();
    await vi.advanceTimersByTimeAsync(4500);
    expect(screen.queryByText('Auto Dismiss')).not.toBeInTheDocument();
  });

  it('does not auto-dismiss when duration is 0', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'Persistent', duration: 0 }} />
      </NotificationProvider>
    );
    await user.click(screen.getByRole('button', { name: 'trigger' }));
    await vi.advanceTimersByTimeAsync(10000);
    expect(screen.getByText('Persistent')).toBeInTheDocument();
  });

  it('closes a notification when its close button is clicked', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'Closable', duration: 0 }} />
      </NotificationProvider>
    );
    await user.click(screen.getByRole('button', { name: 'trigger' }));
    expect(screen.getByText('Closable')).toBeInTheDocument();
    await user.click(within(screen.getByRole('alert')).getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Closable')).not.toBeInTheDocument();
  });

  it('closeAll removes every open notification', async () => {
    const user = userEvent.setup({ delay: null, advanceTimers: vi.advanceTimersByTime });
    render(
      <NotificationProvider>
        <Trigger options={{ title: 'One', duration: 0 }} />
        <CloseAllTrigger />
      </NotificationProvider>
    );
    const triggerBtn = screen.getByRole('button', { name: 'trigger' });
    await user.click(triggerBtn);
    await user.click(triggerBtn);
    expect(screen.getAllByRole('alert')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'close-all' }));
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
  });
});
