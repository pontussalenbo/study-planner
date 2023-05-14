// components/Table.tsx
import React, { useState } from 'react';

import Pagination from 'components/Pagination/Pagination';
import useTable from 'hooks/useTable';
import { TableRow } from 'components/Table/Table.style';
import {
  StyledTableContainer,
  StyledTable,
  StyledHeader,
  StyledCell
} from '../Table/Table.style';

interface ExtraColumn<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

type CustomRenderer<T, K extends keyof T> = (value: T[K], row: T) => React.ReactNode;

interface TableProps<T> {
  data: T[];
  headers?: (keyof T)[];
  customRenderers?: {
    [K in keyof T]?: CustomRenderer<T, K>;
  };
  extraColumns?: ExtraColumn<T>[];
  headerAliases?: Partial<Record<keyof T, string>>;
}

function Table<T extends object>({
  data,
  headers,
  customRenderers = {},
  extraColumns,
  headerAliases = {}
}: TableProps<T>): JSX.Element {
  const [page, setPage] = useState(1);

  const { slice } = useTable<T>(data, page, 7);

  // If headers prop is not provided, derive headers from the first data object
  const derivedHeaders =
    headers ?? (data.length > 0 ? (Object.keys(data[0]) as (keyof T)[]) : []);
  const extraHeaders = extraColumns?.map(({ header }) => header) || [];

  const handlePageChange = (page: number): void => {
    setPage(page);
  };
  return (
    <>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              {derivedHeaders.map((header, index) => (
                <StyledHeader key={index}>
                  {headerAliases[header] || header.toString()}
                </StyledHeader>
              ))}
              {extraHeaders.map((header, index) => (
                <StyledHeader key={`extra-header-${index}`}>{header}</StyledHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {derivedHeaders.map((header, cellIndex) => {
                  const value = row[header];
                  const customRenderer = customRenderers[header];
                  const renderedValue = customRenderer
                    ? customRenderer(value, row)
                    : (value as React.ReactNode);

                  return <StyledCell key={cellIndex}>{renderedValue}</StyledCell>;
                })}
                {extraColumns?.map(({ render }, index) => (
                  <StyledCell key={`extra-cell-${rowIndex}-${index}`}>
                    {render(row)}
                  </StyledCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
      <Pagination
        currentPage={page}
        totalCount={data.length}
        pageSize={7}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Table;
