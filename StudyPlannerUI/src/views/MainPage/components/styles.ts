import { StyledButton } from 'components/Button';
import { TableRow } from 'components/Table/Table.style';
import styled from 'styled-components';

interface IColoredTableRow {
    fullfilled?: boolean;
}

export const ColoredTableRow = styled(TableRow)<IColoredTableRow>`
    background-color: ${props => props.fullfilled && props.theme.fulfilled} !important;
`;

export const CreditsWrapper = styled.div`
    @media (min-width: 992px) {
        margin-top: -40px;
    }
`;

export const ActionButton = styled(StyledButton)`
    display: block;
    margin: 0 auto;
`;

export const RemoveButton = styled(ActionButton)`
    background: ${({ theme }) => theme.error};
`;
