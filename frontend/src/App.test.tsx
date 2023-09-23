import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';
import { Trainings } from './domain/Trainings';
import { UseTrainingsStore } from './store/useTrainingsStore';

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
      children: <App />,
      overrideServices: { backend, useTrainingsStore },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(setTrainingsSpy).toHaveBeenCalledWith(trainings);
    });
  });

  it('should try to auto log in', async () => {
    const spyOnAutoLogIn = jest.spyOn(inMemoryBackend, 'autoLogIn');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
    });

    await waitFor(() => {
      expect(spyOnAutoLogIn).toHaveBeenCalled();
    });
  });
});
