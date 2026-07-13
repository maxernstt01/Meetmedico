import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import type { TimelineItem } from './Timeline.types';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const items: TimelineItem[] = [
  { key: '1', children: 'Create a services site 2015-09-01' },
  { key: '2', children: 'Solve initial network problems 2015-09-01' },
  { key: '3', children: 'Technical testing 2015-09-01' },
  { key: '4', children: 'Network problems being solved 2015-09-01' },
];

export const Basic: Story = {
  render: () => <Timeline items={items} />,
};

export const Center: Story = {
  render: () => <Timeline items={items} placement="center" />,
};

export const Statuses: Story = {
  render: () => (
    <Timeline
      items={[
        { key: '1', children: 'Create a services site 2015-09-01', status: 'success' },
        { key: '2', children: 'Solve initial network problems 2015-09-01', status: 'success' },
        { key: '3', children: 'Network problems being solved 2015-09-01', status: 'error' },
        { key: '4', children: 'Technical testing 2015-09-01' },
      ]}
    />
  ),
};

export const Pending: Story = {
  render: () => <Timeline items={items.slice(0, 3)} pending="Recording..." />,
};

export const Reverse: Story = {
  render: () => <Timeline items={items.slice(0, 3)} pending="Recording..." reverse />,
};

export const Horizontal: Story = {
  render: () => <Timeline items={items} orientation="horizontal" />,
};
