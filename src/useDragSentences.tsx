import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  defaultPickedFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  pickFromRight: (index: number) => void;
  pickedFromRightIndex?: number;
  putToLeft: () => void;
  rightSentences: string[];
};

export const useDragSentences = ({
  initialSentences,
  defaultPickedFromRightIndex,
}: UseDragSentencesProps): UseDragSentencesReturn => {
  const [pickedFromRightIndex, setPickedFromRightIndex] = useState<
    number | undefined
  >(defaultPickedFromRightIndex);

  const pickFromRight = (index: number) => {
    setPickedFromRightIndex(index);
  };

  const putToLeft = () => {
    setRightSentences(
      rightSentences.filter((_, index) => index !== pickedFromRightIndex),
    );
  };

  const [rightSentences, setRightSentences] =
    useState<string[]>(initialSentences);

  return {
    pickFromRight,
    pickedFromRightIndex,
    putToLeft,
    rightSentences,
  };
};
