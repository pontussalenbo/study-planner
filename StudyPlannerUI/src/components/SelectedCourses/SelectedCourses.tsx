import { useMemo } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { ArrowButton } from './styles';
import IconButton from 'components/Button/Button';
import { getDisplayPeriod, sortCourses } from 'utils/sortCourses';
import { TableRow, TableCell, NameCell, ButtonCell } from 'components/Table/style';
import { ListContainer } from 'views/MainPage/components/Courses/InfiniteScroll.style';
import { ReactComponent as RemoveIcon } from 'assets/remove-outline.svg';
interface CreditsTableProps {
  year: CourseData.YEAR;
}

function SelectedCoursesTable({ year }: CreditsTableProps): JSX.Element {
  const { courses, customCourses, removeCourse, changeYear } = useStudyplanContext();
  const allCourses = [...courses[year], ...customCourses[year]];
  const yearCourses = useMemo(() => sortCourses(allCourses), [courses, customCourses]);

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
        <TableRow key={course.courseCode}>
          <TableCell>{course.courseCode}</TableCell>
          <NameCell>{course.courseName}</NameCell>
          <TableCell>{getDisplayPeriod(course.periods[0])}</TableCell>
          <TableCell>
            <ArrowButton
              onClick={() => changeYear(course.courseCode, year === 4 ? 5 : 4, course.custom)}
            >
              {year === 4 ? '\u2192' : '\u2190'}
            </ArrowButton>
          </TableCell>
          <ButtonCell>
            <IconButton
              variant='error'
              type='button'
              icon={<RemoveIcon />}
              onClick={() => removeCourse(course.courseCode, year)}
            >
              Remove
            </IconButton>
          </ButtonCell>
        </TableRow>
      ))}
    </ListContainer>
  );
}

export default SelectedCoursesTable;
