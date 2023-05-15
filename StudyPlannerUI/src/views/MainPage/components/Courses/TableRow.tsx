import { useCallback, useContext, useMemo, useState } from 'react';
import { StyledCell } from '../Table/Table.style';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { ActionButton, RemoveButton } from '../styles';
import { Select } from './styles';

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
  const { courseCodes, removeCourse } = useContext(MyContext) as CtxType;

  const isSelected = useMemo(() => {
    return courseCodes.has(course.course_code);
  }, [courseCodes, course.course_code]);

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
    handleAddCourse(selectedCourse, 4, selectedPeriod);
  };

  const handleRemoveClick = () => {
    removeCourse(course.course_code);
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
          <Select defaultValue='' onChange={handlePeriodChange}>
            <option value='' disabled>
              Select
            </option>
            {course.periods.map((period, index) => {
              const end = endPeriod(period);
              const displayPeriod = end ? `${period.start} \u2192 ${end}` : period.start;

              return (
                <option key={index} value={index}>
                  {displayPeriod}
                </option>
              );
            })}
          </Select>
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
        {isSelected ? (
          <RemoveButton onClick={handleRemoveClick}>&#45; Remove</RemoveButton>
        ) : (
          <ActionButton
            disabled={!selectedPeriod && course.periods.length > 1}
            onClick={handleButtonClick}
          >
            &#43; Select
          </ActionButton>
        )}
      </StyledCell>
    </tr>
  );
};

export default CourseTableRow;
