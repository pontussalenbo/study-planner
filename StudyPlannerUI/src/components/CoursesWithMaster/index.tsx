/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import FlexContainer from 'components/Layout';
import { CREDITS_TOTAL_KEY, MASTERS_SUMMARY_NAME } from 'api/constants';
import styled from 'styled-components';

const Pill = styled.div<{ color?: string }>`
  background-color: ${({ theme, color }) => color || theme.tertiary};
  color: ${({ theme }) => theme.onTertiary}};
  height: 24px;
  max-width: 60px;
  border-radius: 8px 8px 8px 8px;
  padding: 5px 12px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.85em;
  font-weight: 500;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
  flex: 1 0 70%;
  align-self: center;
`;

const PillContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 0 30%; // This makes the pills take up at most 50% width
`;

interface CourseProps {
  name: string;
  code: string;
  masters: string[];
  colors: Map<string, string>;
}

const Course: React.FC<CourseProps> = ({ name, code, masters, colors }) => {
  return (
    <FlexContainer>
      <TextContainer>
        <p>({code})</p>
        <p>{name}</p>
      </TextContainer>
      <PillContainer>
        {masters.map(
          (master, idx) =>
            master !== CREDITS_TOTAL_KEY.toLowerCase() && (
              <Pill key={idx} color={colors.get(master)}>
                {master.slice(0, 3)}
              </Pill>
            )
        )}
      </PillContainer>
    </FlexContainer>
  );
};

interface CourseContainerProps {
  courses: CourseData.SelectedCourse[];
  masters: API.MasterStatus[];
  colorMap: Map<string, string>;
}

export const CourseContainer: React.FC<CourseContainerProps> = ({ courses, masters, colorMap }) => {
  const getCourseMasters = (course: CourseData.SelectedCourse) => {
    return masters
      .filter(
        master =>
          master.selectedCourses.includes(course.courseCode) &&
          master.master !== MASTERS_SUMMARY_NAME
      )
      .map(master => master.master);
  };

  return (
    <>
      {Object.values(courses)
        .flat()
        .map(course => (
          <Course
            key={course.courseCode}
            name={course.courseName}
            code={course.courseCode}
            masters={getCourseMasters(course)}
            colors={colorMap}
          />
        ))}
    </>
  );
};
