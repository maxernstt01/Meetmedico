import type { Meta, StoryObj } from '@storybook/react';
import { Rate } from './Rate';

const meta: Meta<typeof Rate> = {
  title: 'Components/Rate',
  component: Rate,
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled', 'badge'] },
    size: { control: 'select', options: [16, 20, 26] },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;

export const OutlineDefault: Story = { args: {} };
export const OutlineWithRating: Story = { args: { defaultValue: 4 } };
export const FilledDefault: Story = { args: { variant: 'filled' } };
export const FilledWithRating: Story = { args: { variant: 'filled', defaultValue: 3 } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <Rate size={16} defaultValue={3} />
      <Rate size={20} defaultValue={3} />
      <Rate size={26} defaultValue={3} />
    </div>
  ),
};
export const Badge: Story = { args: { variant: 'badge', value: 3.6 } };
export const Disabled: Story = { args: { defaultValue: 3, disabled: true } };
