import { useContext } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';
import { SpeechRecorder } from './SpeechRecorder';

type WordProps = {
  word: string;
};

export const Word = ({ word }: WordProps) => {
  const { speechSynth } = useContext(VoiceRecognitionContext);

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  return (
    <div data-testid={word}>
      <img src="chat.jpg" alt={word} data-testid={`img-${word}`} />
      <p>{word}</p>
      <button onClick={handleSpeak(word)}>Écouter</button>
      <SpeechRecorder text={word} />
    </div>
  );
};
