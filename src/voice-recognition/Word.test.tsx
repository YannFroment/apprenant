import { render, within, screen } from '@testing-library/react';
import { Word } from './Word';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';
import userEvent from '@testing-library/user-event';
import { createContainer, defaultContainer } from '../../tests/utils';

describe('Word', () => {
  it('should display the word name', () => {
    render(
      <VoiceRecognitionContext.Provider value={defaultContainer}>
        <Word word={'chat'} />
      </VoiceRecognitionContext.Provider>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('chat'),
    ).toBeInTheDocument();
  });

  it('should display a button to hear', () => {
    render(
      <VoiceRecognitionContext.Provider value={defaultContainer}>
        <Word word={'chat'} />
      </VoiceRecognitionContext.Provider>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('Écouter'),
    ).toBeInTheDocument();
  });

  it('should display a button to record', () => {
    render(
      <VoiceRecognitionContext.Provider value={defaultContainer}>
        <Word word={'chat'} />
      </VoiceRecognitionContext.Provider>,
    );

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
        <VoiceRecognitionContext.Provider value={container}>
          <Word word={'chat'} />
        </VoiceRecognitionContext.Provider>,
      );

      await userEvent.click(
        within(screen.queryByTestId('chat')!).getByText('Écouter'),
      );

      expect(spyOnSpeak).toHaveBeenCalledWith('chat');
    });
  });

  it('should display VoiceRecognition component', () => {
    render(
      <VoiceRecognitionContext.Provider value={defaultContainer}>
        <Word word={'chat'} />
      </VoiceRecognitionContext.Provider>,
    );
    expect(screen.queryByTestId('chat-speech-recorder')).toBeInTheDocument();
  });
});
