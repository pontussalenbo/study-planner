import { AlertButton } from 'components/Button';
import {
  CenteredHeader,
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from '../Table/Table.style';
import styled from 'styled-components';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { useContext, useMemo } from 'react';
import { ArrowButton, ButtonIcon, RemoveButton } from './styles';
interface CreditsTableProps {
  year: 4 | 5;
}

const TestTable = styled(StyledTable)`
  font-size: 0.7em;
`;

function SelectedCoursesTable({ year }: CreditsTableProps): JSX.Element {
  const { courses, removeCourse, changeYear } = useContext(MyContext) as CtxType;
  const yearCourses = useMemo(() => courses[year], [courses, year]);
  return (
    <StyledTableContainer>
      <TestTable>
        <thead>
          <tr>
            <StyledHeader>Course Code</StyledHeader>
            <StyledHeader>Course Name</StyledHeader>
            <StyledHeader>Year</StyledHeader>
            <CenteredHeader>Action</CenteredHeader>
          </tr>
        </thead>
        <TableBody>
          {yearCourses.map(course => (
            <tr key={course.course_code}>
              <StyledCell>{course.course_code}</StyledCell>
              <StyledCell>{course.course_name}</StyledCell>
              <StyledCell>
                <ArrowButton
                  onClick={() => changeYear(course.course_code, year === 4 ? 5 : 4)}
                >
                  {year === 4 ? '\u2192' : '\u2190'}
                </ArrowButton>
              </StyledCell>
              <StyledCell>
                <RemoveButton
                  type='button'
                  onClick={() => removeCourse(course.course_code, year)}
                >
                  <ButtonIcon>&#8722;</ButtonIcon> Remove
                </RemoveButton>
              </StyledCell>
            </tr>
          ))}
        </TableBody>
      </TestTable>
    </StyledTableContainer>
  );
}

export default SelectedCoursesTable;
