import React, { useContext, useEffect, useState } from 'react';

export type SelectedCourses = Record<CourseData.YEAR, CourseData.SelectedCourse[]>;

interface LoadedPlan {
  readOnly: boolean;
  name: string;
  url: string;
}

// TODO: Refactor to a more optimized solution
export interface CtxType {
  courses: SelectedCourses;
  loaded: boolean;
  loadedPlan: LoadedPlan;
  unsavedChanges: boolean;
  setLoadedPlan: (loadedPlan: LoadedPlan) => void;
  hasCourse: (courseCode: string) => boolean;
  addCourse: (
    course: CourseData.SelectedCourse,
    year: CourseData.YEAR,
    period: API.Period | null
  ) => void;
  removeCourse: (courseName: string, year?: CourseData.YEAR) => void;
  changeYear: (courseName: string, year: CourseData.YEAR) => void;
  setCourses: (selectedCourses: SelectedCourses) => void;
}

// Create the context
const MyContext = React.createContext<CtxType | undefined>(undefined);

export function useStudyplanContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('Studyplan Context must be used within a StudyplanProvider');
  }
  return context;
}

export interface InitialState {
  courses: SelectedCourses;
  readOnly: boolean;
  name: string;
  url: string;
}

interface ProviderProps {
  children: React.ReactNode;
  initState?: InitialState;
}

const defaultPlan: SelectedCourses = {
  4: [],
  5: []
};

function StudyplanProvider({ children, initState }: ProviderProps) {
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourses>(defaultPlan);
  const [loaded, setLoaded] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState<string>('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (initState) {
      const { readOnly, name, courses, url } = initState;
      setSelectedCourses(courses);
      setReadOnly(readOnly);
      setName(name);
      setUrl(url);
      setLoaded(true);
    }
  }, [initState]);

  const hasCourse = (courseCode: string) =>
    selectedCourses[4].some(course => course.course_code === courseCode) ||
    selectedCourses[5].some(course => course.course_code === courseCode);

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

    setSelectedCourses(prev => ({
      ...prev,
      [year]: [...prev[year], updatedCourse]
    }));

    setUnsavedChanges(true);
  };

  const setCourses = (selectedCourses: SelectedCourses) => {
    setSelectedCourses(selectedCourses);
  };

  const removeCourse = (courseName: string, year?: CourseData.YEAR) => {
    if (year) {
      setSelectedCourses(prev => ({
        ...prev,
        [year]: prev[year].filter(c => c.course_code !== courseName)
      }));
    } else {
      setSelectedCourses(prev => ({
        4: prev[4].filter(c => c.course_code !== courseName),
        5: prev[5].filter(c => c.course_code !== courseName)
      }));
    }
    setUnsavedChanges(true);
  };

  const changeYear = (courseName: string, year: CourseData.YEAR) => {
    const prevYear = year === 4 ? 5 : 4;
    setSelectedCourses(prev => {
      const courseIndex = prev[prevYear].findIndex(c => c.course_code === courseName);
      if (courseIndex < 0) return prev;

      const course = prev[prevYear][courseIndex];
      course.selectedYear = year;
      return {
        ...prev,
        [prevYear]: prev[prevYear].filter((_, index) => index !== courseIndex),
        [year]: [...prev[year], course]
      };
    });
    setUnsavedChanges(true);
  };

  const loadedPlan: LoadedPlan = {
    readOnly,
    name,
    url
  };

  const setLoadedPlan = (loadedPlan: LoadedPlan) => {
    setReadOnly(loadedPlan.readOnly);
    setName(loadedPlan.name);
    setUrl(loadedPlan.url);
  };

  const savePlan = () => {
    if (!unsavedChanges) return;
    // TODO: Implement API CALL
    setUnsavedChanges(false);
  };

  const store: CtxType = {
    hasCourse,
    loaded,
    loadedPlan,
    unsavedChanges,
    setLoadedPlan,
    courses: selectedCourses,
    addCourse,
    removeCourse,
    changeYear,
    setCourses
  };

  return <MyContext.Provider value={store}>{children}</MyContext.Provider>;
}

export default StudyplanProvider;
