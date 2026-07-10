import type { Meta, StoryObj } from '@storybook/react';
import { PhoneNumberInput } from './PhoneNumberInput';

const meta: Meta<typeof PhoneNumberInput> = {
  title: 'Components/PhoneNumberInput',
  component: PhoneNumberInput,
  args: {
    label: 'Mobile Number',
    required: true,
    placeholder: 'Enter here',
  },
};

export default meta;
type Story = StoryObj<typeof PhoneNumberInput>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: '8836490087' } };
export const Error: Story = {
  args: { defaultValue: '8836490087', error: true, helperText: 'Error helper text' },
};
