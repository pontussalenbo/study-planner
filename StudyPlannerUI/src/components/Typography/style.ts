import { css } from 'styled-components';

export interface TypographyProps {
  color?: string;
  size?: string;
  weight?: number;
  lineHeight?: string;
  letterSpacing?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export const GenericTypography = css<TypographyProps>`
  line-height: ${({ lineHeight }) => lineHeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0'};
  color: ${({ color }) => color};
  font-style: ${({ fontStyle }) => fontStyle || 'normal'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  margin: 0.5rem 0;
`;
