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

import styled from 'styled-components';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    & > * {
        margin-top: 20px;
    }
`;

// Row container to hold multiple form elements horizontally
export const FormRow = styled.div`
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;
`;

interface SearchInputProps {
    error?: boolean;
}

export const SearchInput = styled.input<SearchInputProps>`
    width: 100%;
    outline: none;
    border: none;
    border-style: none;
    background-color: transparent;
    color: ${({ theme }) => theme.onSurfaceVariant};
    caret-color: ${({ theme }) => theme.surfaceTint};
`;
