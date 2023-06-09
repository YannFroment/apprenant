import { useState } from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

const Panel = styled.div`
  width: 50vw;
`;

const Box = styled.div<{
  $width?: string;
  $height?: string;
  $bgColor?: string;
  $color?: string;
}>`
  width: ${({ $width }) => $width || 'auto'};
  height: ${({ $height }) => $height || 'auto'};
  background-color: ${({ $bgColor }) => $bgColor || 'lightblue'};
  color: ${({ $color }) => $color || 'black'};
  border: 1px red solid;
  margin: 8px 0;
`;

const Text = styled.p``;

type WorkzoneProps = {
  sentences: string[];
};

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

export const WorkZone = ({ sentences }: WorkzoneProps) => {
  const { slots, handleDrop, availableSentences, handleDragStart } =
    useDragSentences(sentences);
  return (
    <Flex>
      <Panel>
        {slots.map((sentence, index) => (
          <Box
            key={index}
            $width="100%"
            $height="32px"
            onDrop={handleDrop(index)}
            onDragOver={(e) => e.preventDefault()} // necessary to do the trick
          >
            {sentence && <Text>{sentence}</Text>}
          </Box>
        ))}
      </Panel>
      <Panel>
        {availableSentences.map((sentence, index) => (
          <Text draggable key={index} onDragStart={handleDragStart(index)}>
            {sentence}
          </Text>
        ))}
      </Panel>
    </Flex>
  );
};
