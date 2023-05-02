import styled from 'styled-components';
import { TypographyProps, GenericTypography } from './style';

export const Heading2 = styled.h2<TypographyProps>`
  font-size: ${({ size }) => size || '1.5rem'};
  font-weight: ${({ weight }) => weight || 600};
  ${GenericTypography};
`;
