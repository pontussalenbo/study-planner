import { useCallback, useContext, useMemo, useState, memo, ChangeEvent } from 'react';
import { StyledCell } from '../Table/Table.style';
import { MyContext, CtxType } from 'hooks/CourseContext';
import { AddButton, Select, RemoveButton } from './styles';
import { ReactComponent as AddIcon } from 'components/icons/add.svg';
import { ReactComponent as RemoveIcon } from 'components/icons/remove-outline.svg';
import styled from 'styled-components';

interface CourseTableRowProps {
  course: CourseData.DataWithLocale;
  handleAddCourse: (
    course: CourseData.SelectedCourse,
    selectedYear: 4 | 5,
    selectedPeriod: API.Period | null
  ) => void;
}

interface Period {
  start: number;
  end: number;
}

const getDisplayPeriod = (period: Period) => {
  const { start, end } = period;
  if (start === end) {
    return start;
  }
  return `${start} \u2192 ${end}`;
};

const CenteredCell = styled(StyledCell)`
  text-align: center;
`;

const CourseTableRow: React.FC<CourseTableRowProps> = ({ course, handleAddCourse }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);
  const { courseCodes, removeCourse } = useContext(MyContext) as CtxType;

  const isSelected = useMemo(() => {
    return courseCodes.has(course.course_code);
  }, [courseCodes, course.course_code]);

  const handlePeriodChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const periodIndex = parseInt(event.target.value);
      setSelectedPeriod(course.periods[periodIndex]);
    },
    [course.periods]
  );

  const handleButtonClick = useCallback(() => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      selectedPeriod,
      selectedYear: 4
    };
    handleAddCourse(selectedCourse, 4, selectedPeriod);
  }, [course, handleAddCourse, selectedPeriod]);

  const handleRemoveClick = useCallback(() => {
    removeCourse(course.course_code);
  }, [course.course_code, removeCourse]);

  return (
    <tr>
      <StyledCell>{course.course_code}</StyledCell>
      <StyledCell>{course.course_name}</StyledCell>
      <CenteredCell>{course.credits}</CenteredCell>
      <CenteredCell>{course.level}</CenteredCell>
      <CenteredCell>
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
      </CenteredCell>
      <StyledCell>
        {isSelected ? (
          <RemoveButton onClick={handleRemoveClick} text={false} icon={<RemoveIcon width='0.8rem' />}>
            Remove
          </RemoveButton>
        ) : (
          <AddButton
            disabled={!selectedPeriod && course.periods.length > 1}
            onClick={handleButtonClick}
            text={false}
            icon={<AddIcon width='0.8rem' />}
          >
            Select
          </AddButton>
        )}
      </StyledCell>
    </tr>
  );
};

export default memo(CourseTableRow);

export const GridTableRow: React.FC<CourseTableRowProps> = ({ course, handleAddCourse }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<API.Period | null>(null);
  const { courseCodes, removeCourse } = useContext(MyContext) as CtxType;

  const isSelected = useMemo(() => {
    return courseCodes.has(course.course_code);
  }, [courseCodes, course.course_code]);

  const handlePeriodChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const periodIndex = parseInt(event.target.value);
      setSelectedPeriod(course.periods[periodIndex]);
    },
    [course.periods]
  );

  const handleButtonClick = useCallback(() => {
    const selectedCourse: CourseData.SelectedCourse = {
      ...course,
      selectedPeriod,
      selectedYear: 4
    };
    handleAddCourse(selectedCourse, 4, selectedPeriod);
  }, [course, handleAddCourse, selectedPeriod]);

  const handleRemoveClick = useCallback(() => {
    removeCourse(course.course_code);
  }, [course.course_code, removeCourse]);

  return (
    <>
      <div>{course.course_code}</div>
      <div>{course.course_name}</div>
      <div>{course.credits}</div>
      <div>{course.level}</div>
      <div>
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
      </div>
      <div>
        {isSelected ? (
          <RemoveButton onClick={handleRemoveClick} text={false} icon={<RemoveIcon width='0.8rem' />}>
            Remove
          </RemoveButton>
        ) : (
          <AddButton
            disabled={!selectedPeriod && course.periods.length > 1}
            onClick={handleButtonClick}
            text={false}
            icon={<AddIcon width='0.8rem' />}
          >
            Select
          </AddButton>
        )}
      </div>
    </>
  );
};
