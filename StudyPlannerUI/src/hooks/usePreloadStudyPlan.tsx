/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useCallback, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseInfoByCode, StudyPlanCoursesResponse } from 'api/courses';
import { getPlan, StudyPlanCourse } from 'api/studyplan';
import { Filters } from 'interfaces/Types';

import { SelectedCourses } from '../reducers/courseContext';

const parseCourse = (selectedCourse: StudyPlanCourse, courses: StudyPlanCoursesResponse) => {
  const courseData = courses[selectedCourse.courseCode];

  if (!courseData) {
    throw new Error(`Course ${selectedCourse.courseCode} not found in database.`);
  }

  // This is the data that represents a course in the Context.
  const course: CourseData.SelectedCourse = {
    courseCode: selectedCourse.courseCode,
    courseName: courseData.courseName_en,
    courseName_other: courseData.courseName_sv,
    credits: courseData.credits,
    level: courseData.level,
    studyYear: selectedCourse.studyYear,
    period: selectedCourse.period,
    periods: [selectedCourse.period]
  };

  return course;
};

function parseCourses(selectedCourses: StudyPlanCourse[], courses: StudyPlanCoursesResponse) {
  const plan: SelectedCourses = {
    4: [],
    5: []
  };
  selectedCourses.forEach(course => {
    const data = parseCourse(course, courses);
    plan[course.studyYear].push(data);
  });

  return plan;
}

const initialState: State = {
  loading: false,
  error: undefined,
  data: undefined
};

export interface Data {
  isReadOnly: boolean;
  name: string;
  url: string;
  id: string;
  selectedCourses: SelectedCourses;
  customCourses: SelectedCourses;
  filters: Filters;
}

interface State {
  data?: Data;
  error?: Error;
  loading: boolean;
}
interface Action {
  type: 'SUCCESS' | 'ERROR';
  data?: Data;
  error?: Error;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUCCESS':
      return { ...initialState, data: action.data };
    case 'ERROR':
      return { ...initialState, error: action.error ?? new Error('Unknown error') };
    default:
      return state;
  }
}

const useFetchStudyPlan = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(
    async (signal: AbortController) => {
      if (!id) {
        dispatch({ type: 'ERROR', error: new Error('No id given') });
        return;
      }

      try {
        const response = await getPlan(id, signal);
        const { isReadOnly, studyPlanName, programme, year, selectedCourses, customCourses } =
          response;

        const courseCodes = selectedCourses.map(course => course.courseCode);
        const courseData = await getCourseInfoByCode(courseCodes);
        const plan = parseCourses(selectedCourses, courseData);

        const customPlan: SelectedCourses = {
          4: [],
          5: []
        };
        customCourses?.map(course => {
          const data = {
            ...course,
            // FIXME: This is a hack to make the course appear in the UI
            periods: [course.period!],
            custom: true
          };
          customPlan[course.studyYear].push(data);
        });

        const data = {
          isReadOnly,
          id,
          name: studyPlanName,
          url: id,
          selectedCourses: plan,
          customCourses: customPlan,
          filters: { programme, year }
        };

        dispatch({ type: 'SUCCESS', data });
      } catch (error) {
        dispatch({ type: 'ERROR', error: error as Error });
      }
    },
    [id]
  );

  // Fetch data when id changes
  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);

    return () => {
      abortController.abort();
    };
  }, [fetchData]);

  return state;
};

export default useFetchStudyPlan;
