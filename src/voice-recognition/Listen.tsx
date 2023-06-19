import { useContext } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

type ListenProps = {
  word: string;
};

export const Listen = ({ word }: ListenProps) => {
  const { speechSynth } = useContext(VoiceRecognitionContext);

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  return <button onClick={handleSpeak(word)}>Écouter</button>;
};
