import styled from 'styled-components';
import { device } from 'utils/breakpoints';
import { calcColWidth } from 'utils/breakpoints';

export interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  gap?: number;
}

const Col = styled.div<ColProps>`
  gap: ${({ gap }) => gap || 0}px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;

  ${({ xs }) =>
    xs &&
    `@media ${device.xs} {
            flex: 0 0 ${calcColWidth(xs)};
            max-width: ${calcColWidth(xs)};
        }`}

  ${({ sm }) =>
    sm &&
    `@media ${device.sm} {
            flex: 0 0 ${calcColWidth(sm)};
            max-width: ${calcColWidth(sm)};
        }`}

    ${({ md }) =>
    md &&
    `@media ${device.md} {
                flex: 0 0 ${calcColWidth(md)};
                max-width: ${calcColWidth(md)};
            }`}

    ${({ lg }) =>
    lg &&
    `@media ${device.lg} {
                flex: 0 0 ${calcColWidth(lg)};
                max-width: ${calcColWidth(lg)};
            }`}
`;

export default Col;
