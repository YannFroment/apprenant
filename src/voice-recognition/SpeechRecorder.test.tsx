import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeechRecorder } from './SpeechRecorder';
import { createContainer } from '../../tests/utils';
import { Recorder } from './domain/Recorder';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

describe('SpeechRecorder', () => {
  it('should display a button to record', () => {
    const recorder: Recorder = () => {
      return {
        start: () => {},
        stop: () => {},
      };
    };
    const container = createContainer({
      recorder,
    });
    render(
      <VoiceRecognitionContext.Provider value={container}>
        <SpeechRecorder text={'chat'} />
      </VoiceRecognitionContext.Provider>,
    );

    expect(
      within(screen.queryByTestId('chat')!).getByText('Enregistrer'),
    ).toBeInTheDocument();
  });

  describe('when not recording', () => {
    it('should display Arrêter l/enregistrement after clicking on record button', async () => {
      const recorder: Recorder = () => {
        return {
          start: () => {},
          stop: () => {},
        };
      };
      const container = createContainer({
        recorder,
      });

      render(
        <VoiceRecognitionContext.Provider value={container}>
          <SpeechRecorder text={'chat'} />
        </VoiceRecognitionContext.Provider>,
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
  });

  describe('when recording', () => {
    it('should display Enregistrer after clicking on record button', async () => {
      const recorder: Recorder = () => {
        return {
          start: () => {},
          stop: () => {},
        };
      };
      const container = createContainer({
        recorder,
      });
      render(
        <VoiceRecognitionContext.Provider value={container}>
          <SpeechRecorder text={'chat'} defaultIsRecording={true} />
        </VoiceRecognitionContext.Provider>,
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
