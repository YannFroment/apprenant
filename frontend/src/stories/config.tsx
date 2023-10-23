import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import { StoryFn } from '@storybook/react';

export const decorators = [
  (Story: StoryFn) => (
    <Theme>
      <Story />
    </Theme>
  ),
];
