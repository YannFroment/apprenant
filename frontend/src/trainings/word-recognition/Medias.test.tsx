import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithinProviders } from '../../../tests/utils';
import { Medias } from './Medias';

describe('Medias', () => {
  it('should display a component for each word of the list of words', async () => {
    const words = ['chat', 'chien', 'oiseau'];
    renderWithinProviders({ children: <Medias words={words} /> });

    await waitFor(() => {
      expect(screen.queryByTestId('chat')).toBeInTheDocument();
      expect(screen.queryByTestId('chien')).toBeInTheDocument();
      expect(screen.queryByTestId('oiseau')).toBeInTheDocument();
    });
  });

  it('should not change record button text for a word when clicking record button for another word', async () => {
    renderWithinProviders({
      children: <Medias words={['chat', 'chien']} />,
    });
    await userEvent.click(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText(
        "Arrêter l'enregistrement",
      ),
    ).toBeInTheDocument();

    expect(
      within(screen.queryByTestId('chien')!).getByText('Enregistrer'),
    ).toBeInTheDocument();
  });
});
