import styled from 'styled-components';
import { parseTypographyProps } from './parseTypography';
import { TypographyProps } from './style';

export const Heading1 = styled.h1<TypographyProps>`
  ${parseTypographyProps('headline', 'large')}
`;
