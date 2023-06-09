import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  defaultSelectedSentenceFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  selectSentenceFromLeft: (index: number) => void;
  selectSentenceFromRight: (index: number) => void;
  moveSentenceFromRightToLeft: (leftSentenceIndex: number) => void;
  rightSentences: string[];
  leftSentences: string[];
  selectedSentenceFromLeftIndex?: number;
  selectedSentenceFromRightIndex?: number;
};

export const useDragSentences = ({
  initialSentences,
  defaultSelectedSentenceFromRightIndex,
}: UseDragSentencesProps): UseDragSentencesReturn => {
  const [selectedSentenceFromRightIndex, setSelectedSentenceFromRightIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromRightIndex);
  const [selectedSentenceFromLeftIndex, setSelectedSentenceFromLeftIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromRightIndex);

  const selectSentenceFromLeft = (index: number) => {
    setSelectedSentenceFromLeftIndex(index);
  };

  const selectSentenceFromRight = (index: number) => {
    setSelectedSentenceFromRightIndex(index);
  };

  const moveSentenceFromRightToLeft = (leftSentenceIndex: number) => {
    if (selectedSentenceFromRightIndex !== undefined) {
      setLeftSentences([
        ...leftSentences.slice(0, leftSentenceIndex),
        rightSentences[selectedSentenceFromRightIndex],
        ...leftSentences.slice(leftSentenceIndex + 1),
      ]);
      setRightSentences(
        rightSentences.filter(
          (_, index) => index !== selectedSentenceFromRightIndex,
        ),
      );
    }
  };

  const [leftSentences, setLeftSentences] = useState<string[]>(
    initialSentences.map(() => ''),
  );

  const [rightSentences, setRightSentences] =
    useState<string[]>(initialSentences);

  return {
    selectSentenceFromLeft,
    selectSentenceFromRight,
    moveSentenceFromRightToLeft,
    rightSentences,
    leftSentences,
    selectedSentenceFromRightIndex,
    selectedSentenceFromLeftIndex,
  };
};
