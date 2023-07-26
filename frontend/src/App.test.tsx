import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';
import { Trainings } from './domain/Backend';
import { UseTrainingsStore } from './store';

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
              word: 'chat',
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
    const trainingsStore = {
      textReorders: [],
      setTrainings: () => {},
    };
    const setTrainingsSpy = jest.spyOn(trainingsStore, 'setTrainings');

    const useTrainingsStore: UseTrainingsStore = () => {
      return trainingsStore;
    };

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend, useTrainingsStore },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(setTrainingsSpy).toHaveBeenCalledWith(trainings);
    });
  });
});
