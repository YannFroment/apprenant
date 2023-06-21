import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WordsContainer } from './WordsContainer';
import { TestContainer } from '../../tests/utils';

describe('WordsContainer', () => {
  it('should display a component for each word of the list of words', async () => {
    const words = ['chat', 'chien', 'oiseau'];
    render(
      <TestContainer>
        <WordsContainer words={words} />
      </TestContainer>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('chat')).toBeInTheDocument();
      expect(screen.queryByTestId('chien')).toBeInTheDocument();
      expect(screen.queryByTestId('oiseau')).toBeInTheDocument();
    });
  });

  it('should not change record button text for a word when clicking record button for another word', async () => {
    render(
      <TestContainer>
        <WordsContainer words={['chat', 'chien']} />
      </TestContainer>,
    );
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
