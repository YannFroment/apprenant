import { useContext, useState } from 'react';
import { ServiceContainerContext } from '../service-container/ServiceContainerContext';
import { useVoiceRecognition } from './UseVoiceRecognition';

type VoiceRecognitionProps = {
  words?: string[];
  defaultIsRecording?: boolean;
};

export const VoiceRecognition = (
  { words, defaultIsRecording }: VoiceRecognitionProps = { words: [] },
) => {
  const [buttonText, setButtonText] = useState('click me');
  const { isRecording, clickRecordButton } = useVoiceRecognition({
    defaultIsRecording,
  });

  const { voiceRecognition, speechSynth } = useContext(ServiceContainerContext);

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  const handleClick = () => {
    if (voiceRecognition.recognize()) {
      return setButtonText('it is a match!');
    }

    return setButtonText('not a match!');
  };

  const handleRecord = () => {
    clickRecordButton();
  };

  return (
    <div>
      <button onClick={handleClick} type="button">
        {buttonText}
      </button>
      {words?.map((word) => (
        <div data-testid={word} key={word}>
          <p>{word}</p>
          <button onClick={handleSpeak(word)}>Écouter</button>
          <button onClick={handleRecord}>
            {isRecording ? "Arrêter l'enregistrement" : 'Enregistrer'}
          </button>
        </div>
      ))}
    </div>
  );
};
