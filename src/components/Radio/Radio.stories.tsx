import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    label: 'Radio label',
    name: 'story-group',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const DisabledUnchecked: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { defaultChecked: true, disabled: true } };
