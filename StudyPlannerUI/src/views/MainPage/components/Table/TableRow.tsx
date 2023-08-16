import { useContext, useState } from 'react';
import { StyledCell } from './Table.style';
import StyledButtonWithIcon, { AlertButton } from 'components/Button';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { Select } from '../Courses/styles';

interface CourseTableRowProps {
  course: CourseData.DataWithLocale;
  handleAddCourse: (
    course: CourseData.SelectedCourse,
    selectedYear: 4 | 5,
    selectedPeriod: API.Period | null
  ) => void;
  style?: React.CSSProperties;
}

interface Period {
  start: number;
  end: number;
}

const getDisplayPeriod = (period: Period) => {
  const end = period.end;
  return end ? `${period.start} \u2192 ${end}` : period.start;
};

const CourseTableRow: React.FC<CourseTableRowProps> = ({ course, handleAddCourse, style }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);
  const [selected, setSelected] = useState(false);
  const { removeCourse } = useContext(MyContext) as CtxType;

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const periodIndex = parseInt(event.target.value);
    setSelectedPeriod(course.periods[periodIndex]);
  };

  const handleButtonClick = () => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      selectedPeriod,
      selectedYear: 4
    };
    setSelected(true);
    handleAddCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.course_code, 4);
    setSelected(false);
  };

  return (
    <tr style={style}>
      <StyledCell>{course.course_code}</StyledCell>
      <StyledCell>{course.course_name}</StyledCell>
      <StyledCell>{course.credits}</StyledCell>
      <StyledCell>{course.level}</StyledCell>
      <StyledCell>
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
      </StyledCell>
      <StyledCell>
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
      </StyledCell>
    </tr>
  );
};

export default CourseTableRow;
