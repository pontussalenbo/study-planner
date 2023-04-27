import { AlertButton } from 'components/Button';
import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer
} from './Table.style';
import styled from 'styled-components';
interface CreditsTableProps {
  courses: CourseData.DataWithLocale[];
  year: 4 | 5;
  onClickRemove: (courseCode: string, year: 4 | 5) => void;
  onChangeYear: (courseCode: string, year: 4 | 5) => void;
}

const TestTable = styled(StyledTable)`
  font-size: 0.7em;
`;

function SelectedCoursesTable({
  courses,
  year,
  onClickRemove,
  onChangeYear
}: CreditsTableProps): JSX.Element {
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
        <tbody>
          {courses.map(course => (
            <tr key={course.course_code}>
              <StyledCell>{course.course_code}</StyledCell>
              <StyledCell>{course.course_name}</StyledCell>
              <StyledCell style={{ fontSize: '1.5rem' }}>
                <button
                  style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '0 5px'
                  }}
                  onClick={() => onChangeYear(course.course_code, year === 4 ? 5 : 4)}
                >
                  {year === 4 ? '\u2192' : '\u2190'}
                </button>
              </StyledCell>
              <StyledCell>
                <AlertButton
                  type='button'
                  onClick={() => onClickRemove(course.course_code, year)}
                >
                  Remove
                </AlertButton>
              </StyledCell>
            </tr>
          ))}
        </tbody>
      </TestTable>
    </StyledTableContainer>
  );
}

export default SelectedCoursesTable;
