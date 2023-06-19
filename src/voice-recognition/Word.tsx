import { useContext, useEffect, useState } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';
import { SpeechRecorder } from './SpeechRecorder';
import { Listen } from './Listen';

type WordProps = {
  word: string;
};

export const Word = ({ word }: WordProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { pictures } = useContext(VoiceRecognitionContext);

  useEffect(() => {
    pictures.get(word).then((url) => {
      setImageUrl(url);
    });
  }, [word, pictures]);

  return (
    <div data-testid={word}>
      <img src={imageUrl} alt={word} data-testid={`img-${word}`} />
      <p>{word}</p>
      <Listen word={word} />
      <SpeechRecorder text={word} />
    </div>
  );
};
