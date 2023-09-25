import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppContext } from '../service-container/ServiceContainerContext';
import { Layout } from '../views/layouts/Layout';
import { Link } from '../views/Link';

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

const useLoadDataBeforeRendering = () => {
  const { backend, useTrainingsStore } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const { setTrainings } = useTrainingsStore();

  useEffect(() => {
    const loadData = async () => {
      const trainings = await backend.getTrainings();
      setTrainings(trainings);
      setIsLoading(false);
    };

    loadData();
  }, [backend, setTrainings]);

  return isLoading;
};

export const Dashboard = () => {
  const isLoading = useLoadDataBeforeRendering();
  const { useTrainingsStore } = useAppContext();
  const { textReorders, wordRecognitions } = useTrainingsStore();

  if (isLoading) {
    return <div data-testid="loader">loading</div>;
  }

  return (
    <Layout>
      <DashboardContainer data-testid="dashboard">
        <WelcomeText>Bonjour</WelcomeText>
        <Text>Vos entrainements :</Text>
        {textReorders.map(({ id, title }) => {
          return (
            <Link to={`/text-reorder/${id}`} relative="path" key={id}>
              {title}
            </Link>
          );
        })}
        {wordRecognitions.map(({ id, title }) => {
          return (
            <Link to={`/word-recognition/${id}`} relative="path" key={id}>
              {title}
            </Link>
          );
        })}
      </DashboardContainer>
    </Layout>
  );
};
