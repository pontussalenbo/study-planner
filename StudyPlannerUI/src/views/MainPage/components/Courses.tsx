/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React from 'react';

import FlexContainer from 'components/Layout';

import AddMissingCourse from './Courses/AddCourseModal';
import CourseList from './Courses/CourseList';
import SearchBar from './CoursesFilter/SearchBar';

interface CoursesProps {
  courses: CourseData.DataWithLocale[];
  filteredCourses: CourseData.DataWithLocale[];
  handleFilteredCourses: React.Dispatch<React.SetStateAction<CourseData.DataWithLocale[]>>;
}

const Courses: React.FC<CoursesProps> = ({ courses, filteredCourses, handleFilteredCourses }) => {
  return (
    <FlexContainer width='100%' direction='column' style={{ flexBasis: '55%', gridRow: '3/4' }}>
      <FlexContainer
        width='100%'
        justify='space-between'
        align='flex-end'
        style={{ marginBottom: '15px' }}
      >
        <SearchBar courses={courses} setFilteredCourses={handleFilteredCourses} />
        <AddMissingCourse />
      </FlexContainer>
      <CourseList courses={filteredCourses} />
    </FlexContainer>
  );
};

export default Courses;
