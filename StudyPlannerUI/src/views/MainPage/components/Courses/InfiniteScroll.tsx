import React, { useContext, useState } from 'react';
import { MyContext, CtxType } from 'hooks/CourseContext';
import styled, { useTheme } from 'styled-components';
import StyledButtonWithIcon, { AlertButton } from 'components/Button';
import { Select } from './styles';
import { ListContainer } from './InfiniteScroll.style';

interface TableRowProps {
  header?: boolean;
}

const TableRow = styled.div<TableRowProps>`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  font-weight: ${props => (props.header ? 'bold' : 'normal')};
`;

const TableCell = styled.div`
  padding: 0 10px;
  flex: 1;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const NameCell = styled(TableCell)`
  flex: 4;
`;

const ButtonCell = styled(TableCell)`
  min-width: 100px;
  flex: 0 0 auto;
`;

type Props = {
  courses: CourseData.DataWithLocale[];
};

interface Period {
  start: number;
  end: number;
}

const getDisplayPeriod = (period: Period) => {
  const { start, end } = period;

  return start !== end ? `${period.start} \u2192 ${end}` : period.start;
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
  const [selected, setSelected] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);

  const { removeCourse, addCourse } = useContext(MyContext) as CtxType;

  const handleButtonClick = () => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      selectedPeriod,
      selectedYear: 4
    };
    setSelected(true);
    addCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.course_code, 4);
    setSelected(false);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const periodIndex = parseInt(event.target.value);
    setSelectedPeriod(course.periods[periodIndex]);
  };

  return (
    <TableRow style={{ borderBottom: `1px solid ${theme.outline}` }}>
      <TableCell>{course.course_code}</TableCell>
      <NameCell>{course.course_name}</NameCell>
      <TableCell>{course.credits}</TableCell>
      <TableCell>{course.level}</TableCell>
      <TableCell>
        {course.periods.length > 1 ? (
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
        {selected ? (
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
