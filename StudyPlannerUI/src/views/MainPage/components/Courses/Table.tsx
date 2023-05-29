import { memo, useContext, useEffect, useState } from 'react';
import CourseTableRow from './TableRow';
import {
  CenteredHeader,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from '../Table/Table.style';
import Pagination from 'components/Pagination/Pagination';
import useTable from 'hooks/useTable';
import { MyContext, CtxType } from 'hooks/CourseContext';

interface CourseTableRowProps {
  courses: CourseData.DataWithLocale[];
}

const sliceLength = 7;

function Table({ courses }: CourseTableRowProps) {
  const [page, setPage] = useState(1);

  const { addCourse } = useContext(MyContext) as CtxType;

  useEffect(() => {
    const newMaxPage = Math.ceil(courses.length / sliceLength);
    if (page > newMaxPage) {
      setPage(newMaxPage);
    }
  }, [page, courses.length]);

  const { slice } = useTable<CourseData.DataWithLocale>(courses, page, sliceLength);

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
              <CenteredHeader>Action</CenteredHeader>
            </tr>
          </thead>
          <TableBody>
            {slice.map(course => (
              <CourseTableRow
                key={course.course_code}
                course={course}
                handleAddCourse={addCourse}
              />
            ))}
          </TableBody>
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

export default memo(Table);
