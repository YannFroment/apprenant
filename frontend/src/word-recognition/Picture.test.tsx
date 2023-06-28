import { render, screen, waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Pictures } from '../domain/Pictures';
import {
  AppContext,
  ServiceContainer,
} from '../service-container/ServiceContainerContext';
import { Picture } from './Picture';

describe('Picture', () => {
  const serviceContainer: ServiceContainer = {
    speechSynth: { speak: () => {} },
    speechRecorderFactory: () => {
      return {
        start: () => {},
        stop: () => {},
      };
    },
    pictures: {
      get: async (searchKey) => {
        return searchKey;
      },
    },
    backend: {
      get: async (url) => {
        return url;
      },
    },
  };
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

  it('test', async () => {
    const pictures = {
      get: async () => {
        return 'chat.jpg';
      },
    };

    const container = {
      ...serviceContainer,
      pictures,
    };

    render(
      <AppContext.Provider value={container}>
        <Picture word={'chat'} />
      </AppContext.Provider>,
    );
    await waitFor(() => {
      expect(screen.queryByTestId('img-chat')!.getAttribute('src')).toBe(
        'chat.jpg',
      );
    });
  });
});
