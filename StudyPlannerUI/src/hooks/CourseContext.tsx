import React, { useMemo, useState } from 'react';

type SelectedCourses = Record<4 | 5, CourseData.SelectedCourse[]>;

export interface CtxType {
  courseCodes: Set<string>;
  courses: SelectedCourses;
  setSelectedCourses: React.Dispatch<React.SetStateAction<SelectedCourses>>;

  addCourse: (
    course: CourseData.SelectedCourse,
    year: 4 | 5,
    period: API.Period | null
  ) => void;

  removeCourse: (courseName: string, year?: 4 | 5) => void;
  changeYear: (courseName: string, year: 4 | 5) => void;
}

interface IProps {
  children: React.ReactNode;
}

// Create the context
export const MyContext = React.createContext<CtxType | undefined>(undefined);

// Create a provider component
function SelectedCoursesProvider({ children }: IProps) {
  // store All selected courseCodes in the context to prevent duplicate course choices
  const [x, setCourseCodes] = useState<Set<string>>(new Set());
  const [y, setSelectedCourses] = useState<SelectedCourses>({
    4: [],
    5: []
  });

  const courseCodes = useMemo(() => x, [x]);
  const selectedCourses = useMemo(() => y, [y]);

  const courses = (year?: 4 | 5) => {
    if (year) {
      return selectedCourses[year];
    }
    return selectedCourses[4].concat(selectedCourses[5]);
  };

  const addCourse = (
    course: CourseData.SelectedCourse,
    year: 4 | 5,
    period: API.Period | null
  ) => {
    const isCourseSelected = courseCodes.has(course.course_code);

    if (isCourseSelected) {
      return;
    }

    setCourseCodes(prev => new Set(prev.add(course.course_code)));

    const updatedCourse = {
      ...course,
      selectedPeriod: period
    };

    setSelectedCourses(prev => ({
      ...prev,
      [year]: [...prev[year], updatedCourse]
    }));
  };

  const removeCourse = (courseName: string, year?: 4 | 5) => {
    if (year) {
      setCourseCodes(prev => {
        prev.delete(courseName);
        return new Set(prev);
      });
      const removed = selectedCourses[year].filter(c => c.course_code !== courseName);

      setSelectedCourses(prev => ({
        ...prev,
        [year]: removed
      }));
      return;
    }

    const removed = courseCodes.delete(courseName);
    if (removed) {
      setCourseCodes(prev => new Set(prev));

      setSelectedCourses(prev => ({
        ...prev,
        4: prev[4].filter(c => c.course_code !== courseName),
        5: prev[5].filter(c => c.course_code !== courseName)
      }));
    }
  };

  const changeYear = (courseName: string, year: 4 | 5) => {
    const prevYear = year === 4 ? 5 : 4;
    setSelectedCourses(prev => {
      const courseIndex = prev[prevYear].findIndex(c => c.course_code === courseName);

      if (courseIndex < 0) {
        return prev;
      }

      const course = prev[prevYear][courseIndex];

      return {
        ...prev,
        [prevYear]: prev[prevYear].filter((_, index) => index !== courseIndex),
        [year]: [...prev[year], course]
      };
    });
  };

  const store = {
    courseCodes,
    courses: y,
    setSelectedCourses,
    addCourse,
    removeCourse,
    changeYear
  };

  return <MyContext.Provider value={store}>{children}</MyContext.Provider>;
}

export default SelectedCoursesProvider;
