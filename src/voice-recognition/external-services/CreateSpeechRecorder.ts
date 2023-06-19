import { CreateSpeechRecorder } from '../domain/CreateSpeechRecorder';

export const createWindowSpeechRecorder: CreateSpeechRecorder = (
  saveTranscript,
) => {
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
