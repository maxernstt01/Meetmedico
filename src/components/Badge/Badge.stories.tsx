import type { Meta, StoryObj } from '@storybook/react';
import LocationIcon from '@/assets/icons/Primary Button/Location02Icon.svg?react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Neutral',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: 'neutral', children: 'Neutral' } };
export const Info: Story = { args: { variant: 'info', children: 'Info' } };
export const Success: Story = { args: { variant: 'success', children: 'Success' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } };
export const Error: Story = { args: { variant: 'error', children: 'Error' } };
export const WithIcon: Story = { args: { variant: 'neutral', children: 'Neutral', icon: LocationIcon } };
