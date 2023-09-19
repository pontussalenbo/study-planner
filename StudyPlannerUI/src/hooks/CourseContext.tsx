import React, { createContext, useContext, useMemo, useReducer, useState } from 'react';

type SelectedCourses = Record<4 | 5, CourseData.SelectedCourse[]>;

export interface CtxType {
  courseCodes: Set<string>;
  courses: SelectedCourses;
  setSelectedCourses: React.Dispatch<React.SetStateAction<SelectedCourses>>;

  addCourse: (course: CourseData.SelectedCourse, year: 4 | 5, period: API.Period | null) => void;

  removeCourse: (courseName: string, year?: 4 | 5) => void;
  changeYear: (courseName: string, year: 4 | 5) => void;
}
interface State {
  courseCodes: Set<string>;
  courses: SelectedCourses;
}

type ActionTypes = 'ADD_COURSE' | 'REMOVE_COURSE' | 'CHANGE_YEAR';
interface AddCoursePayload {
  course: CourseData.SelectedCourse;
  year: 4 | 5;
  period: API.Period | null;
}

interface RemoveCoursePayload {
  courseName: string;
  year: 4 | 5;
}

interface ChangeYearPayload {
  courseName: string;
  year: 4 | 5;
}

type ActionPayloads = {
  ADD_COURSE: AddCoursePayload;
  REMOVE_COURSE: RemoveCoursePayload;
  CHANGE_YEAR: ChangeYearPayload;
};

type ActionMap<M extends Record<string, any>> = {
  [K in keyof M]: M[K] extends undefined
    ? {
        type: K;
      }
    : {
        type: K;
        payload: M[K];
      };
};

type Actions = ActionMap<{
  ADD_COURSE: AddCoursePayload;
  REMOVE_COURSE: RemoveCoursePayload;
  CHANGE_YEAR: ChangeYearPayload;
}>[keyof ActionMap<{
  ADD_COURSE: AddCoursePayload;
  REMOVE_COURSE: RemoveCoursePayload;
  CHANGE_YEAR: ChangeYearPayload;
}>];

type AddCourseHandler = (state: State, action: AddCoursePayload) => State;
type RemoveCourseHandler = (state: State, action: RemoveCoursePayload) => State;
type ChangeYearHandler = (state: State, action: ChangeYearPayload) => State;

interface Handlers {
  ADD_COURSE: AddCourseHandler;
  REMOVE_COURSE: RemoveCourseHandler;
  CHANGE_YEAR: ChangeYearHandler;
}

interface BaseAction {
  type: ActionTypes;
}

type Action = {
  [K in ActionTypes]: BaseAction & { type: K; payload: ActionPayloads[K] };
}[ActionTypes];

const funcs = {
  ADD_COURSE: (state: State, action: Actions): State => {
    const { course, year, period } = action.payload as AddCoursePayload;
    // handle the 'ADD_COURSE' action
    if (!course || !year || !period || state.courseCodes.has(course.course_code)) {
      return state;
    }

    const updatedCourse = {
      ...course,
      selectedPeriod: period
    };

    return {
      ...state,
      courseCodes: new Set(state.courseCodes.add(course.course_code)),
      courses: {
        ...state.courses,
        [year]: [...state.courses[year], updatedCourse]
      }
    };
  },
  REMOVE_COURSE: (state: State, action: Actions): State => {
    const { courseName, year } = action.payload as RemoveCoursePayload;
    // handle the 'REMOVE_COURSE' action
    if (!courseName) {
      return state;
    }

    const newCourseCodes = new Set(state.courseCodes);
    let newCourses = { ...state.courses };

    if (year) {
      newCourseCodes.delete(courseName);
      newCourses[year] = state.courses[year].filter(c => c.course_code !== courseName);
    } else {
      newCourseCodes.delete(courseName);
      newCourses = {
        ...state.courses,
        4: state.courses[4].filter(c => c.course_code !== courseName),
        5: state.courses[5].filter(c => c.course_code !== courseName)
      };
    }

    return {
      ...state,
      courseCodes: newCourseCodes,
      courses: newCourses
    };
  },
  CHANGE_YEAR: (state: State, action: Actions): State => {
    const { courseName, year } = action.payload as ChangeYearPayload;
    // handle the 'CHANGE_YEAR' action
    if (!courseName || !year) {
      return state;
    }

    const prevYear = year === 4 ? 5 : 4;
    const courseIndex = state.courses[prevYear].findIndex(c => c.course_code === courseName);

    if (courseIndex < 0) {
      return state;
    }

    const course = state.courses[prevYear][courseIndex];
    return {
      ...state,
      courses: {
        ...state.courses,
        [prevYear]: state.courses[prevYear].filter((_, index) => index !== courseIndex),
        [year]: [...state.courses[year], course]
      }
    };
  }
};

const reducer: React.Reducer<State, Actions> = (state, action) => {
  const actionHandler = funcs[action.type];
  if (!actionHandler) {
    throw new Error(`Unknown action type: ${action.type}`);
  }

  return actionHandler(state, action);
};

const initialState: State = {
  courseCodes: new Set(),
  courses: {
    4: [],
    5: []
  }
};

const SelectedCoursesContext = createContext<State | undefined>(undefined);

const SelectedCoursesDispatchContext = createContext<React.Dispatch<Actions> | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}

export function SelectedCoursesProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SelectedCoursesContext.Provider value={state}>
      <SelectedCoursesDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedCoursesDispatchContext.Provider>
    </SelectedCoursesContext.Provider>
  );
}

export function useSelectedCourses() {
  const context = useContext(SelectedCoursesContext);
  if (context === undefined) {
    throw new Error('useSelectedCourses must be used within a SelectedCoursesProvider');
  }
  return context;
}

export function useSelectedCoursesDispatch() {
  const context = useContext(SelectedCoursesDispatchContext);
  if (context === undefined) {
    throw new Error('useSelectedCoursesDispatch must be used within a SelectedCoursesProvider');
  }
  return context;
}

// TODO: Everything below this should be deleted in the future
// Create the context
export const MyContext = React.createContext<CtxType | undefined>(undefined);

// Create a provider component
function OldProvider({ children }: IProps) {
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

  const addCourse = (course: CourseData.SelectedCourse, year: 4 | 5, period: API.Period | null) => {
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

export default OldProvider;
