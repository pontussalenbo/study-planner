import { useEffect } from 'react';

import styles from './TableFooter.module.css';
import { TableFooterWrapper, Button } from './TableFooter.styles';

interface ITableFooterProps {
    range: number[];
    setPage: (page: number) => void;
    page: number;
    slice: unknown[];
}

function TableFooter({ range, setPage, page, slice }: ITableFooterProps): JSX.Element {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <TableFooterWrapper>
            {range.map(el => (
                <Button key={el} isActive={page === el} onClick={() => setPage(el)}>
                    {el}
                </Button>
            ))}
        </TableFooterWrapper>
    );
}

export default TableFooter;
