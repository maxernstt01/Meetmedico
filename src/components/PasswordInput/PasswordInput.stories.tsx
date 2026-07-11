import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Enter password',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Gtu6k_kdfj' } };
export const Error: Story = {
  args: { defaultValue: 'Gtu6k_kdfj', error: true, helperText: 'Error helper text' },
};
export const NewPasswordCreating: Story = {
  args: { label: 'Label', required: true, showRequirements: true },
};
export const NewPasswordCreatingFilled: Story = {
  args: { showRequirements: true, defaultValue: 'Gtu6k_kdfj' },
};
