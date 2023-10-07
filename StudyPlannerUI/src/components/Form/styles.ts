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
