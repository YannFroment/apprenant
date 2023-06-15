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
  let transcript = '';
  const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
    transcript = event.results[0][0].transcript;
  };
  recognition.onresult = handleRecognitionResult;
  recognition.onend = () => {
    setTranscript(transcript);
    setIsListening(false);
  };

  const startRecognition = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopRecognition = () => {
    recognition.stop();
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

  const text = 'le chat a mangé la souris';

  return (
    <div>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
      <div>{text === transcript.toLowerCase() ? 'réussi !' : 'raté'}</div>
    </div>
  );
}
