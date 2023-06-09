import styled from 'styled-components';
import { useDragSentences } from './useDragSentences';

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

export const WorkZone = ({ sentences }: WorkzoneProps) => {
  const {
    leftSentences,
    moveSentenceToLeft,
    moveSentenceToRight,
    rightSentences,
    selectSentenceFromLeft,
    selectSentenceFromRight,
    updateTargetedSentenceFromLeftIndex,
  } = useDragSentences({ initialSentences: sentences });
  return (
    <Flex>
      <Panel>
        {leftSentences.map((sentence, index) => (
          <Box
            key={index}
            $width="100%"
            $height="32px"
            onDrop={moveSentenceToLeft}
            onDragOver={(e) => e.preventDefault()} // necessary to do the trick
            onDragEnter={() => updateTargetedSentenceFromLeftIndex(index)}
            onDragLeave={() => updateTargetedSentenceFromLeftIndex()}
          >
            {
              <Text draggable onDragStart={() => selectSentenceFromLeft(index)}>
                {sentence}
              </Text>
            }
          </Box>
        ))}
      </Panel>
      <Panel
        onDrop={moveSentenceToRight}
        onDragOver={(e) => e.preventDefault()}
      >
        {rightSentences.map((sentence, index) => (
          <Text
            draggable
            key={index}
            onDragStart={() => selectSentenceFromRight(index)}
          >
            {sentence}
          </Text>
        ))}
      </Panel>
    </Flex>
  );
};
