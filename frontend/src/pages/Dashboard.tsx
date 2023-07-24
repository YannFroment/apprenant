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

export const Dashboard = () => {
  const { useStore } = useAppContext();
  const { textReorders } = useStore();

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

        <Link to="/word-recognition" relative="path">
          Reconnaître les mots
        </Link>
      </DashboardContainer>
    </Layout>
  );
};
