import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    title: 'Title',
    description: 'A Tooltip Description',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <button type="button">Hover me</button>
      </Tooltip>
    </div>
  ),
};

export const TopLeft: Story = { ...Default, args: { ...Default.args, placement: 'topLeft' } };
export const TopRight: Story = { ...Default, args: { ...Default.args, placement: 'topRight' } };
export const Bottom: Story = { ...Default, args: { ...Default.args, placement: 'bottom' } };
export const Left: Story = { ...Default, args: { ...Default.args, placement: 'left' } };
export const Right: Story = { ...Default, args: { ...Default.args, placement: 'right' } };
export const TitleOnly: Story = { ...Default, args: { title: 'Title', description: undefined } };
