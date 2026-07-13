import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    defaultValue: 30,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {};
export const Range: Story = { args: { range: true, defaultValue: [20, 60] } };
export const Disabled: Story = { args: { disabled: true } };
export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    step: null,
    defaultValue: 26,
    marks: [
      { value: 0, label: '0°C' },
      { value: 26, label: '26°C' },
      { value: 37, label: '37°C' },
      { value: 100, label: '100°C' },
    ],
  },
};
export const Vertical: Story = { args: { direction: 'vertical', defaultValue: 40 } };
export const Reversed: Story = { args: { reverse: true, defaultValue: 30 } };
export const NotIncluded: Story = { args: { included: false, defaultValue: 50 } };
export const WithTooltipFormatter: Story = {
  args: { defaultValue: 50, tooltipFormatter: (v: number) => `${v}%` },
};
