import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
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
    <StyledImage
      src="https://res.cloudinary.com/apprenantv1-repo1/image/upload/v1687781189/logo_apprenant-X1_gris_rwzmnz.png"
      $height={'64px'}
      $width={'64px'}
    />
  );
};

type HeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <StyledHeader>
      <>
        <HeaderImage />
        {children}
      </>
    </StyledHeader>
  );
};
