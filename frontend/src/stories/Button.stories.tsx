import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@radix-ui/themes';

import { decorators } from './config';

type ButtonProps = {
  label: string;
  variant: 'outline' | 'solid';
};

const meta: Meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { options: ['outline', 'solid'], control: { type: 'select' }, }, 
  },
  decorators,
};

export default meta;

const Template: StoryFn<ButtonProps> = (args) => (
  <Button {...args}>{args.label}</Button>
);

export const Primary: StoryFn<ButtonProps> = Template.bind({});
Primary.args = {
  label: 'Click',
  variant: 'outline'
};


