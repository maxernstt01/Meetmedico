import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerDemo(props: Omit<React.ComponentProps<typeof Drawer>, 'open' | 'onClose' | 'children'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer {...props} open={open} onClose={() => setOpen(false)}>
        Some contents...
      </Drawer>
    </>
  );
}

export const Basic: Story = {
  render: () => <DrawerDemo title="Basic Drawer" />,
};

export const WithoutCloseButton: Story = {
  render: () => <DrawerDemo title="No Close Button" closable={false} />,
};

export const WithActions: Story = {
  render: () => (
    <DrawerDemo
      title="With Actions"
      onSubmit={() => {}}
      onCancel={() => {}}
    />
  ),
};

export const MaskNone: Story = {
  render: () => <DrawerDemo title="No Mask" mask="none" />,
};

export const MaskBlur: Story = {
  render: () => <DrawerDemo title="Blur Mask" mask="blur" />,
};

export const PlacementLeft: Story = {
  render: () => <DrawerDemo title="Left Placement" placement="left" />,
};
