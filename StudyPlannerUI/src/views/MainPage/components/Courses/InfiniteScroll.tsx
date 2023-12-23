// TODO: Rename file to a more appropriate name
import { useState } from 'react';
import IconButton from 'components/Button/Button';
import { ReactComponent as RemoveIcon } from 'assets/remove-outline.svg';
import AddIcon from 'components/Icons/Add';
import { getDisplayPeriod } from 'utils/sortCourses';
import { TableRow, TableCell, NameCell, ButtonCell } from 'components/Table/style';
import { ListContainer } from './InfiniteScroll.style';
import { useStudyplanContext } from 'hooks/CourseContext';

const Header: React.FC = () => {
  return (
    <TableRow header>
      <TableCell>Course Code</TableCell>
      <NameCell>Course Name</NameCell>
      <TableCell>Credits</TableCell>
      <TableCell>Level</TableCell>
      <TableCell>Period</TableCell>
      <ButtonCell>Action</ButtonCell>
    </TableRow>
  );
};

interface RowProps {
  index: number;
  data: {
    courses: CourseData.DataWithLocale[];
  };
}

const Row = ({ index, data }: RowProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);

  const { removeCourse, addCourse, hasCourse } = useStudyplanContext();

  const handleButtonClick = () => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      period: selectedPeriod,
      studyYear: 4
    };
    addCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.courseCode);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const periodIndex = parseInt(event.target.value);
    setSelectedPeriod(course.periods[periodIndex]);
  };

  const course: CourseData.DataWithLocale = data.courses[index];
  const hasMultiplePeriods = course.periods.length > 1;
  const isSelected = hasCourse(course.courseCode);

  return (
    <TableRow>
      <TableCell>{course.courseCode}</TableCell>
      <NameCell>{course.courseName}</NameCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.level}</TableCell>
      <TableCell>
        {hasMultiplePeriods ? (
          <select style={{ minWidth: 'max-content' }} defaultValue='' onChange={handlePeriodChange}>
            <option value='' disabled>
              Select
            </option>
            {course.periods.map((period, index) => (
              <option key={`${period.start}_${period.end}`} value={index}>
                {getDisplayPeriod(period)}
              </option>
            ))}
          </select>
        ) : (
          <span>{getDisplayPeriod(course.periods[0])}</span>
        )}
      </TableCell>
      <ButtonCell>
        {isSelected ? (
          <IconButton text variant='error' icon={<RemoveIcon />} onClick={handleRemoveClick}>
            Remove
          </IconButton>
        ) : (
          <IconButton
            text
            variant='primary'
            icon={<AddIcon />}
            onClick={handleButtonClick}
            disabled={!selectedPeriod && course.periods.length > 1}
          >
            Select
          </IconButton>
        )}
      </ButtonCell>
    </TableRow>
  );
};

interface VirtualizedTableProps {
  courses: CourseData.DataWithLocale[];
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ courses }) => {
  return (
    <ListContainer>
      <Header />
      {courses.map((course, index) => (
        <Row key={course.courseCode} index={index} data={{ courses }} />
      ))}
    </ListContainer>
  );
};

export default VirtualizedTable;
