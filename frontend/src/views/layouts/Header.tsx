import styled from 'styled-components';

import { LogOut } from '../../auth/Login';
import { Link } from '../Link';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
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

const HeaderLogo = () => {
  return (
    <Link to="/">
      <StyledImage
        src="https://res.cloudinary.com/apprenantv1-repo1/image/upload/v1687781189/logo_apprenant-X1_gris_rwzmnz.png"
        $height={'64px'}
        $width={'64px'}
      />
    </Link>
  );
};

const HomeLink = () => {
  return <Link to="/">Accueil</Link>;
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
        <HeaderLogo />
        <HomeLink />
      </Nav>
      <LogOut />
    </StyledHeader>
  );
};
