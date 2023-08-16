import StyledButtonWithIcon, { StyledButton } from 'components/Button';
import styled from 'styled-components';
import { device } from 'utils/breakpoints';

export const StatsButton = styled(StyledButton)`
    margin-bottom: 10px;
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;
`;

export const StatsWrapper = styled.div`
    @media (${device.lg}) {
        margin-top: -65px;
    }
`;

export const Select = styled.select`
    min-width: max-content;
`;

export const GetStatsBar = styled.div`
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 10px;
`;

export const AddButton = styled(StyledButtonWithIcon)`
    min-width: 88px;
    display: block;
    margin: 0 auto;
    @media (max-width: 420px) {
        min-width: auto;
        padding: 8px 12px;
        > span {
            margin-right: 0;
        }
    }
`;

export const RemoveButton = styled(AddButton)`
    background-color: ${({ theme }) => theme.errorContainer} !important;
    color: ${({ theme }) => theme.onErrorContainer} !important;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.errorContainer} !important;
    }

    &:active {
        background-color: ${({ theme }) => theme.tertiary};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.surfaceVariant};
        color: ${({ theme }) => theme.onSurfaceVariant};
        cursor: not-allowed;
    }
`;
