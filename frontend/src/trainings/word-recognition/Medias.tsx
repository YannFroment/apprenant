import styled from 'styled-components';

import { Word } from '../../domain/Backend';
import { Media } from './Media';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type MediasProps = {
  words?: Word[];
};

export const Medias = ({ words }: MediasProps = { words: [] }) => {
  return (
    <Container>
      {words?.map((word) => (
        <Media key={word.id} word={word} />
      ))}
    </Container>
  );
};
