import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithinProviders } from '../../../tests/utils';
import { Word } from '../../domain/Trainings';
import { WordRecognition } from '.';

const createWords = (labels: string[]) =>
  labels.map(
    (label, index): Word => ({ id: index + 1, label, url: `${label}.jpg` }),
  );

describe('Medias', () => {
  it('should display a component for each word of the list of words', async () => {
    const words: Word[] = createWords(['chat', 'chien', 'oiseau']);
    renderWithinProviders({
      children: <WordRecognition words={words} />,
    });

    await waitFor(() => {
      expect(screen.queryByTestId('chat')).toBeInTheDocument();
      expect(screen.queryByTestId('chien')).toBeInTheDocument();
      expect(screen.queryByTestId('oiseau')).toBeInTheDocument();
    });
  });

  it('should not change record button text for a word when clicking record button for another word', async () => {
    const words: Word[] = createWords(['chat', 'chien']);

    renderWithinProviders({
      children: <WordRecognition words={words} />,
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
