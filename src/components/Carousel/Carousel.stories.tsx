import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const slideStyle = (bg: string) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background: bg,
  color: '#fff',
  fontSize: 24,
});

function DemoSlides() {
  return (
    <>
      <div style={slideStyle('#2f4a7a')}>1</div>
      <div style={slideStyle('#3a5a8c')}>2</div>
      <div style={slideStyle('#44699e')}>3</div>
      <div style={slideStyle('#4e78b0')}>4</div>
    </>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  argTypes: {
    dotPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const DotsOnly: Story = {
  render: () => (
    <Carousel showArrows={false} showDots>
      <DemoSlides />
    </Carousel>
  ),
};

export const ArrowsOnly: Story = {
  render: () => (
    <Carousel showArrows showDots={false}>
      <DemoSlides />
    </Carousel>
  ),
};

export const ArrowsAndDots: Story = {
  render: () => (
    <Carousel showArrows showDots>
      <DemoSlides />
    </Carousel>
  ),
};

export const DotPositionTop: Story = {
  render: () => (
    <Carousel dotPosition="top">
      <DemoSlides />
    </Carousel>
  ),
};

export const DotPositionLeft: Story = {
  render: () => (
    <Carousel dotPosition="left">
      <DemoSlides />
    </Carousel>
  ),
};

export const DotPositionRight: Story = {
  render: () => (
    <Carousel dotPosition="right">
      <DemoSlides />
    </Carousel>
  ),
};

export const Autoplay: Story = {
  render: () => (
    <Carousel autoplay autoplayInterval={2000}>
      <DemoSlides />
    </Carousel>
  ),
};
