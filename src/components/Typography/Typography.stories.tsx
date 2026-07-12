import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'h4', 'body', 'label', 'labelCaps', 'caption'],
    },
    weight: {
      control: 'select',
      options: ['extrabold', 'bold', 'semibold', 'medium', 'regular'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Display: Story = { args: { variant: 'display' } };
export const Heading1: Story = { args: { variant: 'h1' } };
export const Heading2: Story = { args: { variant: 'h2' } };
export const Heading3: Story = { args: { variant: 'h3' } };
export const Heading4: Story = { args: { variant: 'h4' } };
export const Body: Story = { args: { variant: 'body' } };
export const Label: Story = { args: { variant: 'label', children: 'Label' } };
export const LabelCaps: Story = { args: { variant: 'labelCaps', children: 'Eyebrow Label' } };
export const Caption: Story = { args: { variant: 'caption', children: 'Caption text' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-12)' }}>
      <Typography variant="display">Display</Typography>
      <Typography variant="h1">Heading H1</Typography>
      <Typography variant="h2">Sub Heading H2</Typography>
      <Typography variant="h3">Title H3</Typography>
      <Typography variant="h4">Sub Title H4</Typography>
      <Typography variant="body">Body P1</Typography>
      <Typography variant="label">Label</Typography>
      <Typography variant="labelCaps">Label Caps</Typography>
      <Typography variant="caption">Caption</Typography>
    </div>
  ),
};
