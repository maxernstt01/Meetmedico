import type { Meta, StoryObj } from '@storybook/react';
import Home02Icon from '@/assets/icons/Primary Button/Home02Icon.svg?react';
import MedicalFileIcon from '@/assets/icons/Primary Button/MedicalFileIcon.svg?react';
import CalendarSetting02Icon from '@/assets/icons/Primary Button/CalendarSetting02Icon.svg?react';
import Settings01Icon from '@/assets/icons/Primary Button/Settings01Icon.svg?react';
import UserIcon from '@/assets/icons/Primary Button/UserIcon.svg?react';
import { AppFooter } from './AppFooter';

const meta: Meta<typeof AppFooter> = {
  title: 'Components/AppFooter',
  component: AppFooter,
  args: {
    items: [
      { value: 'home', label: 'Home', icon: Home02Icon },
      { value: 'records', label: 'My Records', icon: MedicalFileIcon },
      { value: 'events', label: 'Events', icon: CalendarSetting02Icon },
      { value: 'settings', label: 'Settings', icon: Settings01Icon },
      { value: 'profile', label: 'Profile', icon: UserIcon },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppFooter>;

export const Default: Story = {};
export const WithoutHomeIndicator: Story = { args: { showHomeIndicator: false } };
