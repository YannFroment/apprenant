import { render, within, screen } from '@testing-library/react';
import { Word } from './Word';
import { ServiceContainerContext } from '../service-container/ServiceContainerContext';
import userEvent from '@testing-library/user-event';
import { createContainer, defaultContainer } from '../../tests/utils';

describe('Word', () => {
  it('should display the word name', () => {
    const word = 'chat';
    render(<Word word={word} />);

    expect(
      within(screen.queryByTestId('chat')!).getByText('chat'),
    ).toBeInTheDocument();
  });

  it('should display a button to hear', () => {
    const word = 'chat';
    render(<Word word={word} />);

    expect(
      within(screen.queryByTestId('chat')!).getByText('Écouter'),
    ).toBeInTheDocument();
  });

  it('should display a button to record', () => {
    const word = 'chat';
    render(<Word word={word} />);

    expect(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    ).toBeInTheDocument();
  });

  describe('play audio', () => {
    it('should call the voice synthetiser for a given word when clicking on the "hear" button', async () => {
      const speechSynth = {
        speak: () => {},
      };

      const spyOnSpeak = jest.spyOn(speechSynth, 'speak');

      const container = createContainer({
        speechSynth,
      });

      render(
        <ServiceContainerContext.Provider value={container}>
          <Word word={'chat'} />
        </ServiceContainerContext.Provider>,
      );

      await userEvent.click(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      );

      expect(spyOnSpeak).toHaveBeenCalledWith('chat');
    });
  });

  describe('record', () => {
    // au click sur le bouton enregistrer le texte devient arrêter l'enregistrement
    // la fonction record est déclenché
    // l'utilisateur prononce un mot
    // l'utilisateur clique sur arrêter l'enregistrement

    describe('when not recording', () => {
      it('should display Arrêter l/enregistrement after clicking on record button', async () => {
        render(
          <ServiceContainerContext.Provider value={defaultContainer}>
            <Word word={'chat'} />
          </ServiceContainerContext.Provider>,
        );
        await userEvent.click(
          within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
        );

        expect(
          within(screen.queryByTestId('chat')!).getByText(
            "Arrêter l'enregistrement",
          ),
        ).toBeInTheDocument();
      });

      describe('when recording', () => {
        it('should display Enregistrer after clicking on record button', async () => {
          render(
            <ServiceContainerContext.Provider value={defaultContainer}>
              <Word word={'chat'} defaultIsRecording={true} />
            </ServiceContainerContext.Provider>,
          );
          await userEvent.click(
            within(screen.queryByTestId('chat')!).getByText(
              "Arrêter l'enregistrement",
            ),
          );

          expect(
            within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
          ).toBeInTheDocument();
        });
      });
    });
  });
});
