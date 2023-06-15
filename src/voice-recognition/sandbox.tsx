import { useEffect, useState } from 'react';

type RecognizerArgs = {
  setTranscript: (transcript: string) => void;
  startListening: () => void;
  stopListening: () => void;
};

type Recognizer = ({
  setTranscript,
  startListening,
  stopListening,
}: RecognizerArgs) => {
  start: () => void;
  stop: () => void;
};

const recognizer: Recognizer = ({
  setTranscript,
  startListening,
  stopListening,
}) => {
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
    setTranscript(transcript);
    stopListening();
  };

  const start = () => {
    recognition.start();
    startListening();
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
    const { start, stop } = recognizer({
      setTranscript,
      startListening: () => setIsListening(true),
      stopListening: () => setIsListening(false),
    });
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
