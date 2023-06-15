import { useEffect, useState } from 'react';

type Recognizer = {
  start: () => void;
  stop: () => void;
};

const recognizerFactory = ({
  setTranscript,
  setIsListening,
}: {
  setTranscript: (transcript: string) => void;
  setIsListening: (isListening: boolean) => void;
}): Recognizer => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = false;
  const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    setTranscript(transcript);
  };
  recognition.onresult = handleRecognitionResult;
  recognition.onend = () => setIsListening(false);

  const startRecognition = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopRecognition = () => {
    recognition.stop();
    recognition.onresult = null;
    setIsListening(false);
  };

  return {
    start: startRecognition,
    stop: stopRecognition,
  };
};

export function SpeechRecognitionComponent() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const { start, stop } = recognizerFactory({
      setTranscript,
      setIsListening,
    });
    if (isListening) {
      start();
    }

    return () => {
      stop();
    };
  }, [isListening]);

  const word = 'chien';

  return (
    <div>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
      <div>{word === transcript ? 'réussi !' : 'raté'}</div>
    </div>
  );
}
