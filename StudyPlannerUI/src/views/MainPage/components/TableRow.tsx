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
            style={{ minWidth: 'max-content', width: '100%' }}
            defaultValue=''
            onChange={handlePeriodChange}
          >
            <option style={{ minWidth: 'max-content', width: '100%' }} value='' disabled>
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
        {/*
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
                {period.start} {endPeriod(period) && `\u2192 ${endPeriod(period)}`}
              </option>
            ))}
          </select>
        ) : (
          <span>
            {course.periods[0].start}{' '}
            {endPeriod(course.periods[0]) && `\u2192 ${endPeriod(course.periods[0])}`}
          </span>
        )}
        */}
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
