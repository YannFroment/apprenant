import { useEffect, useState } from 'react';

type Recorder = (saveTranscript: (transcript: string) => void) => {
  start: () => void;
  stop: () => void;
};

const recorder: Recorder = (saveTranscript) => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = false;

  let transcript = '';
  const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
    transcript = event.results[0][0].transcript;
  };

  recognition.onresult = handleRecognitionResult;
  recognition.onend = () => {
    saveTranscript(transcript);
  };

  const start = () => {
    recognition.start();
  };

  const stop = () => {
    recognition.stop();
  };

  return {
    start,
    stop,
  };
};

export const SpeechRecognitionComponent = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const { start, stop } = recorder(setTranscript);
    if (isListening) {
      start();
    }

    return () => {
      stop();
    };
  }, [isListening]);

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
