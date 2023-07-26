import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';
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
    const getTrainingsSpy = jest.spyOn(inMemoryBackend, 'getTrainings');
    const trainingsStore = {
      textReorders: [],
      setTextReorders: () => {},
    };
    const setTrainingsSpy = jest.spyOn(trainingsStore, 'setTextReorders');

    const useTrainingsStore: UseTrainingsStore = () => {
      return trainingsStore;
    };

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend, useTrainingsStore },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(setTrainingsSpy).toHaveBeenCalled();
    });
  });
});
