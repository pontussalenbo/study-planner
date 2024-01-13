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

import styled, { keyframes } from 'styled-components';

export const ToastsContainer = styled.div`
    position: fixed;
    top: 10vh;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 256px;
    background: transparent;
    pointer-events: none;
    z-index: 9997;
`;

const toastFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  5% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

// TODO: refine toast styling

const Toast = styled.div`
    border-radius: 4px;
    padding: 8px 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    display: block;
    margin-bottom: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    opacity: 0;
    position: relative;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-name: ${toastFade};
    animation-timing-function: linear;
`;

export const ErrorToast = styled(Toast)`
    background-color: ${({ theme }) => theme.errorContainer};
    color: ${({ theme }) => theme.onErrorContainer};
`;

export const SuccessToast = styled(Toast)`
    background-color: ${({ theme }) => theme.fulfilled};
`;

export const NeutralToast = styled(Toast)`
    background-color: ${({ theme }) => theme.secondaryContainer};
`;

export const NotificationToast = styled(Toast)`
    background-color: ${({ theme }) => theme.tertiaryContainer};
`;
