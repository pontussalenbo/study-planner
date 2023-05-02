import styled from 'styled-components';
import { GenericTypography, TypographyProps } from './style';

export const Heading1 = styled.h1<TypographyProps>`
  font-size: ${({ size }) => size || '2rem'};
  font-weight: ${({ weight }) => weight || 600};
  ${GenericTypography};
`;
