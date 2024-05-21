/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useMemo } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { getDisplayPeriod, sortCourses } from 'utils/sortCourses';
import { ListContainer } from 'views/MainPage/components/Courses/style';

import { ContainedButton, OutlinedButton } from 'components/Button/Buttons';
import { Table, TableCell, TableHeader, TableHeaderCell, TableRow } from 'components/Table';
interface CreditsTableProps {
  year: CourseData.YEAR;
}

function SelectedCoursesTable({ year }: CreditsTableProps): JSX.Element {
  const { courses, customCourses, removeCourse, changeYear } = useStudyplanContext();
  const allCourses = [...courses[year], ...customCourses[year]];
  const yearCourses = useMemo(() => sortCourses(allCourses), [courses, customCourses]);

  return (
    <ListContainer>
      <Table cols={5}>
        <TableHeader>
          <TableHeaderCell>Course Code</TableHeaderCell>
          <TableHeaderCell>Course Name</TableHeaderCell>
          <TableHeaderCell>Period</TableHeaderCell>
          <TableHeaderCell>Change Year</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableHeader>
        {yearCourses.map(course => (
          <TableRow key={course.courseCode}>
            <TableCell>{course.courseCode}</TableCell>
            <TableCell>{course.courseName}</TableCell>
            <TableCell>{getDisplayPeriod(course.periods[0])}</TableCell>
            <TableCell>
              <OutlinedButton
                variant='primary'
                size='small'
                type='button'
                onClick={() => changeYear(course.courseCode, year === 4 ? 5 : 4, course.custom)}
              >
                {year === 4 ? '\u2192' : '\u2190'}
              </OutlinedButton>
            </TableCell>
            <TableCell>
              <ContainedButton
                variant='error'
                type='button'
                onClick={() => removeCourse(course.courseCode, year)}
              >
                Remove
              </ContainedButton>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </ListContainer>
  );
}

export default SelectedCoursesTable;
