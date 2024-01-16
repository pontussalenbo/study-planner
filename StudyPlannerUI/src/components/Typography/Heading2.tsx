import styled from 'styled-components';
import { TypographyProps } from './style';
import { parseTypographyProps } from './parseTypography';

export const Heading2 = styled.h2<TypographyProps>`
  ${parseTypographyProps('headline', 'medium')}
`;
