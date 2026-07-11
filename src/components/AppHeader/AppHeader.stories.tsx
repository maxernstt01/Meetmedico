import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, border: '1px solid #eee' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const MainHeader: Story = { args: { variant: 'main' } };
export const BackButtonOnly: Story = { args: { variant: 'back' } };
export const BackAndAction: Story = {
  args: {
    variant: 'back',
    action: (
      <Button variant="tertiary" onClick={() => {}}>
        Skip To Home
      </Button>
    ),
  },
};
export const BackAndLabel: Story = { args: { variant: 'back', label: 'Label' } };
export const BackAndLabelAndSupportingText: Story = {
  args: { variant: 'back', label: 'Label', supportingText: '1/3 Steps' },
};
