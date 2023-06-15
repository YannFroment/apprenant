import { render, within, screen } from '@testing-library/react';
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
});
