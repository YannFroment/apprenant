import { useAppContext } from '../../service-container/ServiceContainerContext';

type ListenProps = {
  word: string;
};

export const Listen = ({ word }: ListenProps) => {
  const { speechSynth } = useAppContext();

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  return (
    <button data-testid={`listen-${word}`} onClick={handleSpeak(word)}>
      Écouter
    </button>
  );
};
