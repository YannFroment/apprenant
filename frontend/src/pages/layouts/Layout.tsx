import { ReactNode } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import styled from 'styled-components';

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
