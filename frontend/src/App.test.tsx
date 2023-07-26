import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';

describe('Dashboard', () => {
  it('should display loader, retrieve data from backend and display dashboard', async () => {
    const getTrainingsSpy = jest.spyOn(inMemoryBackend, 'getTrainings');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
      wrapInRouter: false,
    });
    expect(screen.queryByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(getTrainingsSpy).toHaveBeenCalled();
      expect(screen.queryByTestId('dashboard')).toBeInTheDocument();
    });
  });
});
