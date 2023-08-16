import { memo, useContext, useEffect, useState } from 'react';
import CourseTableRow, { GridTableRow } from './TableRow';
import { GridTable, StyledHeader, StyledTable, TableBody, TableWrapper } from '../Table/Table.style';
import Pagination from 'components/Pagination/Pagination';
import useTable from 'hooks/useTable';
import { MyContext, CtxType } from 'hooks/CourseContext';
import styled from 'styled-components';

const headers = ['Course Code', 'Course Name', 'Credits', 'Level', 'Periods', 'Action'];

interface CourseTableRowProps {
  courses: CourseData.DataWithLocale[];
}

const sliceLength = 16;

const CenteredHeader = styled(StyledHeader)`
  text-align: center;
`;

function Table({ courses }: CourseTableRowProps) {
  const [page, setPage] = useState(1);

  const { addCourse } = useContext(MyContext) as CtxType;

  const { slice } = useTable<CourseData.DataWithLocale>(courses, page, sliceLength);

  useEffect(() => {
    setPage(1);
  }, [courses]);

  const handlePageChange = (page: number): void => {
    setPage(page);
  };

  if (slice.length !== 0) {
    console.log(Object.entries(slice[0]));
  }

  return (
    <>
      <TableWrapper>
        <GridTable columns={headers.length}>
          {headers.map((header, index) => (
            <div key={index} className='header'>
              {header}
            </div>
          ))}

          {slice.map((row, rowIndex) => (
            <GridTableRow key={rowIndex} course={row} handleAddCourse={addCourse} />
          ))}
        </GridTable>
      </TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader>Course Code</StyledHeader>
            <StyledHeader>Course Name</StyledHeader>
            <CenteredHeader>Credits</CenteredHeader>
            <CenteredHeader>Level</CenteredHeader>
            <CenteredHeader>Periods</CenteredHeader>
            <CenteredHeader>Action</CenteredHeader>
          </tr>
        </thead>
        <TableBody>
          {slice.map(course => (
            <CourseTableRow key={course.course_code} course={course} handleAddCourse={addCourse} />
          ))}
        </TableBody>
      </StyledTable>
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
