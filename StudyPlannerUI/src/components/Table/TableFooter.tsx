import { useEffect } from 'react';

import styles from './TableFooter.module.css';

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
		<div className={styles.tableFooter}>
			{range.map(el => (
				<button
					type='button'
					key={el}
					className={`${styles.button} ${
						page === el ? styles.activeButton : styles.inactiveButton
					}`}
					onClick={() => setPage(el)}
				>
					{el}
				</button>
			))}
		</div>
	);
}

export default TableFooter;
