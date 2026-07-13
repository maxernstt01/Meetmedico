import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoInternet: Story = {
  render: () => <EmptyState preset="noInternet" action={<Button variant="primary">Retry</Button>} />,
};

export const NoData: Story = {
  render: () => <EmptyState preset="noData" action={<Button variant="primary">Retry</Button>} />,
};

export const NotFound: Story = {
  render: () => <EmptyState preset="notFound" />,
};

export const ServerError: Story = {
  render: () => <EmptyState preset="serverError" />,
};

export const Forbidden: Story = {
  render: () => <EmptyState preset="forbidden" />,
};

export const CustomOverride: Story = {
  render: () => (
    <EmptyState
      preset="noData"
      title="No appointments yet"
      description="Book your first appointment to see it here."
      action={<Button variant="primary">Book Appointment</Button>}
    />
  ),
};
