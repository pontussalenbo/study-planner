import { useState } from 'react';
import CourseTableRow from './TableRow';
import { StyledHeader, StyledTable, StyledTableContainer } from './Table.style';
import Pagination from 'components/Pagination/Pagination';
import useTable from 'hooks/useTable';

interface CourseTableRowProps {
  courses: CourseData.DataWithLocale[];
  handleAddCourse: (
    course: CourseData.SelectedCourse,
    year: 4 | 5,
    period: API.Period | null
  ) => void;
}

function Table({ courses, handleAddCourse }: CourseTableRowProps) {
  const [page, setPage] = useState(1);

  const { slice } = useTable<CourseData.DataWithLocale>(courses, page, 7);

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  return (
    <>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledHeader>Course Code</StyledHeader>
              <StyledHeader>Course Name</StyledHeader>
              <StyledHeader>Credits</StyledHeader>
              <StyledHeader>Level</StyledHeader>
              <StyledHeader>Periods</StyledHeader>
              <StyledHeader>Action</StyledHeader>
            </tr>
          </thead>
          <tbody>
            {slice.map(course => (
              <CourseTableRow
                key={course.course_code}
                course={course}
                handleAddCourse={handleAddCourse}
              />
            ))}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
      <Pagination
        currentPage={page}
        totalCount={courses.length}
        pageSize={7}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Table;
