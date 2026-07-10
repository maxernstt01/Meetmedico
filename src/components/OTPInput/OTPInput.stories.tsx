import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  args: {
    label: 'Enter OTP',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {};
export const Error: Story = {
  args: { error: true, helperText: 'Invalid OTP, please try again' },
};
