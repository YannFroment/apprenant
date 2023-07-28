import styled from 'styled-components';

import { Media } from './Media';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Word = {
  id: number;
  label: string;
  url: string;
};

export type WordRecognitionProps = {
  words: Word[];
};

export const WordRecognition = ({ words }: WordRecognitionProps) => {
  return (
    <Container data-testid="word-recognition-training">
      {words?.map((word) => (
        <Media key={word.id} word={word} />
      ))}
    </Container>
  );
};
