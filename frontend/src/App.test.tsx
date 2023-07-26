import { screen, waitFor } from '@testing-library/react';

import { renderWithinProviders } from '../tests/utils';
import App from './App';
import { Backend } from './domain/Backend';

describe('Dashboard', () => {
  it('should display loader, retrieve data from backend and display dashboard', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [];
      },
      getWordRecognitions: async () => {
        return [];
      },
    };
    const getTextReordersSpy = jest.spyOn(backend, 'getTextReorders');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend },
      wrapInRouter: false,
    });
    expect(screen.queryByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(getTextReordersSpy).toHaveBeenCalled();
      expect(screen.queryByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('should retrieve word recognitions from backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [];
      },
      getWordRecognitions: async () => {
        return [];
      },
    };
    const getWordRecognitionsSpy = jest.spyOn(backend, 'getWordRecognitions');

    renderWithinProviders({
      children: <App />,
      overrideServices: { backend },
      wrapInRouter: false,
    });

    await waitFor(() => {
      expect(getWordRecognitionsSpy).toHaveBeenCalled();
    });
  });
});
