import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Checkbox label',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const LineChecked: Story = { args: { variant: 'line', defaultChecked: true } };
export const FillChecked: Story = { args: { variant: 'fill', defaultChecked: true } };
export const DisabledUnchecked: Story = { args: { disabled: true } };
export const DisabledCheckedLine: Story = { args: { variant: 'line', defaultChecked: true, disabled: true } };
export const DisabledCheckedFill: Story = { args: { variant: 'fill', defaultChecked: true, disabled: true } };
