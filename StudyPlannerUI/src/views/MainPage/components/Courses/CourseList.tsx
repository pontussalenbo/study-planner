/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useState } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { getDisplayPeriod } from 'utils/sortCourses';

import IconButton from 'components/Button/Button';
import { ButtonCell, NameCell, TableCell, TableRow } from 'components/Table/style';

import { ListContainer } from './style';

interface RowProps {
  index: number;
  data: {
    courses: CourseData.DataWithLocale[];
  };
}

const Row = ({ index, data }: RowProps) => {
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

  const course: CourseData.DataWithLocale = data.courses[index];
  const hasMultiplePeriods = course.periods.length > 1;
  const isSelected = hasCourse(course.courseCode);

  return (
    <TableRow>
      <TableCell>{course.courseCode}</TableCell>
      <NameCell>{course.courseName}</NameCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.level}</TableCell>
      <TableCell>
        {hasMultiplePeriods ? (
          <select defaultValue='' onChange={handlePeriodChange}>
            <option value='' disabled>
              Select
            </option>
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
      <ButtonCell>
        {isSelected ? (
          <IconButton text variant='error' onClick={handleRemoveClick}>
            Remove
          </IconButton>
        ) : (
          <IconButton
            text
            variant='primary'
            onClick={handleButtonClick}
            disabled={!selectedPeriod && course.periods.length > 1}
          >
            Select
          </IconButton>
        )}
      </ButtonCell>
    </TableRow>
  );
};

interface CourseListProps {
  courses: CourseData.DataWithLocale[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <ListContainer>
      <TableRow header>
        <TableCell>Course Code</TableCell>
        <NameCell>Course Name</NameCell>
        <TableCell>Credits</TableCell>
        <TableCell>Level</TableCell>
        <TableCell>Period</TableCell>
        <ButtonCell>Action</ButtonCell>
      </TableRow>
      {courses.map((course, index) => (
        <Row key={course.courseCode} index={index} data={{ courses }} />
      ))}
    </ListContainer>
  );
};

export default CourseList;
