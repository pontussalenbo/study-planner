import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ListContainer = styled.div`
  max-height: 650px;
  width: 100%;
  overflow: auto;
  font-size: 14px;
  background-color: ${Tokens.neutralVariant20};
  color: ${({ theme }) => theme.inverseSurface};
  border-radius: 8px;
  padding: 0px 8px;
  margin-bottom: 1rem;
`;

export const CourseRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const Column = styled.div<{ width?: string; textAlign?: string; mx?: string }>`
  text-align: ${({ textAlign }) => textAlign};
  ${({ width }) => `width: ${width}`};
  ${({ mx }) => `margin: 0px ${mx}`};
`;

interface TableRowProps {
  header?: boolean;
}

export const TableRow = styled.div<TableRowProps>`
  ${({ header }) => header && `position: sticky; top: 0; background-color: ${Tokens.neutralVariant20}  ;`};
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  font-weight: ${props => (props.header ? 'bold' : 'normal')};
`;

export const TableCell = styled.div`
  padding: 0 10px;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const NameCell = styled(TableCell)`
  flex: 4;
`;

export const ButtonCell = styled(TableCell)`
  padding: 0;
  min-width: 100px;
  flex: 0 0 auto;
`;
