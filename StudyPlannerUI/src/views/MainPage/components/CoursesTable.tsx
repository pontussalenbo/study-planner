/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { TableRow, TableCell } from 'components/Table/Table.style';
import Table from 'components/Table/Table';
import useTable from 'hooks/useTable';
import Pagination from 'components/Pagination';
import type { Event } from 'interfaces/Event';
import type { SelectedCourse } from 'interfaces/SelectedCourse';

interface CoursesTableProps {
    data: any[];
    rowsPerPage?: number;
    dataProps: string[];
    addCourse: (course: SelectedCourse) => void;
}

interface CourseError {
    year?: string;
    period?: string;
}

interface Period {
    periodStart: number;
    periodEnd: number;
}

type Errors = Record<string, CourseError> | undefined;

const periodAsString = (period: Period): string => {
    const { periodStart, periodEnd } = period;
    if (periodStart === periodEnd) {
        return periodStart.toString();
    }
    return `${periodStart} -> ${periodEnd}`;
};

const parsePeriods = (periods: any[], handler: (period: any) => void): any => {
    if (periods.length === 1) {
        return periodAsString(periods[0]);
    }
    return (
        <select>
            {periods.map((period: any) => (
                <option
                    key={period}
                    onChange={period => handler(period)}
                    value={periodAsString(period)}
                >
                    {periodAsString(period)}
                </option>
            ))}
        </select>
    );
};

const DEFAULT_YEAR = -1;
const DEFAULT_PERIOD = { periodStart: 0, periodEnd: 0 };

function CoursesTable({
    data,
    rowsPerPage = 7,
    dataProps,
    addCourse
}: CoursesTableProps): JSX.Element {
    const [page, setPage] = useState(1);
    const [year, setYear] = useState(-1);
    const [selectedPeriod, setSelectedPeriod] = useState({ periodStart: 0, periodEnd: 0 });
    const [errors, setErrors] = useState<Errors>({});

    const { slice } = useTable<any>(data, page, rowsPerPage);

    const onHandleClick = (course: unknown): void => {
        const courze = course as Course.CourseData;

        const { courseCode, credits, cycle, name_en } = courze;
        const { periodStart, periodEnd } = selectedPeriod;
        const periods = [periodStart || 1, periodEnd || 2];

        if (year === DEFAULT_YEAR) {
            const newErrors = { ...errors };
            newErrors[courseCode] = { year: 'Please select a year' };
            setErrors(() => newErrors);
            return;
        }

        const data = {
            courseCode,
            credits,
            cycle,
            year,
            name_en,
            periods
        };

        addCourse(data);
        // ! Reset form
        setYear(DEFAULT_YEAR);
        setSelectedPeriod(DEFAULT_PERIOD);
    };

    const handlePageChange = (page: number): void => {
        setPage(page);
    };

    const onChangeYear = (e: Event<HTMLSelectElement>): void => {
        setYear(parseInt(e.target.value, 10));
    };

    const onChangePeriod = ({ periodStart, periodEnd }: Period): void => {
        console.log(periodStart, periodEnd);
    };

    const headers = ['Course Code', 'Credits', 'Level', 'Course Name', 'Period(s)', 'Year', 'Add'];

    return (
        <>
            <Table headers={headers}>
                {slice.map(el => (
                    <TableRow key={`${el.courseCode as string}_data `}>
                        {dataProps.map(prop => {
                            if (prop === 'periods') {
                                return (
                                    <TableCell key={`${el.courseCode as string}_periods`}>
                                        {parsePeriods(el[prop] as any[], onChangePeriod)}
                                    </TableCell>
                                );
                            }
                            return (
                                <TableCell key={el[prop] as string}>{el[prop] as string}</TableCell>
                            );
                        })}
                        <TableCell>
                            <select onChange={onChangeYear}>
                                <option value='-1'>Select year</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                            <div>{errors?.[el.courseCode]?.year ?? null}</div>
                        </TableCell>
                        <TableCell>
                            <button
                                type='button'
                                disabled={year === DEFAULT_YEAR}
                                onClick={() => onHandleClick(el)}
                            >
                                +
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Pagination
                currentPage={page}
                totalCount={data.length}
                pageSize={7}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default CoursesTable;
