import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const options = Array.from({ length: 7 }, (_, i) => ({
  value: String(i + 1),
  label: `Option ${i + 1}`,
}));

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    label: 'Dropdown',
    required: true,
    options,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: { helperText: 'Support Text' },
};
export const WithoutSupportText: Story = {};
export const Normal: Story = { args: { defaultValue: [] } };
export const SingleSelect: Story = { args: { mode: 'single' } };
export const MultiSelect: Story = { args: { mode: 'multi', defaultValue: ['1', '2', '3'] } };
export const MultiSelectWithTags: Story = {
  args: { mode: 'multi', showSelectedTags: true, defaultValue: ['1', '2', '3'] },
};
export const Tertiary: Story = { args: { variant: 'tertiary' } };
