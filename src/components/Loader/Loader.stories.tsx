import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { DotsLoader } from './DotsLoader';
import { Skeleton } from './Skeleton';

const meta: Meta = {
  title: 'Components/Loader',
};

export default meta;

export const CircleSpinner: StoryObj<typeof Spinner> = {
  render: (args) => <Spinner {...args} />,
  args: { size: 32 },
};

export const DottedLoader: StoryObj<typeof DotsLoader> = {
  render: (args) => <DotsLoader {...args} />,
  args: { size: 8 },
};

export const SkeletonRect: StoryObj<typeof Skeleton> = {
  render: (args) => <Skeleton {...args} />,
  args: { shape: 'rect', width: 240, height: 80 },
};

export const SkeletonText: StoryObj<typeof Skeleton> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      <Skeleton shape="text" width="100%" />
      <Skeleton shape="text" width="80%" />
      <Skeleton shape="text" width="60%" />
    </div>
  ),
};

export const SkeletonCircle: StoryObj<typeof Skeleton> = {
  render: (args) => <Skeleton {...args} />,
  args: { shape: 'circle' },
};
