import styled from 'styled-components';

const StyledFooter = styled.footer`
  font-size: ${({ theme }) => theme.font.size.medium};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const FooterTitle = styled.h2`
  letter-spacing: 1px;
  font-size: ${({ theme }) => theme.font.size.small};
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;
  line-height: 13px;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterTitle>NOUS SOMMES TOUS APPRENANTS</FooterTitle>
      <FooterText>
        Ce projet est inspiré des recherches de Francine Dessis, conseillère
        pédagogique ainsi que des précieux travaux de Bernadette Gueritte Hess
        et d'Elisabeth Pelloquin, expertes en pédagogie.
      </FooterText>
    </StyledFooter>
  );
};
