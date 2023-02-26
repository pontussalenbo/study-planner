import { useState, useEffect } from 'react';

interface UseTable<T> {
    slice: T[];
    range: number[];
}

const calculateRange = <T,>(data: T[], rowsPerPage: number): number[] => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = <T,>(data: T[], page: number, rowsPerPage: number): T[] =>
    data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

const useTable = <T,>(data: T[], page: number, rowsPerPage: number): UseTable<T> => {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<T[]>([]);

    useEffect(() => {
        const range = calculateRange<T>(data, rowsPerPage);
        setTableRange([...range]);

        const slices = sliceData<T>(data, page, rowsPerPage);
        setSlice([...slices]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice, range: tableRange };
};

export default useTable;
