import { screen, waitFor } from '@testing-library/react';

import { inMemoryBackend, renderWithinProviders } from '../tests/utils';
import App from './App';

describe('Dashboard', () => {
  it('should display loader, retrieve data from backend and display dashboard', async () => {
    const getTextReordersSpy = jest.spyOn(inMemoryBackend, 'getTextReorders');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
      wrapInRouter: false,
    });
    expect(screen.queryByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(getTextReordersSpy).toHaveBeenCalled();
      expect(screen.queryByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('should retrieve word recognitions from backend', async () => {
    const getWordRecognitionsSpy = jest.spyOn(
      inMemoryBackend,
      'getWordRecognitions',
    );

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend: inMemoryBackend },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getWordRecognitionsSpy).toHaveBeenCalled();
    });
  });
});
