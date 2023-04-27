/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { device } from 'utils/breakpoints';
import calcColWidth from 'utils/calcColWidth';

export interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

const Col = styled.div<ColProps>`
  position: relative;
  width: 100%;
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
