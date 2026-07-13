import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { NotificationProvider } from './NotificationProvider';
import { useNotification } from './useNotification';
import type { NotificationPlacement, NotificationType } from './Notification.types';

const meta: Meta = {
  title: 'Components/Notification',
};

export default meta;
type Story = StoryObj;

function OpenDemo({ type, placement }: { type?: NotificationType; placement?: NotificationPlacement }) {
  const { open } = useNotification();
  return (
    <Button
      variant="primary"
      onClick={() =>
        open({
          title: 'Notification Title',
          description: 'This is the content of the notification.',
          type,
          placement,
        })
      }
    >
      Open the notification box
    </Button>
  );
}

export const Basic: Story = {
  render: () => (
    <NotificationProvider>
      <OpenDemo />
    </NotificationProvider>
  ),
};

export const Types: Story = {
  render: () => (
    <NotificationProvider>
      <div style={{ display: 'flex', gap: 8 }}>
        <OpenDemo type="success" />
        <OpenDemo type="info" />
        <OpenDemo type="warning" />
        <OpenDemo type="error" />
      </div>
    </NotificationProvider>
  ),
};

export const Placements: Story = {
  render: () => (
    <NotificationProvider>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <OpenDemo placement="topLeft" />
        <OpenDemo placement="topRight" />
        <OpenDemo placement="bottomLeft" />
        <OpenDemo placement="bottomRight" />
      </div>
    </NotificationProvider>
  ),
};
