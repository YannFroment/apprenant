import { useContext, useState } from 'react';
import { ServiceContainerContext } from '../service-container/ServiceContainerContext';

type VoiceRecognizerProps = {
  words?: string[];
};

export const VoiceRecognizer = (
  { words }: VoiceRecognizerProps = { words: [] },
) => {
  const [buttonText, setButtonText] = useState('click me');

  const { voiceRecognition } = useContext(ServiceContainerContext);

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
        <p key={word}>{word}</p>
      ))}
    </div>
  );
};
