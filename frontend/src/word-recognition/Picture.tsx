import { useEffect, useState } from 'react';

import { useAppContext } from '../service-container/ServiceContainerContext';

type PictureProps = {
  word: string;
};

export const Picture = ({ word }: PictureProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const { pictures } = useAppContext();

  useEffect(() => {
    pictures.get(word).then((url) => {
      setImageUrl(url);
    });
  }, [word, pictures]);

  return <img src={imageUrl} alt={word} data-testid={`img-${word}`} />;
};
