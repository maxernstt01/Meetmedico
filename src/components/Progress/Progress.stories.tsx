import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    percent: 50,
  },
  argTypes: {
    type: { control: 'select', options: ['line', 'circle'] },
    status: { control: 'select', options: ['primary', 'secondary', 'success', 'error'] },
    size: { control: 'select', options: ['default', 'small', 'micro'] },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Line: Story = { args: { percent: 60 } };
export const LineSuccess: Story = { args: { percent: 100, status: 'success' } };
export const LineError: Story = { args: { percent: 40, status: 'error' } };
export const LineWithLabel: Story = {
  args: { percent: 65, label: 'Task In Progress' },
};
export const LineLoading: Story = {
  args: { percent: 55, info: 'Loading', loading: true },
};
export const Circle: Story = { args: { type: 'circle', percent: 68 } };
export const CircleSmall: Story = { args: { type: 'circle', percent: 68, size: 'small' } };
export const CircleSuccess: Story = {
  args: { type: 'circle', percent: 100, status: 'success' },
};
export const CircleError: Story = {
  args: { type: 'circle', percent: 40, status: 'error' },
};
export const ContentLevel: Story = {
  args: { type: 'circle', percent: 40, size: 'micro', loading: true, label: 'In Progress' },
};
