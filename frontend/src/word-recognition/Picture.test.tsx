import { render, screen, waitFor } from '@testing-library/react';

import { TestContainer } from '../../tests/utils';
import { Pictures } from '../domain/Pictures';
import { Picture } from './Picture';

describe('Picture', () => {
  it('should display an image', async () => {
    const pictures: Pictures = {
      get: async () => {
        return 'chat.jpg';
      },
    };
    render(
      <TestContainer overrideServices={{ pictures }}>
        <Picture word={'chat'} />
      </TestContainer>,
    );
    await waitFor(() => {
      expect(screen.queryByTestId('img-chat')!.getAttribute('src')).toBe(
        'chat.jpg',
      );
    });
  });
});
