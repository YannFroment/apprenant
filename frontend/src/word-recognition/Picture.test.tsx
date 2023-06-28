import { screen, waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Pictures } from '../domain/Pictures';
import { Picture } from './Picture';
describe('Picture', () => {
  it('should display an image', async () => {
    const pictures: Pictures = {
      get: async () => {
        return 'chat.jpg';
      },
    };
    renderWithinProviders(<Picture word={'chat'} />, { pictures });
    await waitFor(() => {
      expect(screen.queryByTestId('img-chat')!.getAttribute('src')).toBe(
        'chat.jpg',
      );
    });
  });
});
