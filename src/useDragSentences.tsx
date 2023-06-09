import { useState } from 'react';

export const useDragSentences = (sentences: string[]) => {
  const [availableSentences, setAvailableSentences] =
    useState<string[]>(sentences);
  const [slots, setSlots] = useState<string[]>(sentences.map(() => ''));
  const [draggedSentenceIndex, setDraggedSentenceIndex] = useState<
    number | undefined
  >(undefined);

  const handleDrop = (slotIndex: number) => () => {
    if (draggedSentenceIndex !== undefined) {
      setAvailableSentences(
        availableSentences.filter((_, index) => index !== draggedSentenceIndex),
      );
      setSlots([
        ...slots.slice(0, slotIndex),
        availableSentences[draggedSentenceIndex],
        ...slots.slice(slotIndex + 1),
      ]);
      setDraggedSentenceIndex(undefined);
    }
  };

  const handleDragStart = (index: number) => () =>
    setDraggedSentenceIndex(index);

  return {
    availableSentences,
    slots,
    handleDragStart,
    handleDrop,
  };
};
