import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from './Steps';
import type { StepItem } from './Steps.types';

const items: StepItem[] = [
  { key: 'finished', title: 'Finished', description: 'This is a content.' },
  { key: 'in-progress', title: 'In Progress', description: 'This is a content.' },
  { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
];

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  args: { items, current: 1 },
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['default', 'dot'] },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { direction: 'vertical' } };
export const DotHorizontal: Story = { args: { variant: 'dot' } };
export const DotVertical: Story = { args: { variant: 'dot', direction: 'vertical' } };
export const WithExtra: Story = {
  args: {
    items: [
      { key: 'finished', title: 'Finished', description: 'This is a content.' },
      { key: 'in-progress', title: 'In Progress', description: 'This is a content.', extra: 'Left 00:00:08' },
      { key: 'waiting', title: 'Waiting', description: 'This is a content.' },
    ],
  },
};
export const Clickable: Story = {
  args: { onChange: (index: number) => console.log('go to step', index) },
};
export const WithError: Story = {
  args: {
    items: [
      { key: 'a', title: 'Step 1', description: 'This is a content.' },
      { key: 'b', title: 'Step 2', description: 'This is a content.', status: 'error' },
      { key: 'c', title: 'Step 3', description: 'This is a content.' },
    ],
    current: 1,
  },
};
