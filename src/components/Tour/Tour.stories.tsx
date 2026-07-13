import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tour } from './Tour';
import type { TourStep } from './Tour.types';

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
};

export default meta;
type Story = StoryObj;

const centeredSteps: TourStep[] = [
  { title: 'Welcome', description: 'This is a quick tour of the product.' },
  { title: 'Step Two', description: 'Here is another important area.' },
  { title: 'All Done', description: "You're ready to go!" },
];

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour steps={centeredSteps} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export const Basic: Story = {
  render: () => <BasicDemo />,
};

function TargetedDemo() {
  const [open, setOpen] = useState(false);
  const uploadRef = useRef<HTMLButtonElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);

  const steps: TourStep[] = [
    { title: 'Upload', description: 'Upload your file here.', target: uploadRef, placement: 'bottom' },
    { title: 'Save', description: 'Save your changes.', target: saveRef, placement: 'bottom' },
  ];

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Button ref={uploadRef} variant="secondary">
        Upload
      </Button>
      <Button ref={saveRef} variant="primary">
        Save
      </Button>
      <Tour steps={steps} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export const TargetedSteps: Story = {
  render: () => <TargetedDemo />,
};

export const NoSkipNoClose: Story = {
  render: () => <Tour steps={centeredSteps} open closable={false} showSkip={false} />,
};

export const BlurMask: Story = {
  render: () => <Tour steps={centeredSteps} open mask="blur" />,
};

export const NoMask: Story = {
  render: () => <Tour steps={centeredSteps} open mask="none" />,
};

export const PrimaryType: Story = {
  render: () => <Tour steps={centeredSteps} open type="primary" />,
};
