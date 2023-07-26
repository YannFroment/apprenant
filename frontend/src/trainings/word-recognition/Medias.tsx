import styled from 'styled-components';

import { useAppContext } from '../../service-container/ServiceContainerContext';
import { Media } from './Media';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Medias = () => {
  const { useTrainingsStore } = useAppContext();

  const { wordRecognitions } = useTrainingsStore();

  const { words } = wordRecognitions[0];

  return (
    <Container>
      {words?.map((word) => (
        <Media key={word.id} word={word} />
      ))}
    </Container>
  );
};
