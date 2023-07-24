import { screen, waitFor, within } from '@testing-library/react';

import { renderWithinProviders } from '../tests/utils';
import App from './App';
import { Backend } from './domain/Backend';

describe('Dashboard', () => {
  it('should retrieve and store text reorders from backend', async () => {
    const backend: Backend = {
      get: async () => {
        return '';
      },
      getTextReorders: async () => {
        return [
          {
            id: 1,
            title: 'title',
            orderedSentences: [],
            randomizedSentences: [],
          },
        ];
      },
      getWordRecognitions: async () => {
        return [];
      },
    };
    const getTextReordersSpy = jest.spyOn(backend, 'getTextReorders');

    renderWithinProviders(<App />, { backend }, false);

    await waitFor(() => {
      expect(getTextReordersSpy).toHaveBeenCalled();
      expect(screen.queryByTestId('dashboard')).toBeInTheDocument();
      expect(
        within(screen.queryByTestId('dashboard')!).queryByText('title'),
      ).toBeInTheDocument();
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

    renderWithinProviders(<App />, { backend }, false);

    await waitFor(() => {
      expect(getWordRecognitionsSpy).toHaveBeenCalled();
    });
  });
});
