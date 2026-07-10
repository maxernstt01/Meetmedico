import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'responsive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = { args: { variant: 'default' } };
export const Responsive: Story = { args: { variant: 'responsive' } };
