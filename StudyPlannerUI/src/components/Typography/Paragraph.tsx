import styled from 'styled-components';
import { TypographyProps, GenericTypography } from './style';

export const Paragraph = styled.p<TypographyProps>`
  font-size: ${({ size }) => size || '1rem'};
  font-weight: ${({ weight }) => weight || 400};
  ${GenericTypography};
`;

export const InlineParagraph = styled.span<TypographyProps>`
  font-size: ${({ size }) => size || '1rem'};
  font-weight: ${({ weight }) => weight || 400};
  ${GenericTypography};
`;
