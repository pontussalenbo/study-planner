import { useState, useEffect } from 'react';

const calculateRange = <T,>(data: T[], rowsPerPage: number) => {
	const range = [];
	const num = Math.ceil(data.length / rowsPerPage);
	for (let i = 1; i <= num; i++) {
		range.push(i);
	}
	return range;
};

const sliceData = <T,>(data: T[], page: number, rowsPerPage: number) =>
	data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const useTable = <T,>(data: T[], page: number, rowsPerPage: number) => {
	const [tableRange, setTableRange] = useState<any[]>([]);
	const [slice, setSlice] = useState<T[]>([]);

	useEffect(() => {
		const range = calculateRange<T>(data, rowsPerPage);
		setTableRange([...range]);

		const slice = sliceData<T>(data, page, rowsPerPage);
		setSlice([...slice]);
	}, [data, setTableRange, page, setSlice, rowsPerPage]);

	return { slice, range: tableRange };
};

export default useTable;
