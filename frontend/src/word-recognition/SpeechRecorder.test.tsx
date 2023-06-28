import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithinProviders } from '../../tests/utils';
import { SpeechRecorderFactory } from '../domain/SpeechRecorderFactory';
import { SpeechRecorder } from './SpeechRecorder';

describe('SpeechRecorder', () => {
  it('should display a button to record', () => {
    renderWithinProviders(<SpeechRecorder text={'chat'} />);

    expect(
      within(screen.queryByTestId('chat-speech-recorder')!).getByText(
        'Enregistrer',
      ),
    ).toBeInTheDocument();
  });

  describe('when not recording', () => {
    it('should display Arrêter l/enregistrement after clicking on record button', async () => {
      renderWithinProviders(<SpeechRecorder text={'chat'} />);
      await userEvent.click(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          'Enregistrer',
        ),
      );

      expect(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          "Arrêter l'enregistrement",
        ),
      ).toBeInTheDocument();
    });

    it('should start recording when clicking on Enregistrer', async () => {
      const recorderFactoryReturn: ReturnType<SpeechRecorderFactory> = {
        start: () => {},
        stop: () => {},
      };
      const spyOnStart = jest.spyOn(recorderFactoryReturn, 'start');

      const speechRecorderFactoryMock: SpeechRecorderFactory = () => {
        return recorderFactoryReturn;
      };

      renderWithinProviders(<SpeechRecorder text={'chat'} />, {
        speechRecorderFactory: speechRecorderFactoryMock,
      });
      await userEvent.click(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          'Enregistrer',
        ),
      );

      expect(spyOnStart).toHaveBeenCalled();
    });
  });

  describe('when recording', () => {
    it('should display Enregistrer after clicking on record button', async () => {
      renderWithinProviders(
        <SpeechRecorder text={'chat'} defaultIsRecording={true} />,
      );
      await userEvent.click(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          "Arrêter l'enregistrement",
        ),
      );

      expect(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          'Enregistrer',
        ),
      ).toBeInTheDocument();
    });

    it("should stop recording when clicking on Arrêter l'enregistrement", async () => {
      const recorderFactoryReturn: ReturnType<SpeechRecorderFactory> = {
        start: () => {},
        stop: () => {},
      };
      const spyOnStop = jest.spyOn(recorderFactoryReturn, 'stop');

      const speechRecorderFactoryMock: SpeechRecorderFactory = () => {
        return recorderFactoryReturn;
      };

      renderWithinProviders(
        <SpeechRecorder text={'chat'} defaultIsRecording={true} />,
        {
          speechRecorderFactory: speechRecorderFactoryMock,
        },
      );
      await userEvent.click(
        within(screen.queryByTestId('chat-speech-recorder')!).getByText(
          "Arrêter l'enregistrement",
        ),
      );

      expect(spyOnStop).toHaveBeenCalled();
    });
  });

  it('should display the transcript if learner mispronounced the text', async () => {
    const speechRecorderFactoryMock: SpeechRecorderFactory = (
      saveTranscript,
    ) => {
      return {
        start: () => {},
        stop: () => {
          saveTranscript('chat mal prononcé');
        },
      };
    };

    renderWithinProviders(<SpeechRecorder text={'chat'} />, {
      speechRecorderFactory: speechRecorderFactoryMock,
    });
    await userEvent.click(
      within(screen.queryByTestId('chat-speech-recorder')!).getByText(
        'Enregistrer',
      ),
    );

    expect(
      within(screen.queryByTestId('chat-transcript')!).getByText(
        'chat mal prononcé',
      ),
    ).toBeInTheDocument();
  });

  it('should not display the transcript if learner pronounced the text correctly', async () => {
    const speechRecorderFactoryMock: SpeechRecorderFactory = (
      saveTranscript,
    ) => {
      return {
        start: () => {},
        stop: () => {
          saveTranscript('chat');
        },
      };
    };

    renderWithinProviders(<SpeechRecorder text={'chat'} />, {
      speechRecorderFactory: speechRecorderFactoryMock,
    });
    await userEvent.click(
      within(screen.queryByTestId('chat-speech-recorder')!).getByText(
        'Enregistrer',
      ),
    );

    expect(screen.queryByTestId('chat-transcript')).not.toBeInTheDocument();
  });

  it('should display check icon if learner pronounced the text correctly', async () => {
    const speechRecorderFactoryMock: SpeechRecorderFactory = (
      saveTranscript,
    ) => {
      return {
        start: () => {},
        stop: () => {
          saveTranscript('chat');
        },
      };
    };

    renderWithinProviders(<SpeechRecorder text={'chat'} />, {
      speechRecorderFactory: speechRecorderFactoryMock,
    });
    await userEvent.click(
      within(screen.queryByTestId('chat-speech-recorder')!).getByText(
        'Enregistrer',
      ),
    );

    expect(screen.queryByTestId('chat-success')).toBeInTheDocument();
  });
});
