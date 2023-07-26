import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';
import { Trainings } from './domain/Backend';

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
      wordRecognitions: [],
    };
    const getTrainingsSpy = jest.spyOn(inMemoryBackend, 'getTrainings');
    const trainingsStore = {
      textReorders: [],
      setTextReorders: () => {},
      setTrainings: () => {},
    };
    const setTrainingsSpy = jest.spyOn(trainingsStore, 'setTrainings');

    const useTrainingsStore = () => {
      return trainingsStore;
    };

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend, useTrainingsStore },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(setTrainingsSpy).toHaveBeenCalledWith(trainings);
    });
  });
});
