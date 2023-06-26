import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  height: 80px;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.font.size.medium};
`;

const StyledImage = styled.img<{
  $height: string;
  $width: string;
}>`
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
`;

const HeaderImage = () => {
  return (
    <NavLink to="/">
      <StyledImage
        src="https://res.cloudinary.com/apprenantv1-repo1/image/upload/v1687781189/logo_apprenant-X1_gris_rwzmnz.png"
        $height={'64px'}
        $width={'64px'}
      />
    </NavLink>
  );
};

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.blue};
`;

const HomeLink = () => {
  return <StyledLink to="/">Accueil</StyledLink>;
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Nav>
        <HeaderImage />
        <HomeLink />
      </Nav>
    </StyledHeader>
  );
};
