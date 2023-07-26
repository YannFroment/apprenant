import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';

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

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
    });
  });
});
