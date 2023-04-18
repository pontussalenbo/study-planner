import { TableRow } from 'components/Table/Table.style';
import styled from 'styled-components';

interface IColoredTableRow {
    fullfilled: boolean;
}

export const ColoredTableRow = styled(TableRow)<IColoredTableRow>`
    background-color: ${props => (props.fullfilled ? '#008705' : '#e49a9a')} !important;
    color: black;
`;

export const placeholder = 1;
