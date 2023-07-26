import styled from 'styled-components';

import { Media } from './Media';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type MediasProps = {
  words?: string[];
};

export const Medias = ({ words }: MediasProps = { words: [] }) => {
  return (
    <Container>
      {words?.map((word) => (
        <Media key={word} word={word} />
      ))}
    </Container>
  );
};
