import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    total: 102,
    defaultCurrent: 1,
    boundaryCount: 3,
    siblingCount: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Normal: Story = {
  args: { showTotal: true, pageSize: 50, totalItems: 109 },
};
export const OnlyNumbers: Story = {};
export const WithButtonAndIcon: Story = {
  args: { defaultCurrent: 2, prevNext: 'button' },
};
export const WithIconOnly: Story = {
  args: { defaultCurrent: 2, prevNext: 'icon' },
};
export const Responsive: Story = {
  args: { boundaryCount: 1, siblingCount: 0 },
};
export const ResponsiveWithIcons: Story = {
  args: { boundaryCount: 1, siblingCount: 0, prevNext: 'icon' },
};
