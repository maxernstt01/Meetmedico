import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from './Breadcrumb.types';

const items: BreadcrumbItem[] = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'menu1', label: 'Menu1', href: '/menu1' },
  { key: 'menu2', label: 'Menu2', href: '/menu1/menu2' },
  { key: 'menu2b', label: 'Menu2' },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  args: { items },
  argTypes: {
    activeColor: { control: 'select', options: ['primary', 'neutral'] },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = { args: {} };
export const ActiveNeutral: Story = { args: { activeColor: 'neutral' } };
export const Collapsed: Story = { args: { maxItems: 2 } };
export const SingleItem: Story = {
  args: { items: [{ key: 'home', label: 'Home' }] },
};
