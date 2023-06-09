import { useState } from 'react';

type UseDragSentencesProps = {
  initialSentences: string[];
  initialLeftSentences?: string[];
  defaultSelectedSentenceFromLeftIndex?: number;
  defaultSelectedSentenceFromRightIndex?: number;
  defaultTargetedSentenceFromLeftIndex?: number;
};

type UseDragSentencesReturn = {
  selectSentenceFromLeft: (index: number) => void;
  selectSentenceFromRight: (index: number) => void;
  updateTargetedSentenceFromLeftIndex: (index?: number) => void;
  moveSentenceToRight: () => void;
  moveSentenceToLeft: (targetLeftSentenceIndex: number) => void;
  rightSentences: string[];
  leftSentences: string[];
  selectedSentenceFromLeftIndex?: number;
  selectedSentenceFromRightIndex?: number;
  targetedSentenceFromLeftIndex?: number;
};

export const useDragSentences = ({
  initialSentences,
  initialLeftSentences,
  defaultSelectedSentenceFromLeftIndex,
  defaultSelectedSentenceFromRightIndex,
  defaultTargetedSentenceFromLeftIndex,
}: UseDragSentencesProps): UseDragSentencesReturn => {
  const [selectedSentenceFromRightIndex, setSelectedSentenceFromRightIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromRightIndex);
  const [selectedSentenceFromLeftIndex, setSelectedSentenceFromLeftIndex] =
    useState<number | undefined>(defaultSelectedSentenceFromLeftIndex);
  const [targetedSentenceFromLeftIndex, setTargetedSentenceFromLeftIndex] =
    useState<number | undefined>(defaultTargetedSentenceFromLeftIndex);

  const selectSentenceFromLeft = (index: number) => {
    setSelectedSentenceFromLeftIndex(index);
  };

  const selectSentenceFromRight = (index: number) => {
    setSelectedSentenceFromRightIndex(index);
  };

  const updateTargetedSentenceFromLeftIndex = (index?: number) => {
    setTargetedSentenceFromLeftIndex(index);
  };

  const moveSentenceFromLeftToLeft = (targetLeftSentenceIndex: number) => {
    setSelectedSentenceFromLeftIndex(undefined);

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

  const moveSentenceToRight = () => {
    setSelectedSentenceFromLeftIndex(undefined);

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

  const moveSentenceToLeft = (targetLeftSentenceIndex: number) => {
    if (selectedSentenceFromLeftIndex !== undefined) {
      return moveSentenceFromLeftToLeft(targetLeftSentenceIndex);
    }

    return moveSentenceFromRightToLeft(targetLeftSentenceIndex);
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
    updateTargetedSentenceFromLeftIndex,
    moveSentenceToRight,
    moveSentenceToLeft,
    rightSentences,
    leftSentences,
    selectedSentenceFromRightIndex,
    selectedSentenceFromLeftIndex,
    targetedSentenceFromLeftIndex,
  };
};
