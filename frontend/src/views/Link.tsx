import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';

type LinkProps = {
  $color?: string;
};

export const Link = styled(BaseLink)<LinkProps>`
  color: ${({ theme, $color }) => ($color ? $color : theme.colors.blue)};
`;
