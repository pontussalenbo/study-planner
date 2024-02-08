/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useEffect, useState } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { getDisplayPeriod } from 'utils/sortCourses';

import { ContainedButton } from 'components/Button/Buttons';
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow
} from 'components/Table';

type Course = CourseData.DataWithLocale;
interface CourseListProps {
  courses: Course[];
}

const Row: React.FC<{ course: Course }> = ({ course }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);

  const { removeCourse, addCourse, hasCourse } = useStudyplanContext();

  const handleButtonClick = () => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      period: selectedPeriod,
      studyYear: 4
    };
    addCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.courseCode);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const periodIndex = parseInt(event.target.value);
    setSelectedPeriod(course.periods[periodIndex]);
  };

  const hasMultiplePeriods = course.periods.length > 1;
  const isSelected = hasCourse(course.courseCode);

  return (
    <TableRow>
      <TableCell>{course.courseCode}</TableCell>
      <TableCell>{course.courseName}</TableCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.level}</TableCell>
      <TableCell>
        {hasMultiplePeriods ? (
          <select style={{ width: '100%' }} defaultValue='' onChange={handlePeriodChange}>
            <option value='' disabled></option>
            {course.periods.map((period, index) => (
              <option key={`${period.start}_${period.end}`} value={index}>
                {getDisplayPeriod(period)}
              </option>
            ))}
          </select>
        ) : (
          <span>{getDisplayPeriod(course.periods[0])}</span>
        )}
      </TableCell>
      <TableCell>
        {isSelected ? (
          <ContainedButton size='small' variant='error' onClick={handleRemoveClick}>
            Remove
          </ContainedButton>
        ) : (
          <ContainedButton
            size='small'
            variant='primary'
            onClick={handleButtonClick}
            disabled={!selectedPeriod && course.periods.length > 1}
          >
            Select
          </ContainedButton>
        )}
      </TableCell>
    </TableRow>
  );
};

function CourseTable({ courses }: CourseListProps) {
  const [sortKey, setSortKey] = useState<keyof Course | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

  function sortCourses(courses: Course[], sortKey: keyof Course, sortDirection: 'asc' | 'desc') {
    return [...courses].sort((a, b) => {
      if (sortKey === 'periods') {
        const c1 = a['periods'][0]['start'];
        const c2 = b['periods'][0]['start'];
        if (c1 < c2) return sortDirection === 'asc' ? -1 : 1;
        if (c1 > c2) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }
      const c1 = a[sortKey] ?? '';
      const c2 = b[sortKey] ?? '';
      if (c1 < c2) return sortDirection === 'asc' ? -1 : 1;
      if (c1 > c2) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  useEffect(() => {
    if (sortKey !== null) {
      setSortedCourses(sortCourses(courses, sortKey, sortDirection));
    } else {
      setSortedCourses(courses);
    }
  }, [courses, sortKey, sortDirection]);

  const handleHeaderClick = (key: keyof Course) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <TableContainer>
      <Table cols={6}>
        <TableHeader>
          <TableHeaderCell onClick={() => handleHeaderClick('courseCode')}>
            Course Code
          </TableHeaderCell>
          <TableHeaderCell onClick={() => handleHeaderClick('courseName')}>
            Course Name
          </TableHeaderCell>
          <TableHeaderCell onClick={() => handleHeaderClick('credits')}>Credits</TableHeaderCell>
          <TableHeaderCell onClick={() => handleHeaderClick('level')}>Level</TableHeaderCell>
          <TableHeaderCell onClick={() => handleHeaderClick('periods')}>Period</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableHeader>
        {sortedCourses.map(course => (
          <Row key={course.courseCode} course={course} />
        ))}
      </Table>
    </TableContainer>
  );
}

export default CourseTable;
