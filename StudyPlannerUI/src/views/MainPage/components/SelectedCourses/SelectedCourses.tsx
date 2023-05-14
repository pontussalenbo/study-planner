import { AlertButton } from 'components/Button';
import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from '../Table/Table.style';
import styled from 'styled-components';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { useContext } from 'react';
interface CreditsTableProps {
  year: 4 | 5;
}

const TestTable = styled(StyledTable)`
  font-size: 0.7em;
`;

function SelectedCoursesTable({ year }: CreditsTableProps): JSX.Element {
  const { courses, removeCourse, changeYear } = useContext(MyContext) as CtxType;
  return (
    <StyledTableContainer>
      <TestTable>
        <thead>
          <tr>
            <StyledHeader>Course Code</StyledHeader>
            <StyledHeader>Course Name</StyledHeader>
            <StyledHeader>Year</StyledHeader>
            <StyledHeader>Action</StyledHeader>
          </tr>
        </thead>
        <TableBody>
          {courses(year).map(course => (
            <tr key={course.course_code}>
              <StyledCell>{course.course_code}</StyledCell>
              <StyledCell>{course.course_name}</StyledCell>
              <StyledCell style={{ fontSize: '1.5rem' }}>
                <button
                  style={{
                    border: '1px solid white',
                    borderRadius: '5px',
                    padding: '0 5px',
                    color: 'white'
                  }}
                  onClick={() => changeYear(course.course_code, year === 4 ? 5 : 4)}
                >
                  {year === 4 ? '\u2192' : '\u2190'}
                </button>
              </StyledCell>
              <StyledCell>
                <AlertButton
                  type='button'
                  onClick={() => removeCourse(course.course_code, year)}
                >
                  <span style={{ marginRight: '4px' }}>&#8722;</span> Remove
                </AlertButton>
              </StyledCell>
            </tr>
          ))}
        </TableBody>
      </TestTable>
    </StyledTableContainer>
  );
}

export default SelectedCoursesTable;
