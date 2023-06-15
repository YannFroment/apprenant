import { useContext, useEffect, useState } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

type SpeechRecorderProps = {
  text: string;
};

export const SpeechRecorder = ({ text }: SpeechRecorderProps) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { recorder } = useContext(VoiceRecognitionContext);

  useEffect(() => {
    const { start, stop } = recorder(setTranscript);
    if (isListening) {
      start();
    }

    return () => {
      stop();
    };
  }, [isListening, recorder]);

  return (
    <div data-testid={text}>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? "Arrêter l'enregistrement" : 'Enregistrer'}
      </button>
      <p>Transcript: {transcript}</p>
      <div>{text === transcript.toLowerCase() ? 'réussi !' : 'raté'}</div>
    </div>
  );
};
