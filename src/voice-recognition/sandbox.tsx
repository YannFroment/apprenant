import { useEffect, useState } from 'react';

export function SpeechRecognitionComponent() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;

    const startRecognition = () => {
      recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = handleRecognitionResult;
      recognition.onend = () => setIsListening(false);
      recognition.start();
      setIsListening(true);
    };

    const handleRecognitionResult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }

      setTranscript(finalTranscript);
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
        recognition.onresult = null;
        setIsListening(false);
      }
    };

    if (isListening) {
      startRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [isListening]);

  return (
    <div>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}
