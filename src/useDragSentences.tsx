import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  defaultPickedFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  pickFromRight: (index: number) => void;
  putFromRightToLeft: (leftSentenceIndex: number) => void;
  rightSentences: string[];
  leftSentences: string[];
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

  const putFromRightToLeft = (leftSentenceIndex: number) => {
    if (pickedFromRightIndex !== undefined) {
      setLeftSentences([
        ...leftSentences.slice(0, leftSentenceIndex),
        rightSentences[pickedFromRightIndex],
        ...leftSentences.slice(leftSentenceIndex + 1),
      ]);
      setRightSentences(
        rightSentences.filter((_, index) => index !== pickedFromRightIndex),
      );
    }
  };

  const [leftSentences, setLeftSentences] = useState<string[]>(
    initialSentences.map(() => ''),
  );

  const [rightSentences, setRightSentences] =
    useState<string[]>(initialSentences);

  return {
    pickFromRight,
    putFromRightToLeft,
    rightSentences,
    leftSentences,
  };
};
