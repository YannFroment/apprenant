import styled from 'styled-components';

import { useAppContext } from '../../service-container/ServiceContainerContext';
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
}

export type WordRecognitionProps = {
  id: number;
  title: string;
  words: Word[];
}

export const WordRecognition = ({id, title, words}: WordRecognitionProps) => {

  return (
    <Container>
      {words?.map((word) => (
        <Media key={word.id} word={word} />
      ))}
    </Container>
  );
};
