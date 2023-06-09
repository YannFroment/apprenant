import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  defaultSelectedFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  selectSentenceFromRight: (index: number) => void;
  moveSentenceFromRightToLeft: (leftSentenceIndex: number) => void;
  rightSentences: string[];
  leftSentences: string[];
  selectedFromRightIndex?: number;
};

export const useDragSentences = ({
  initialSentences,
  defaultSelectedFromRightIndex,
}: UseDragSentencesProps): UseDragSentencesReturn => {
  const [selectedFromRightIndex, setSelectedFromRightIndex] = useState<
    number | undefined
  >(defaultSelectedFromRightIndex);

  const selectSentenceFromRight = (index: number) => {
    setSelectedFromRightIndex(index);
  };

  const moveSentenceFromRightToLeft = (leftSentenceIndex: number) => {
    if (selectedFromRightIndex !== undefined) {
      setLeftSentences([
        ...leftSentences.slice(0, leftSentenceIndex),
        rightSentences[selectedFromRightIndex],
        ...leftSentences.slice(leftSentenceIndex + 1),
      ]);
      setRightSentences(
        rightSentences.filter((_, index) => index !== selectedFromRightIndex),
      );
    }
  };

  const [leftSentences, setLeftSentences] = useState<string[]>(
    initialSentences.map(() => ''),
  );

  const [rightSentences, setRightSentences] =
    useState<string[]>(initialSentences);

  return {
    selectSentenceFromRight,
    moveSentenceFromRightToLeft,
    rightSentences,
    leftSentences,
    selectedFromRightIndex,
  };
};
