import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const HorizontalSolid: Story = {};
export const HorizontalDotted: Story = { args: { variant: 'dotted' } };
export const HorizontalDash: Story = { args: { variant: 'dash' } };
export const Vertical: Story = {
  render: (args) => (
    <div style={{ height: 40 }}>
      <Divider {...args} orientation="vertical" />
    </div>
  ),
};
export const WithTextCenter: Story = { args: { children: 'Text' } };
export const WithTextLeft: Story = { args: { children: 'Text', textAlign: 'left' } };
export const WithTextRight: Story = { args: { children: 'Text', textAlign: 'right' } };
export const WithTextDotted: Story = { args: { children: 'Text', variant: 'dotted' } };
