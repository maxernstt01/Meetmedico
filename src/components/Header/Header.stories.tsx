import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const ProfileProgress: Story = {
  args: {
    title: 'Complete your profile',
    titleVariant: 'label',
    description: '20% Completed',
    descriptionVariant: 'caption',
    descriptionWeight: 'semibold',
    descriptionColor: 'var(--warning-600)',
  },
};

export const WorkshopWithMeta: Story = {
  args: {
    eyebrowTags: [
      { key: 'category', label: 'Category' },
      { key: 'tag', label: 'Tag' },
      { key: 'type', label: 'Type' },
    ],
    title: 'FREE WORKSHOP - Strategies to Learn Medical Spanish That Fit Your Schedule',
    titleVariant: 'label',
    meta: { left: 'Pune, Maharashtra', right: 'Sep 16, 2026' },
  },
};

export const DoctorProfileCentered: Story = {
  args: {
    align: 'center',
    title: 'Dr. Thangavelu. S',
    description: 'MBBS,DCH,MD,DNB,MRCP(UK)\nMumbai, India',
    descriptionVariant: 'body',
    belowTags: [
      { key: 'en', label: 'English' },
      { key: 'kn', label: 'Kannada' },
      { key: 'hi', label: 'Hindi' },
    ],
  },
};

export const PageTitle: Story = {
  args: {
    title: 'Account Rejected',
    titleVariant: 'h1',
    description: 'Your profile has been carefully reviewed by our team and was rejected due to a mismatch',
  },
};

export const GreetingWithHighlight: Story = {
  args: {
    title: (
      <>
        Morning, <span style={{ color: 'var(--primary-600)' }}>AIIMS</span>
      </>
    ),
    titleVariant: 'h1',
    description: 'Manage your Hospital profile and find upcoming health events in one place.',
  },
};

export const HeroWithHighlight: Story = {
  args: {
    eyebrowTags: [{ key: 'verified', label: 'Certified & Verified', tone: 'secondary' }],
    title: (
      <>
        Discover Trusted <span style={{ color: 'var(--primary-600)' }}>Health Services </span>Near You
      </>
    ),
    titleVariant: 'display',
    description: 'Find verified doctors, top-tier medical centers, and book seamless online appointments.',
  },
};

export const AboutWithReadMore: Story = {
  args: {
    title: 'About Dr. Prakash D Bhavle',
    titleVariant: 'h4',
    titleWeight: 'semibold',
    description:
      'Dr. Shyam Bhairi is a skilled Orthopedic Surgeon specializing in joint replacement, robotic-assisted joint surgeries, sports medicine, and advanced trauma management...',
    descriptionVariant: 'body',
    readMore: { onClick: () => {} },
  },
};
