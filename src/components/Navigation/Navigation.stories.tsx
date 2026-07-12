import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';
import type { NavigationItem } from './Navigation.types';
import { Button } from '../Button';
import { Logo } from '../Logo';

const horizontalItems: NavigationItem[] = [
  { key: 'home', label: 'Home' },
  {
    key: 'professionals',
    label: 'Professionals',
    children: [
      { key: 'doctors', label: 'Doctors' },
      { key: 'nurses', label: 'Nurses' },
    ],
  },
  {
    key: 'health-services',
    label: 'Health Services',
    children: [
      { key: 'clinics', label: 'Clinics' },
      { key: 'pharmacies', label: 'Pharmacies' },
    ],
  },
  { key: 'events', label: 'Events' },
];

const verticalItems: NavigationItem[] = [
  { key: 'one', label: 'Navigation One' },
  {
    key: 'two',
    label: 'Navigation Two',
    children: [
      { key: 'opt1', label: 'Option 1' },
      { key: 'opt2', label: 'Option 2' },
      {
        key: 'submenu',
        label: 'Submenu',
        children: [
          { key: 'sub1', label: 'Option 1' },
          { key: 'sub2', label: 'Option 2' },
          { key: 'sub3', label: 'Option 3' },
        ],
      },
    ],
  },
  { key: 'three', label: 'Navigation Three' },
];

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const HorizontalLogoCenter: Story = {
  render: () => (
    <Navigation
      items={horizontalItems}
      mode="horizontal"
      activeKey="home"
      logo={<Logo variant="responsive" />}
      logoPosition="center"
      menuAlign="start"
      actions={
        <>
          <Button variant="secondary">Register</Button>
          <Button variant="primary">Login</Button>
        </>
      }
    />
  ),
};

export const HorizontalLogoLeft: Story = {
  render: () => (
    <Navigation
      items={horizontalItems}
      mode="horizontal"
      activeKey="home"
      logo={<Logo variant="responsive" />}
      logoPosition="left"
      menuAlign="center"
      actions={
        <>
          <Button variant="secondary">Register</Button>
          <Button variant="primary">Login</Button>
        </>
      }
    />
  ),
};

export const VerticalDefault: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Navigation items={verticalItems} mode="vertical" defaultOpenKeys={['two']} accordion />
    </div>
  ),
};

export const VerticalCollapsible: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Navigation items={verticalItems} mode="vertical" collapsible />
    </div>
  ),
};
