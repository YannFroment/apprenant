import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../../tests/utils';
import { Trainings } from '../domain/Trainings';
import { UseTrainingsStore } from '../store/useTrainingsStore';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('should display loader first, and display dashboard after data fetching', async () => {
    renderWithinProviders({
      children: <Dashboard />,
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
    const trainingsStore = {
      textReorders: [],
      wordRecognitions: [],
      setTrainings: () => {},
    };
    const setTrainingsSpy = jest.spyOn(trainingsStore, 'setTrainings');

    const useTrainingsStore: UseTrainingsStore = () => {
      return trainingsStore;
    };

    renderWithinProviders({
      children: <Dashboard />,
      overrideServices: { backend, useTrainingsStore },
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(setTrainingsSpy).toHaveBeenCalledWith(trainings);
    });
  });
});
