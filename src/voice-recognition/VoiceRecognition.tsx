import { useContext, useState } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';
import { Word } from './Word';

type VoiceRecognitionProps = {
  words?: string[];
  defaultIsRecording?: boolean;
};

export const VoiceRecognition = (
  { words }: VoiceRecognitionProps = { words: [] },
) => {
  const [buttonText, setButtonText] = useState('click me');

  const { voiceRecognition } = useContext(VoiceRecognitionContext);

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
        <Word key={word} word={word} />
      ))}
    </div>
  );
};
