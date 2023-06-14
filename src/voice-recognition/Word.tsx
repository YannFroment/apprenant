import { useContext } from 'react';
import { ServiceContainerContext } from '../service-container/ServiceContainerContext';
import { useVoiceRecognition } from './UseVoiceRecognition';

type WordProps = {
  word: string;
  defaultIsRecording?: boolean;
};

export const Word = ({ word, defaultIsRecording }: WordProps) => {
  const { speechSynth } = useContext(ServiceContainerContext);
  const { isRecording, clickRecordButton } = useVoiceRecognition({
    defaultIsRecording,
  });

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  const handleRecord = () => {
    clickRecordButton();
  };

  return (
    <div data-testid={word}>
      <p>{word}</p>
      <button onClick={handleSpeak(word)}>Écouter</button>
      <button onClick={handleRecord}>
        {isRecording ? "Arrêter l'enregistrement" : 'Enregistrer'}
      </button>
    </div>
  );
};
