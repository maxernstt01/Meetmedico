import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    label: 'Date',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};
export const Error: Story = {
  args: { error: true, helperText: 'Error helper text' },
};
export const Range: Story = { args: { mode: 'range' } };
