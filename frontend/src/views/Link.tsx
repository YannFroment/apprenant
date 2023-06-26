import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(BaseLink)`
  color: ${({ theme }) => theme.colors.blue};
`;
