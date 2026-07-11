import type { Meta, StoryObj } from '@storybook/react';
import EyeIcon from '@/assets/icons/Primary Button/EyeIcon.svg?react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const WithIconWithDropdown: Story = {
  args: {
    items: [
      { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
    ],
  },
};

export const WithIconNoDropdown: Story = {
  args: {
    items: [
      { value: '1', label: 'Meet Medico', icon: EyeIcon },
      { value: '2', label: 'Meet Medico', icon: EyeIcon },
    ],
  },
};

export const NoIconNoDropdown: Story = {
  args: {
    items: [
      { value: '1', label: 'Meet Medico' },
      { value: '2', label: 'Meet Medico' },
    ],
  },
};

export const OnlyIcon: Story = {
  args: {
    items: [
      { value: '1', icon: EyeIcon, ariaLabel: 'Preview' },
      { value: '2', icon: EyeIcon, ariaLabel: 'Preview' },
    ],
  },
};

export const BoxVariant: Story = {
  args: {
    variant: 'box',
    items: [
      { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true, disabled: true },
    ],
  },
};

export const SegmentVariant: Story = {
  args: {
    variant: 'segment',
    items: [
      { value: '1', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '2', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
      { value: '3', label: 'Meet Medico', icon: EyeIcon, showDropdown: true },
    ],
  },
};
