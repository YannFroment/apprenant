import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { Link } from '../views/Link';
import { Layout } from './layouts/Layout';

const DashboardContainer = styled.div`
  padding-top: 32px;
  padding-left: 88px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const WelcomeText = styled.h2`
  font-size: ${({ theme }) => theme.font.size.big};
  margin-bottom: ${({ theme }) => theme.spacing.big};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.font.size.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Dashboard = () => {
  const { backend } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      const result = await backend.get('http://localhost:3000/healthcheck');
      console.log(result);
    };
    fetchData();
  }, [backend]);
  return (
    <Layout>
      <DashboardContainer>
        <WelcomeText>Bonjour</WelcomeText>
        <Text>Vos entrainements :</Text>
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
