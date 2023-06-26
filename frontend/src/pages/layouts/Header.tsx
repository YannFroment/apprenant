import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 60px;
  font-size: ${({ theme }) => theme.font.size.medium};
`;

type HeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};
