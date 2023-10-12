import React, { useContext, useEffect, useReducer } from 'react';
import { StudyPlan, savePlan as savePlanAPI } from 'api/studyplan';
import { Filters } from 'interfaces/Types';
import { LoadedPlan, SelectedCourses, State, URLS, reducer } from '../reducers/courseContext';
interface ExisitingPlan extends StudyPlan {
  UniqueBlob: string;
}

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
   * The urls (editable and readonly), used to access the study plan.
   */
  urls: URLS;
  /**
   * Saves the study plan to the database.
   */
  savePlan: (filters: Filters) => Promise<boolean>;
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
  /**
   * Changes the selected year of a course in the study plan.
   */
  changeYear: (courseName: string, year: CourseData.YEAR) => void;
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

export interface InitialState {
  /**
   * The courses that are currently selected in the study plan.
   */
  selectedCourses: SelectedCourses;
  /**
   * Whether the study plan has been loaded as read only or not.
   */
  readOnly: boolean;
  /**
   * The name of the study plan.
   */
  name: string;
  /**
   * The current url used to access the study plan.
   */
  url: string;
}

const initialState: State = {
  selectedCourses: { 4: [], 5: [] },
  loaded: false,
  loadedPlan: { readOnly: false, name: '', url: '' },
  unsavedChanges: false,
  urls: { sId: '', sIdReadOnly: '' }
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
  initState?: InitialState;
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
      state.selectedCourses[4].some(course => course.course_code === courseCode) ||
      state.selectedCourses[5].some(course => course.course_code === courseCode)
    );
  };

  const addCourse = (
    course: CourseData.SelectedCourse,
    year: CourseData.YEAR = course.selectedYear,
    period: API.Period | null
  ) => {
    if (hasCourse(course.course_code)) {
      return;
    }

    const updatedCourse = {
      ...course,
      selectedPeriod: period
    };

    const updatedSelectedCourses = {
      ...state.selectedCourses,
      [year]: [...state.selectedCourses[year], updatedCourse]
    };

    dispatch({ type: 'SET_SELECTED_COURSES', payload: updatedSelectedCourses });
  };

  const removeCourse = (courseName: string, year?: CourseData.YEAR) => {
    const updatedSelectedCourses = { ...state.selectedCourses };
    if (year) {
      updatedSelectedCourses[year] = updatedSelectedCourses[year].filter(
        c => c.course_code !== courseName
      );
    } else {
      updatedSelectedCourses[4] = updatedSelectedCourses[4].filter(
        c => c.course_code !== courseName
      );
      updatedSelectedCourses[5] = updatedSelectedCourses[5].filter(
        c => c.course_code !== courseName
      );
    }
    dispatch({ type: 'SET_SELECTED_COURSES', payload: updatedSelectedCourses });
  };

  const changeYear = (courseName: string, year: CourseData.YEAR) => {
    const prevYear = year === 4 ? 5 : 4;
    const course = state.selectedCourses[prevYear].find(c => c.course_code === courseName);

    if (!course) {
      return;
    }

    course.selectedYear = year;
    const updatedSelectedCourses = {
      ...state.selectedCourses,
      [prevYear]: state.selectedCourses[prevYear].filter(c => c.course_code !== courseName),
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

  const savePlan = async (filters: Filters) => {
    if (!state.unsavedChanges) {
      return true;
    }

    const SelectedCourses = [...state.selectedCourses[4], ...state.selectedCourses[5]].map(
      course => ({
        course_code: course.course_code,
        period_start: course.periods[0].start,
        period_end: course.periods[0].end,
        study_year: course.selectedYear
      })
    );

    const plan: ExisitingPlan = {
      UniqueBlob: state.urls.sId,
      StudyPlanName: state.loadedPlan.name,
      SelectedCourses: SelectedCourses,
      Programme: filters.Programme,
      Year: filters.Year
    };

    try {
      const response = await savePlanAPI(plan);
      const { StudyPlanId, StudyPlanReadOnlyId } = response;
      setUrls({
        sId: StudyPlanId,
        sIdReadOnly: StudyPlanReadOnlyId
      });
      dispatch({ type: 'SET_UNSAVED_CHANGES', payload: false });
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  };

  const contextValue: CtxType = {
    courses: state.selectedCourses,
    loaded: state.loaded,
    loadedPlan: state.loadedPlan,
    unsavedChanges: state.unsavedChanges,
    urls: state.urls,
    hasCourse,
    addCourse,
    removeCourse,
    changeYear,
    setCourses,
    savePlan,
    setUrls,
    setLoadedPlan
  };

  return <StudyPlanContext.Provider value={contextValue}>{children}</StudyPlanContext.Provider>;
}

export default StudyplanProvider;
