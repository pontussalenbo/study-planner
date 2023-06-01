import StyledButtonWithIcon, { StyledButton } from 'components/Button';
import styled from 'styled-components';
import { device } from 'utils/breakpoints';

export const StatsButton = styled(StyledButton)`
    margin-bottom: 10px;
`;

export const FilterContainer = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
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
    background: ${({ theme }) => theme.alert};
`;
