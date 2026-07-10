import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  args: {
    label: 'Time',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {};
export const Error: Story = {
  args: { error: true, helperText: 'Error helper text' },
};
