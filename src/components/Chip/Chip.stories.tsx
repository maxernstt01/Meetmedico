import type { Meta, StoryObj } from '@storybook/react';
import ArrowDownIcon from '@/assets/icons/Primary Button/ArrowDown01Icon.svg?react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Default',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};
export const WithIcon: Story = { args: { icon: ArrowDownIcon, children: 'Default' } };
export const Interactive: Story = { args: { onClick: () => {} } };
export const Selected: Story = { args: { selected: true, onClick: () => {}, children: 'Selected' } };
