import styled from 'styled-components';

import { Link } from '../views/Link';
import { Layout } from './layouts/Layout';

const DashboardContainer = styled.div`
  padding-top: 72px;
  padding-left: 88px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

export const Dashboard = () => {
  return (
    <Layout>
      <DashboardContainer>
        <Link to="/text-reorder" relative="path">
          Remettre le texte dans l'ordre
        </Link>
        <Link to="/word-recognition" relative="path">
          Reconnaître les mots
        </Link>
      </DashboardContainer>
    </Layout>
  );
};
