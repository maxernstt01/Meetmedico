import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const sampleResults = [
  {
    id: '1',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '2',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
  {
    id: '3',
    title: 'Search Title',
    description: 'Notification Description Book sample appointments, access medical...',
  },
];

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  args: {
    placeholder: 'Search by Location',
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'Token News' } };
export const WithResults: Story = {
  args: { defaultValue: 'Token News', results: sampleResults },
};
