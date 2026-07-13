import type { Meta, StoryObj } from '@storybook/react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import { Statistic } from './Statistic';

const meta: Meta<typeof Statistic> = {
  title: 'Components/Statistic',
  component: Statistic,
};

export default meta;
type Story = StoryObj<typeof Statistic>;

export const Basic: Story = {
  render: () => <Statistic title="Active Users" value={112893} />,
};

export const WithPrecision: Story = {
  render: () => <Statistic title="Account Balance (CNY)" value={112893} precision={2} />,
};

export const WithPrefix: Story = {
  render: () => <Statistic title="Feedback" value={1128} prefix={<span>👍</span>} />,
};

export const WithSuffix: Story = {
  render: () => <Statistic title="Unmerged" value="93 / 100" />,
};

export const TrendUp: Story = {
  render: () => <Statistic title="Active" value={11.28} suffix="%" trend="up" />,
};

export const TrendDown: Story = {
  render: () => <Statistic title="Idle" value={9.3} suffix="%" trend="down" />,
};

export const Loading: Story = {
  render: () => <Statistic title="Active Users" value={112893} loading />,
};

export const NoAnimation: Story = {
  render: () => <Statistic title="Active Users" value={112893} animate={false} />,
};

export const WithIconBadge: Story = {
  render: () => <Statistic title="Monthly Active Users" value={93241} icon={UserIcon} />,
};

export const WithIconBadgeAndTrend: Story = {
  render: () => <Statistic title="Active" value={11.28} suffix="%" icon={UserIcon} trend="up" />,
};
