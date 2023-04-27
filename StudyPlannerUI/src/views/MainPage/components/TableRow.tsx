import { useState } from 'react';
import { StyledCell } from './Table.style';
import { StyledButton } from 'components/Button';

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

  return (
    <tr>
      <StyledCell>{course.course_code}</StyledCell>
      <StyledCell>{course.course_name}</StyledCell>
      <StyledCell>{course.credits}</StyledCell>
      <StyledCell>{course.level}</StyledCell>
      <StyledCell>
        {course.periods.length > 1 ? (
          <select
            style={{ minWidth: 'max-content', width: '100%' }}
            defaultValue=''
            onChange={handlePeriodChange}
          >
            <option style={{ minWidth: 'max-content', width: '100%' }} value='' disabled>
              Select
            </option>
            {course.periods.map((period, index) => (
              <option style={{ minWidth: 'max-content' }} key={index} value={index}>
                {period.Start} &rarr; {period.End}
              </option>
            ))}
          </select>
        ) : (
          <span>{course.periods[0].Start}</span>
        )}
      </StyledCell>
      <StyledCell>
        <StyledButton
          style={{ display: 'block', margin: '0 auto' }}
          disabled={!selectedPeriod && course.periods.length > 1}
          onClick={handleButtonClick}
        >
          Add
        </StyledButton>
      </StyledCell>
    </tr>
  );
};

export default CourseTableRow;
