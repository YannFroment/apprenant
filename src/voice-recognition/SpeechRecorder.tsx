import { useContext, useEffect, useState } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

export const SpeechRecorder = () => {
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

  const text = 'le chat a mangé la souris';

  return (
    <div>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? "Arrêter l'enregistrement" : 'Enregistrer'}
      </button>
      <p>Transcript: {transcript}</p>
      <div>{text === transcript.toLowerCase() ? 'réussi !' : 'raté'}</div>
    </div>
  );
};
