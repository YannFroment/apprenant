import { screen, waitFor, within } from '@testing-library/react';

import { renderWithinProviders } from '../../tests/utils';
import { Word } from './Word';

describe('Word', () => {
  it('should display the word name', async () => {
    renderWithinProviders(<Word word={'chat'} />);
    await waitFor(() => {
      expect(
        within(screen.queryByTestId('chat')!).getByText('chat'),
      ).toBeInTheDocument();
    });
  });

  it('should display a button to hear', async () => {
    renderWithinProviders(<Word word={'chat'} />);

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('chat')!).queryByTestId('listen-chat'),
      ).toBeInTheDocument();
    });
  });

  it('should display a Picture component', async () => {
    renderWithinProviders(<Word word={'chat'} />);

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('chat')!).getByTestId('img-chat'),
      ).toBeInTheDocument();
    });
  });

  it('should display WordRecognition component', async () => {
    renderWithinProviders(<Word word={'chat'} />);

    await waitFor(() => {
      expect(screen.queryByTestId('chat-speech-recorder')).toBeInTheDocument();
    });
  });
});
