import styled from 'styled-components';
import { Word } from './Word';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type VoiceRecognitionProps = {
  words?: string[];
  defaultIsRecording?: boolean;
};

export const VoiceRecognition = (
  { words }: VoiceRecognitionProps = { words: [] },
) => {
  return (
    <Container>
      {words?.map((word) => (
        <Word key={word} word={word} />
      ))}
    </Container>
  );
};
