import styled from 'styled-components';

import { Word } from './Word';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type WordsContainerProps = {
  words?: string[];
};

export const WordsContainer = (
  { words }: WordsContainerProps = { words: [] },
) => {
  return (
    <Container>
      {words?.map((word) => (
        <Word key={word} word={word} />
      ))}
    </Container>
  );
};
