import { renderHook, screen, waitFor } from '@testing-library/react';

import {
  createWrapper,
  inMemoryBackend,
  renderWithinProviders,
} from '../tests/utils';
import App, { useLoadDataBeforeRendering } from './App';
import { Trainings } from './domain/Trainings';

describe('Dashboard', () => {
  it('should display loader first, and display dashboard after data fetching', async () => {
    renderWithinProviders({
      children: <App />,
      wrapInRouter: false,
    });
    expect(screen.queryByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('dashboard')).toBeInTheDocument();
    });
  });
});

describe('useLoadDataBeforeRendering', () => {
  it('should retrieve data from backend and save it in the store', async () => {
    const trainings: Trainings = {
      textReorders: [],
      wordRecognitions: [
        {
          id: 1,
          title: 'Les animaux',
          words: [
            {
              id: 1,
              label: 'chat',
              url: 'chat.jpg',
            },
          ],
        },
      ],
    };
    const backend = {
      ...inMemoryBackend,
      getTrainings: async () => trainings,
    };

    const getTrainingsSpy = jest.spyOn(backend, 'getTrainings');

    renderHook(useLoadDataBeforeRendering, {
      wrapper: createWrapper({ backend }),
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
    });
  });
});

// TODO try to login with refresh_token on app load
