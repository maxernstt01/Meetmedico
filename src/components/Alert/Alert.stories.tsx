import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    children: 'Message will appear here can be up-to two lines not more than that',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const PrimaryWarning: Story = { args: { type: 'warning', level: 'primary' } };
export const PrimaryError: Story = { args: { type: 'error', level: 'primary', children: 'Error message will appear here' } };
export const PrimaryInfo: Story = { args: { type: 'info', level: 'primary' } };
export const PrimarySuccess: Story = { args: { type: 'success', level: 'primary' } };

export const SecondaryWarning: Story = { args: { type: 'warning', level: 'secondary' } };
export const SecondaryError: Story = { args: { type: 'error', level: 'secondary', children: 'Error message will appear here' } };
export const SecondaryInfo: Story = { args: { type: 'info', level: 'secondary' } };
export const SecondarySuccess: Story = { args: { type: 'success', level: 'secondary' } };

export const WithoutIcon: Story = { args: { type: 'warning', level: 'primary', showIcon: false } };
