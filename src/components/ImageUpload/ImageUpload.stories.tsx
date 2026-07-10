import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from './ImageUpload';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  args: {
    label: 'Label',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {
  args: { helperText: 'Supported file information' },
};

export const Error: Story = {
  args: { error: true, helperText: 'Error helper text' },
};
