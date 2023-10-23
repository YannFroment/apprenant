import type { Meta, StoryObj } from '@storybook/react';

import { Button as Button } from '../components/Button';
import { decorators } from './config';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    label: { control: 'text' },
  },
  decorators,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Click',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Click',
  },
};

export const Large: Story = {
  args: {
    label: 'Click',
  },
};

export const Small: Story = {
  args: {
    label: 'Click',
  },
};

export const Warning: Story = {
  args: {
    label: 'Delete now',
  },
};
