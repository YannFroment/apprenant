import { ReactNode } from 'react';
import styled from 'styled-components';

import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

type LayoutProps = { children: ReactNode; headerLabel?: string };

const LayoutContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  font-family: ${({ theme }) => theme.font.family.default};
`;

export const Layout = ({ children, headerLabel }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header>{headerLabel ?? 'Texte par défaut du header'}</Header>
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};
