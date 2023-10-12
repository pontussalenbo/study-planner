import { useReducer, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StudyPlanCourse, getPlan } from 'api/studyplan';
import { Endpoints } from 'api/constants';
import { StudyPlanCoursesResponse, getCourseInfoByCode } from 'api/courses';
import { SelectedCourses } from '../reducers/courseContext';

const parseCourse = (selectedCourse: StudyPlanCourse, courses: StudyPlanCoursesResponse) => {
  const courseData = courses[selectedCourse.course_code];

  if (!courseData) {
    throw new Error(`Course ${selectedCourse.course_code} not found in database.`);
  }

  const selectedPeriod: API.Period = {
    start: selectedCourse.period_start,
    end: selectedCourse.period_end
  };

  // This is the data that represents a course in the Context.
  const course: CourseData.SelectedCourse = {
    course_code: selectedCourse.course_code,
    course_name: courseData.courseName_en,
    credits: courseData.credits,
    level: courseData.level,
    selectedYear: selectedCourse.study_year,
    selectedPeriod,
    periods: [selectedPeriod]
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
    plan[course.study_year].push(data);
  });

  return plan;
}

const initialState: State = {
  loading: false,
  error: undefined,
  data: undefined
};

interface Data {
  isReadOnly: boolean;
  name: string;
  url: string;
  selectedCourses: SelectedCourses;
  filters: {
    Programme: string;
    Year: string;
  };
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
        const { IsReadOnly, StudyPlanName, Programme, Year, SelectedCourses } = response;

        const courseCodes = SelectedCourses.map(course => course.course_code);
        const courseData = await getCourseInfoByCode(courseCodes);
        const plan = parseCourses(SelectedCourses, courseData);

        const data = {
          isReadOnly: IsReadOnly,
          name: StudyPlanName,
          url: `${window.location.origin}${Endpoints.studyPlan}/${id}`,
          selectedCourses: plan,
          filters: { Programme, Year }
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
