import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import type { AccordionItem } from './Accordion.types';

const faqItems: AccordionItem[] = [
  {
    key: 'attend',
    title: 'Who should attend this workshop?',
    children:
      'This workshop is ideal for healthcare professionals, medical students, nursing students, interpreters, and anyone interested in learning Medical Spanish.',
  },
  { key: 'free', title: 'Is the workshop free?', children: 'Yes, the workshop is free to attend.' },
  {
    key: 'spanish',
    title: 'Do I need to know Spanish before attending?',
    children: 'No prior Spanish knowledge is required.',
  },
  {
    key: 'certificate',
    title: 'Will I receive a certificate?',
    children: 'Yes, a certificate of completion will be provided.',
  },
  {
    key: 'recorded',
    title: 'Will the workshop be recorded?',
    children: 'Yes, a recording will be shared with all registered attendees.',
    disabled: true,
  },
];

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    items: faqItems,
  },
  argTypes: {
    variant: { control: 'select', options: ['borderless', 'bordered'] },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Borderless: Story = { args: { variant: 'borderless' } };
export const Bordered: Story = { args: { variant: 'bordered' } };
export const AccordionMode: Story = { args: { variant: 'bordered', accordion: true } };
export const DefaultOpen: Story = {
  args: { variant: 'borderless', defaultActiveKeys: ['attend'] },
};
