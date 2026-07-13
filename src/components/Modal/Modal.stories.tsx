import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo(props: Omit<React.ComponentProps<typeof Modal>, 'open' | 'onClose' | 'children'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal {...props} open={open} onClose={() => setOpen(false)} onOk={() => setOpen(false)}>
        Some contents...
      </Modal>
    </>
  );
}

export const Basic: Story = {
  render: () => <ModalDemo title="Basic Modal" />,
};

export const WithoutCloseButton: Story = {
  render: () => <ModalDemo title="No Close Button" closable={false} />,
};

export const CustomFooter: Story = {
  render: () => (
    <ModalDemo
      title="Custom Footer"
      footer={
        <>
          <Button variant="secondary">Return</Button>
          <Button variant="primary">Submit</Button>
        </>
      }
    />
  ),
};

export const NoFooter: Story = {
  render: () => <ModalDemo title="No Footer" footer={null} />,
};

export const MaskNone: Story = {
  render: () => <ModalDemo title="No Mask" mask="none" />,
};

export const MaskBlur: Story = {
  render: () => <ModalDemo title="Blur Mask" mask="blur" />,
};

export const TopAligned: Story = {
  render: () => <ModalDemo title="Top Aligned" centered={false} />,
};

export const Confirm: Story = {
  render: () => <ModalDemo type="confirm" title="Confirm" />,
};

export const InfoType: Story = {
  render: () => <ModalDemo type="info" title="Info" />,
};

export const SuccessType: Story = {
  render: () => <ModalDemo type="success" title="Success" />,
};

export const WarningType: Story = {
  render: () => <ModalDemo type="warning" title="Warning" />,
};

export const ErrorType: Story = {
  render: () => <ModalDemo type="error" title="Error" />,
};
