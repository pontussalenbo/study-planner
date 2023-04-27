import { Table as TableContainer, TableRowHeader, TableHeader } from './Table.style';

interface ITableProps {
  headers?: string[];
  children: JSX.Element[] | JSX.Element;
}

function Table({ children, headers }: ITableProps): JSX.Element {
  return (
    <TableContainer>
      <TableRowHeader>
        <tr>
          {headers?.map(header => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </tr>
      </TableRowHeader>
      <tbody>{children}</tbody>
    </TableContainer>
  );
}

export default Table;
