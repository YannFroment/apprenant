import { useState } from 'react';

export const useDragSentences = (sentences: string[]) => {
  const [pickedFromRightIndex, setPickedFromRightIndex] = useState<
    number | undefined
  >(undefined);
  const pickFromRight = (index: number) => {
    setPickedFromRightIndex(index);
  };

  return {
    sentences,
    pickFromRight,
    pickedFromRightIndex,
  };
};
