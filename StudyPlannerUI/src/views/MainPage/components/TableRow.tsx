import { useContext, useState } from 'react';
import { StyledCell } from './Table.style';
import { AlertButton, StyledButton } from 'components/Button';
import { MyContext, CtxType } from 'hooks/CourseContext';

interface CourseTableRowProps {
  course: CourseData.DataWithLocale;
  handleAddCourse: (
    course: CourseData.SelectedCourse,
    selectedYear: 4 | 5,
    selectedPeriod: API.Period | null
  ) => void;
}

const CourseTableRow: React.FC<CourseTableRowProps> = ({ course, handleAddCourse }) => {
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

  const endPeriod = (period: API.Period) => {
    return period.end > period.start ? period.end : null;
  };

  return (
    <tr>
      <StyledCell>{course.course_code}</StyledCell>
      <StyledCell>{course.course_name}</StyledCell>
      <StyledCell>{course.credits}</StyledCell>
      <StyledCell>{course.level}</StyledCell>
      <StyledCell>
        {course.periods.length > 1 ? (
          <select
            style={{ minWidth: 'max-content' }}
            defaultValue=''
            onChange={handlePeriodChange}
          >
            <option style={{ minWidth: 'max-content' }} value='' disabled>
              Select
            </option>
            {course.periods.map((period, index) => {
              const end = endPeriod(period);
              const displayPeriod = end ? `${period.start} \u2192 ${end}` : period.start;

              return (
                <option style={{ minWidth: 'max-content' }} key={index} value={index}>
                  {displayPeriod}
                </option>
              );
            })}
          </select>
        ) : (
          <span>
            {(() => {
              const end = endPeriod(course.periods[0]);
              const displayPeriod = end
                ? `${course.periods[0].start} \u2192 ${end}`
                : course.periods[0].start;
              return displayPeriod;
            })()}
          </span>
        )}
      </StyledCell>
      <StyledCell>
        {selected ? (
          <AlertButton onClick={handleRemoveClick}>&#45; Remove</AlertButton>
        ) : (
          <StyledButton
            style={{ display: 'block', margin: '0 auto' }}
            disabled={!selectedPeriod && course.periods.length > 1}
            onClick={handleButtonClick}
          >
            &#43; Select
          </StyledButton>
        )}
      </StyledCell>
    </tr>
  );
};

export default CourseTableRow;
