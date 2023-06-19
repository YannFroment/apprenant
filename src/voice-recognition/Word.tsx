import { useContext, useEffect, useState } from 'react';
import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';
import { SpeechRecorder } from './SpeechRecorder';

type WordProps = {
  word: string;
};

export const Word = ({ word }: WordProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { speechSynth, pictures } = useContext(VoiceRecognitionContext);

  const handleSpeak = (word: string) => () => {
    speechSynth.speak(word);
  };

  useEffect(() => {
    pictures.get(word).then((url) => {
      setImageUrl(url);
    });
  }, [word, pictures]);

  return (
    <div data-testid={word}>
      <img src={imageUrl} alt={word} data-testid={`img-${word}`} />
      <p>{word}</p>
      <button onClick={handleSpeak(word)}>Écouter</button>
      <SpeechRecorder text={word} />
    </div>
  );
};
