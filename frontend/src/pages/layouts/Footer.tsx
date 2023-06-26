import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: ${({ theme }) => theme.font.size.medium};
  height: 60px;
`;

export const Footer = () => {
  return <StyledFooter>Mon footer</StyledFooter>;
};
