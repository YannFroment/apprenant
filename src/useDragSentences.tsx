import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  defaultPickedFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  initialSentences: string[];
  pickFromRight: (index: number) => void;
  pickedFromRightIndex?: number;
  putToLeft: () => void;
  availableSentences: string[];
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
    setAvailableSentences(
      availableSentences.filter((_, index) => index !== pickedFromRightIndex),
    );
  };

  const [availableSentences, setAvailableSentences] =
    useState<string[]>(initialSentences);

  return {
    initialSentences,
    pickFromRight,
    pickedFromRightIndex,
    putToLeft,
    availableSentences,
  };
};
