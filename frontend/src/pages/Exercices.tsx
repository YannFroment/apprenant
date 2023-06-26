import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from './layouts/Layout';

const ExercicesContainer = styled.div`
  padding-top: 72px;
  padding-left: 72px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Exercices = () => {
  return (
    <Layout>
      <ExercicesContainer>
        <Link to="/text-reorder" relative="path">
          Remettre le texte dans l'ordre
        </Link>
        <Link to="/voice-recognition" relative="path">
          Reconnaître les mots
        </Link>
      </ExercicesContainer>
    </Layout>
  );
};
