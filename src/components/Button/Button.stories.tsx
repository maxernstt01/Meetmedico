import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button Label',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const PrimaryDisabled: Story = { args: { variant: 'primary', disabled: true } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const SecondaryDisabled: Story = { args: { variant: 'secondary', disabled: true } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const TertiaryDisabled: Story = { args: { variant: 'tertiary', disabled: true } };
export const Error: Story = { args: { variant: 'error' } };
export const ErrorDisabled: Story = { args: { variant: 'error', disabled: true } };
