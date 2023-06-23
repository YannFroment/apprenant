import { useContext, useEffect, useState } from 'react';

import { VoiceRecognitionContext } from './service-container/ServiceContainerContext';

type PictureProps = {
  word: string;
};

export const Picture = ({ word }: PictureProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { pictures } = useContext(VoiceRecognitionContext);

  useEffect(() => {
    pictures.get(word).then((url) => {
      setImageUrl(url);
    });
  }, [word, pictures]);

  return <img src={imageUrl} alt={word} data-testid={`img-${word}`} />;
};
