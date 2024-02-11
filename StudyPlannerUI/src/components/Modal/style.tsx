/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ModalDialog = styled.dialog`
  background: ${Tokens.neutral20};
  color: ${({ theme }) => theme.onBackground};
  max-width: 600px;
  width: min-content;
  min-width: 400px;
  padding: 2rem;
  border: 0;
  border-radius: 0.5rem;
  box-shadow: hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem;

  &::backdrop {
    background: hsl(0 0% 0% / 50%);
  }
`;

export const CloseButton = styled.button`
  color: ${({ theme }) => theme.onBackground};
  font-size: 0.75em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;

  & > svg {
    fill: ${Tokens.neutral50};
  }

  &:hover {
    cursor: pointer;
    & > svg {
      fill: ${Tokens.neutral70};
    }
  }

  &:active {
    & > svg {
      fill: ${Tokens.neutral60};
    }
    scale: 0.95;
  }
`;
export const ToastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color ${({ theme }) => theme.primaryContainer};
`;
