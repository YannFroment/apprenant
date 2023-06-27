import { useContext } from 'react';

import { AppContext } from '../service-container/ServiceContainerContext';

type ListenProps = {
  word: string;
};

export const Listen = ({ word }: ListenProps) => {
  const { speechSynth } = useContext(AppContext);

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  return (
    <button data-testid={`listen-${word}`} onClick={handleSpeak(word)}>
      Écouter
    </button>
  );
};
