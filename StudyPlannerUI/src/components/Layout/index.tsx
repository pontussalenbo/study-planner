/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  width?: string;
  flex?: number | string;
  height?: string;
  margin?: string;
  padding?: string;
  px?: string;
  py?: string;
  order?: number;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  gap?: string;
}

const FlexContainer = styled.div<Props>`
  display: flex;
  gap: ${({ gap }) => gap || '0'};
  order: ${({ order }) => order};
  flex: ${({ flex }) => flex || undefined};
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding ?? '0'};
  padding-left: ${({ px }) => px ?? '0'};
  padding-right: ${({ px }) => px ?? '0'};
  padding-top: ${({ py }) => py ?? '0'};
  padding-bottom: ${({ py }) => py ?? '0'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
`;

export default FlexContainer;
