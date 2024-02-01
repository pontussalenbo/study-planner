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
