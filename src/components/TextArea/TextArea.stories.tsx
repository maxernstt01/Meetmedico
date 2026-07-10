import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Add description here',
    maxLength: 500,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};
export const Error: Story = {
  args: { defaultValue: 'Some text', error: true, helperText: 'Error helper text' },
};
