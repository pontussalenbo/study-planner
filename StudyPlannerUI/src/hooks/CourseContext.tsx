/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React, { useContext, useEffect, useReducer } from 'react';
import { StudyPlan, savePlan as savePlanAPI } from 'api/studyplan';
import { Filters } from 'interfaces/Types';
import { LoadedPlan, SelectedCourses, State, URLS, reducer } from '../reducers/courseContext';

interface ExisitingPlan extends StudyPlan {
  studyPlanId: string;
}

interface SavePlanResp {
  success: boolean;
  urls: URLS | null;
}

// TODO: extend State interface
export interface CtxType {
  /**
   * The courses that are currently selected in the study plan.
   */
  courses: SelectedCourses;

  /**
   * Whether the study plan has been loaded or not from a saved plan.
   */
  loaded: boolean;

  /**
   * Information about the loaded plan.
   */
  loadedPlan: LoadedPlan;

  /**
   * Whether the study plan has unsaved changes or not.
   */
  unsavedChanges: boolean;

  /**
   * Custom courses that have been added to the study plan.
   */
  customCourses: SelectedCourses;

  /**
   * The urls (editable and readonly), used to access the study plan.
   */
  urls: URLS;

  /**
   * Saves the study plan to the database.
   */
  savePlan: (filters: Filters) => Promise<SavePlanResp>;

  /**
   * Sets the urls (editable and readonly) for the study plan.
   */
  setUrls: (urls: URLS) => void;

  /**
   * Sets the loaded plan information.
   */
  setLoadedPlan: (loadedPlan: LoadedPlan) => void;

  /**
   * Checks if the study plan has a course with the given course code.
   */
  hasCourse: (courseCode: string) => boolean;

  /**
   * Adds a course to the study plan.
   */
  addCourse: (
    course: CourseData.SelectedCourse,
    year: CourseData.YEAR,
    period: API.Period | null
  ) => void;

  /**
   * Removes a course from the study plan.
   */
  removeCourse: (courseName: string, year?: CourseData.YEAR) => void;

  removeCustomCourse: (courseName: string, year?: CourseData.YEAR) => void;

  /**
   * Changes the selected year of a course in the study plan.
   */
  changeYear: (courseName: string, year: CourseData.YEAR, custom?: boolean) => void;
  /**
   * Sets the courses that are currently selected in the study plan.
   */
  setCourses: (selectedCourses: SelectedCourses) => void;
}

// Create the context
const StudyPlanContext = React.createContext<CtxType | undefined>(undefined);

export function useStudyplanContext() {
  const context = useContext(StudyPlanContext);
  if (context === undefined) {
    throw new Error('Studyplan Context must be used within a StudyplanProvider');
  }
  return context;
}

const initialState: State = {
  selectedCourses: { 4: [], 5: [] },
  loaded: false,
  loadedPlan: { readOnly: false, name: '', url: '' },
  unsavedChanges: false,
  urls: { sId: '', sIdReadOnly: '' },
  customCourses: { 4: [], 5: [] }
};

/**
 * Props for the StudyplanProvider component.
 */
interface ProviderProps {
  /**
   * Components that are wrapped by the StudyplanProvider.
   */
  children: React.ReactNode;
  /**
   * The initial state to set when the component is mounted. [Optional]
   */
  initState?: State;
}

/**
 * StudyplanProvider
 *
 * The `StudyplanProvider` component provides a React context that manages the state
 * and logic related to a study plan. It utilizes the `useReducer` hook to manage complex
 * state logic and provides a set of methods that allow child components to interact
 * with the study plan's state.
 */
export function StudyplanProvider({ children, initState }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initState) {
      dispatch({ type: 'SET_INIT_STATE', payload: initState });
    }
  }, [initState]);

  const hasCourse = (courseCode: string) => {
    return (
      state.selectedCourses[4].some(course => course.courseCode === courseCode) ||
      state.selectedCourses[5].some(course => course.courseCode === courseCode)
    );
  };

  const addCourse = (
    course: CourseData.SelectedCourse,
    year: CourseData.YEAR = course.studyYear,
    period: API.Period | null
  ) => {
    if (hasCourse(course.courseCode)) {
      return;
    }

    const updatedCourse = {
      ...course,
      period: period
    };

    const updatedSelectedCourses = {
      ...state.selectedCourses,
      [year]: [...state.selectedCourses[year], updatedCourse]
    };

    if (course.custom) {
      const customCourses = {
        ...state.customCourses,
        [year]: [...state.customCourses[year], updatedCourse]
      };

      dispatch({ type: 'SET_CUSTOM_COURSES', payload: customCourses });
    } else {
      dispatch({ type: 'SET_SELECTED_COURSES', payload: updatedSelectedCourses });
    }
  };

  const removeCourse = (courseName: string, year?: CourseData.YEAR) => {
    const updatedSelectedCourses = { ...state.selectedCourses };
    if (year) {
      updatedSelectedCourses[year] = updatedSelectedCourses[year].filter(
        c => c.courseCode !== courseName
      );
    } else {
      updatedSelectedCourses[4] = updatedSelectedCourses[4].filter(
        c => c.courseCode !== courseName
      );
      updatedSelectedCourses[5] = updatedSelectedCourses[5].filter(
        c => c.courseCode !== courseName
      );
    }
    dispatch({ type: 'SET_SELECTED_COURSES', payload: updatedSelectedCourses });
  };

  const removeCustomCourse = (courseName: string, year?: CourseData.YEAR) => {
    if (year) {
      const updatedCustomCourses = { ...state.customCourses };
      updatedCustomCourses[year] = updatedCustomCourses[year].filter(
        c => c.courseCode !== courseName
      );
      dispatch({ type: 'SET_CUSTOM_COURSES', payload: updatedCustomCourses });
    } else {
      const updatedCustomCourses = { ...state.customCourses };
      updatedCustomCourses[4] = updatedCustomCourses[4].filter(c => c.courseCode !== courseName);
      updatedCustomCourses[5] = updatedCustomCourses[5].filter(c => c.courseCode !== courseName);
      dispatch({ type: 'SET_CUSTOM_COURSES', payload: updatedCustomCourses });
    }
  };

  const changeYear = (courseName: string, year: CourseData.YEAR, custom?: boolean) => {
    const prevYear = year === 4 ? 5 : 4;

    const courses = custom ? state.customCourses : state.selectedCourses;

    const course = courses[prevYear].find(c => c.courseCode === courseName);

    if (!course) {
      return;
    }

    course.studyYear = year;
    console.log('custom', course);

    if (custom) {
      const updatedCustomCourses = {
        ...state.customCourses,
        [prevYear]: state.customCourses[prevYear].filter(c => c.courseCode !== courseName),
        [year]: [...state.customCourses[year], course]
      };

      dispatch({ type: 'SET_CUSTOM_COURSES', payload: updatedCustomCourses });
      return;
    }

    const updatedSelectedCourses = {
      ...state.selectedCourses,
      [prevYear]: state.selectedCourses[prevYear].filter(c => c.courseCode !== courseName),
      [year]: [...state.selectedCourses[year], course]
    };

    dispatch({ type: 'SET_SELECTED_COURSES', payload: updatedSelectedCourses });
  };

  const setCourses = (selectedCourses: SelectedCourses) => {
    dispatch({ type: 'SET_SELECTED_COURSES', payload: selectedCourses });
  };

  const setUrls = (urls: URLS) => {
    dispatch({ type: 'SET_URLS', payload: urls });
  };

  const setLoadedPlan = (loadedPlan: LoadedPlan) => {
    dispatch({ type: 'SET_LOADED_PLAN', payload: loadedPlan });
  };

  const parseCourses = (courses: CourseData.SelectedCourse[]) => {
    return courses.map(course => ({
      courseCode: course.courseCode,
      period: course.periods[0],
      credits: course.credits,
      level: course.level,
      courseName: course.courseName,
      studyYear: course.studyYear
    }));
  };

  const savePlan = async (filters: Filters) => {
    if (!state.unsavedChanges) {
      return {
        success: true,
        urls: {
          sId: state.urls.sId,
          sIdReadOnly: state.urls.sIdReadOnly
        }
      };
    }

    const SelectedCourses = parseCourses([
      ...state.selectedCourses[4],
      ...state.selectedCourses[5]
    ]);

    const customCourses = parseCourses([...state.customCourses[4], ...state.customCourses[5]]);

    const plan: ExisitingPlan = {
      studyPlanId: state.urls.sId,
      studyPlanName: state.loadedPlan.name,
      selectedCourses: SelectedCourses,
      customCourses: customCourses,
      programme: filters.programme,
      year: filters.year
    };

    try {
      const response = await savePlanAPI(plan);
      const { studyPlanId, studyPlanReadOnlyId } = response;
      setUrls({
        sId: studyPlanId,
        sIdReadOnly: studyPlanReadOnlyId
      });
      dispatch({ type: 'SET_UNSAVED_CHANGES', payload: false });
      return {
        success: true,
        urls: {
          sId: studyPlanId,
          sIdReadOnly: studyPlanReadOnlyId
        }
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        urls: null
      };
    }
  };

  const contextValue: CtxType = {
    courses: state.selectedCourses,
    customCourses: state.customCourses,
    loaded: state.loaded,
    loadedPlan: state.loadedPlan,
    unsavedChanges: state.unsavedChanges,
    urls: state.urls,
    hasCourse,
    addCourse,
    removeCourse,
    removeCustomCourse,
    changeYear,
    setCourses,
    savePlan,
    setUrls,
    setLoadedPlan
  };

  return <StudyPlanContext.Provider value={contextValue}>{children}</StudyPlanContext.Provider>;
}

export default StudyplanProvider;
