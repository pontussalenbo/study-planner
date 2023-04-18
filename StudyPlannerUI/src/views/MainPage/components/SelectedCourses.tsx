import Table from 'components/Table/Table';
import { TableCell, TableRow } from 'components/Table/Table.style';
import type { SelectedCourse } from 'interfaces/SelectedCourse';
import React from 'react';
import { ColoredTableRow } from './style';

interface CreditsTableProps {
    courses: SelectedCourse[];
}

function SelectedCoursesTable({ courses }: CreditsTableProps): JSX.Element {
    return (
        <Table headers={['Course code', 'Course Name', 'A', 'Remove']}>
            {courses.map(course => (
                <TableRow key={course.courseCode}>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.name_en}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                        <button type='button'>-</button>
                    </TableCell>
                </TableRow>
            ))}
        </Table>
    );
}

export default SelectedCoursesTable;
