import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  initialLeftSentences?: string[];
  defaultSelectedSentenceFromLeftIndex?: number;
  defaultSelectedSentenceFromRightIndex?: number;
};

type UseDragSentencesReturn = {
  selectSentenceFromLeft: (index: number) => void;
  selectSentenceFromRight: (index: number) => void;
  moveSentenceFromLeftToLeft: (targetLeftSentenceIndex: number) => void;
  moveSentenceFromLeftToRight: () => void;
  moveSentenceFromRightToLeft: (leftSentenceIndex: number) => void;
  rightSentences: string[];
  leftSentences: string[];
  selectedSentenceFromLeftIndex?: number;
  selectedSentenceFromRightIndex?: number;
};

export const useDragSentences = ({
  initialSentences,
  initialLeftSentences,
  defaultSelectedSentenceFromLeftIndex,
  defaultSelectedSentenceFromRightIndex,
}: UseDragSentencesProps): UseDragSentencesReturn => {
  const [selectedSentenceFromRightIndex, setSelectedSentenceFromRightIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromRightIndex);
  const [selectedSentenceFromLeftIndex, setSelectedSentenceFromLeftIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromLeftIndex);

  const selectSentenceFromLeft = (index: number) => {
    setSelectedSentenceFromLeftIndex(index);
  };

  const selectSentenceFromRight = (index: number) => {
    setSelectedSentenceFromRightIndex(index);
  };

  const moveSentenceFromLeftToLeft = (targetLeftSentenceIndex: number) => {
    if (selectedSentenceFromLeftIndex !== undefined) {
      setLeftSentences(
        leftSentences.map((sentence, index) => {
          if (index === selectedSentenceFromLeftIndex) {
            return leftSentences[targetLeftSentenceIndex];
          }

          if (index === targetLeftSentenceIndex) {
            return leftSentences[selectedSentenceFromLeftIndex];
          }

          return sentence;
        }),
      );
    }
  };

  const moveSentenceFromLeftToRight = () => {
    if (selectedSentenceFromLeftIndex !== undefined) {
      setRightSentences([
        ...rightSentences,
        leftSentences[selectedSentenceFromLeftIndex],
      ]);
      setLeftSentences(
        leftSentences.map((sentence, index) => {
          if (index === selectedSentenceFromLeftIndex) {
            return '';
          }

          return sentence;
        }),
      );
    }
  };

  const moveSentenceFromRightToLeft = (leftSentenceIndex: number) => {
    setSelectedSentenceFromRightIndex(undefined);

    if (leftSentences[leftSentenceIndex] !== '') {
      return;
    }

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
    initialLeftSentences
      ? initialLeftSentences
      : initialSentences.map(() => ''),
  );

  const [rightSentences, setRightSentences] =
    useState<string[]>(initialSentences);

  return {
    selectSentenceFromLeft,
    selectSentenceFromRight,
    moveSentenceFromLeftToLeft,
    moveSentenceFromLeftToRight,
    moveSentenceFromRightToLeft,
    rightSentences,
    leftSentences,
    selectedSentenceFromRightIndex,
    selectedSentenceFromLeftIndex,
  };
};
