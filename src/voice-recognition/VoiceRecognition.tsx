import { useContext, useState } from 'react';
import { ServiceContainerContext } from '../service-container/ServiceContainerContext';

type VoiceRecognitionProps = {
  words?: string[];
};

export const VoiceRecognition = (
  { words }: VoiceRecognitionProps = { words: [] },
) => {
  const [buttonText, setButtonText] = useState('click me');

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

  return (
    <div>
      <button onClick={handleClick} type="button">
        {buttonText}
      </button>
      {words?.map((word) => (
        <div data-testid={word} key={word}>
          <p>{word}</p>
          <button onClick={handleSpeak(word)}>Écouter</button>
          <button>Enregistrer</button>
        </div>
      ))}
    </div>
  );
};
