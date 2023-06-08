import Draggable from 'react-draggable';
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

export const WorkZone = () => {
  const sentences = ['Text 1', 'Text 2', 'Text 3', 'Text 4'];

  return (
    <Flex>
      <Panel>
        {sentences.map(() => (
          <Box $width="100%" $height="32px"></Box>
        ))}
      </Panel>
      <Panel>
        {sentences.map((sentence) => (
          <Draggable>
            <Text>{sentence}</Text>
          </Draggable>
        ))}
      </Panel>
    </Flex>
  );
};
