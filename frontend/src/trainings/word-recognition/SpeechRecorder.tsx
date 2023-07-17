import { useEffect, useState } from 'react';

import { useAppContext } from '../../service-container/ServiceContainerContext';

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
  const { speechRecorderFactory } = useAppContext();

  useEffect(() => {
    const { start, stop } = speechRecorderFactory(setTranscript);
    if (isRecording) {
      start();
    }

    return () => {
      stop();
    };
  }, [isRecording, speechRecorderFactory]);

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
