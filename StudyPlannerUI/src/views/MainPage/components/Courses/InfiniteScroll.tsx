// TODO: Rename file to a more appropriate name
import React, { useContext, useMemo, useState } from 'react';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { useTheme } from 'styled-components';
import StyledButtonWithIcon, { AlertButton } from 'components/Button';
import { Select } from './styles';
import { ButtonCell, ListContainer, NameCell, TableRow, TableCell } from './InfiniteScroll.style';
import { getDisplayPeriod } from 'utils/sortCourses';

type Props = {
  courses: CourseData.DataWithLocale[];
};

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
  const theme = useTheme();

  const course: CourseData.DataWithLocale = data.courses[index];
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);

  const { removeCourse, addCourse, courseCodes } = useContext(MyContext) as CtxType;

  const isSelected = useMemo(() => {
    return courseCodes.has(course.course_code);
  }, [courseCodes, course.course_code]);

  const handleButtonClick = () => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      selectedPeriod,
      selectedYear: 4
    };
    addCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.course_code, 4);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const periodIndex = parseInt(event.target.value);
    setSelectedPeriod(course.periods[periodIndex]);
  };

  const hasMultiplePeriods = course.periods.length > 1;

  return (
    <TableRow style={{ borderBottom: `1px solid ${theme.outline}` }}>
      <TableCell>{course.course_code}</TableCell>
      <NameCell>{course.course_name}</NameCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.level}</TableCell>
      <TableCell>
        {hasMultiplePeriods ? (
          <Select defaultValue='' onChange={handlePeriodChange}>
            <option value='' disabled>
              Select
            </option>
            {course.periods.map((period, index) => (
              <option key={`${period.start}_${period.end}`} value={index}>
                {getDisplayPeriod(period)}
              </option>
            ))}
          </Select>
        ) : (
          <span>{getDisplayPeriod(course.periods[0])}</span>
        )}
      </TableCell>
      <ButtonCell>
        {isSelected ? (
          <AlertButton onClick={handleRemoveClick}>&#45; Remove</AlertButton>
        ) : (
          <StyledButtonWithIcon
            disabled={!selectedPeriod && course.periods.length > 1}
            onClick={handleButtonClick}
            text={false}
          >
            &#43; Select
          </StyledButtonWithIcon>
        )}
      </ButtonCell>
    </TableRow>
  );
};

const VirtualizedTable: React.FC<Props> = ({ courses }) => {
  return (
    <ListContainer>
      <Header />
      {courses.map((course, index) => (
        <Row key={course.course_code} index={index} data={{ courses }} />
      ))}
    </ListContainer>
  );
};

export default VirtualizedTable;
