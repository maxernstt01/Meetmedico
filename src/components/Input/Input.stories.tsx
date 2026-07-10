import type { Meta, StoryObj } from '@storybook/react';
import LocationIcon from '@/assets/icons/Primary Button/Location02Icon.svg?react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Enter here',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: 'Support Text' },
};

export const WithHelperTextAndIcon: Story = {
  args: { helperText: 'Support Text', rightIcon: LocationIcon },
};

export const WithIconRight: Story = {
  args: { rightIcon: LocationIcon },
};

export const WithIconLeft: Story = {
  args: { leftIcon: LocationIcon },
};

export const Filled: Story = {
  args: { defaultValue: 'Qadir AK' },
};

export const Error: Story = {
  args: { defaultValue: 'Qadir AK', error: true, helperText: 'Error helper text' },
};
