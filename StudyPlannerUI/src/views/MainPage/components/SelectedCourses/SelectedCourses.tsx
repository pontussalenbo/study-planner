import { CtxType, MyContext } from 'hooks/CourseContext';
import { useContext, useMemo } from 'react';
import { ArrowButton, ButtonIcon } from './styles';
import { AlertButton } from 'components/Button';
import { ButtonCell, ListContainer, NameCell, TableCell, TableRow } from '../Courses/InfiniteScroll.style';
import { getDisplayPeriod, sortCourses } from 'utils/sortCourses';
interface CreditsTableProps {
  year: 4 | 5;
}

function SelectedCoursesTable({ year }: CreditsTableProps): JSX.Element {
  const { courses, removeCourse, changeYear } = useContext(MyContext) as CtxType;
  const yearCourses = useMemo(() => sortCourses(courses[year]), [courses, year]);

  return (
    <ListContainer>
      <TableRow header>
        <TableCell>Course Code</TableCell>
        <NameCell>Course Name</NameCell>
        <TableCell>Period</TableCell>
        <TableCell>Change Year</TableCell>
        <ButtonCell>Action</ButtonCell>
      </TableRow>
      {yearCourses.map(course => (
        <TableRow key={course.course_code}>
          <TableCell>{course.course_code}</TableCell>
          <NameCell>{course.course_name}</NameCell>
          <TableCell>{getDisplayPeriod(course.periods[0])}</TableCell>
          <TableCell>
            <ArrowButton onClick={() => changeYear(course.course_code, year === 4 ? 5 : 4)}>
              {year === 4 ? '\u2192' : '\u2190'}
            </ArrowButton>
          </TableCell>
          <ButtonCell>
            <AlertButton type='button' onClick={() => removeCourse(course.course_code, year)}>
              <ButtonIcon>&#8722;</ButtonIcon> Remove
            </AlertButton>
          </ButtonCell>
        </TableRow>
      ))}
    </ListContainer>
  );
}

export default SelectedCoursesTable;
