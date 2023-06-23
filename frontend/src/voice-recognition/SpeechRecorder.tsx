import { useContext, useEffect, useState } from 'react';

import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

type SpeechRecorderProps = {
  text: string;
  defaultIsRecording?: boolean;
};

export const SpeechRecorder = ({
  text,
  defaultIsRecording,
}: SpeechRecorderProps) => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState<boolean>(
    defaultIsRecording ?? false,
  );
  const { speechRecorderFactory: createSpeechRecorder } = useContext(
    VoiceRecognitionContext,
  );

  useEffect(() => {
    const { start, stop } = createSpeechRecorder(setTranscript);
    if (isRecording) {
      start();
    }

    return () => {
      stop();
    };
  }, [isRecording, createSpeechRecorder]);

  return (
    <div data-testid={`${text}-speech-recorder`}>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? "Arrêter l'enregistrement" : 'Enregistrer'}
      </button>
      {text !== transcript.toLowerCase() ? (
        <p data-testid={`${text}-transcript`}>{transcript}</p>
      ) : (
        <p data-testid={`${text}-success`}>&#9989;</p>
      )}
    </div>
  );
};
