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

    it('should start recording when clicking on Enregistrer', async () => {
      const recorderReturn: ReturnType<Recorder> = {
        start: () => {},
        stop: () => {},
      };
      const spyOnStart = jest.spyOn(recorderReturn, 'start');

      const recorder: Recorder = () => {
        return recorderReturn;
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

      expect(spyOnStart).toHaveBeenCalled();
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

    it("should stop recording when clicking on Arrêter l'enregistrement", async () => {
      const recorderReturn: ReturnType<Recorder> = {
        start: () => {},
        stop: () => {},
      };
      const spyOnStop = jest.spyOn(recorderReturn, 'stop');

      const recorder: Recorder = () => {
        return recorderReturn;
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

      expect(spyOnStop).toHaveBeenCalled();
    });
  });

  it('should display the transcript if learner mispronounced the text', async () => {
    const recorder: Recorder = (saveTranscript) => {
      return {
        start: () => {},
        stop: () => {
          saveTranscript('chat mal prononcé');
        },
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
      within(screen.queryByTestId('chat-transcript')!).getByText(
        'chat mal prononcé',
      ),
    ).toBeInTheDocument();
  });

  it('should not display the transcript if learner pronounced the text correctly', async () => {
    const recorder: Recorder = (saveTranscript) => {
      return {
        start: () => {},
        stop: () => {
          saveTranscript('chat');
        },
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

    expect(screen.queryByTestId('chat-transcript')).not.toBeInTheDocument();
  });
});
