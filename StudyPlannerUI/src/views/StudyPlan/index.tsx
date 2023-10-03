import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SelectedCoursesProvider, { InitialState } from 'hooks/CourseContext';
import { Endpoints } from 'interfaces/API_Constants.d';
import { GET, POST } from 'utils/fetch';
import MainPage from 'views/MainPage';
import { SelectedCourses } from 'hooks/CourseContext';
import ReadOnly from './ReadOnly';
import { Filters } from 'interfaces/Types';

interface StudyPlanCourse {
  course_code: string;
  period_start: number;
  period_end: number;
  study_year: CourseData.YEAR;
}

interface StudyPlanResponse {
  IsReadOnly: boolean;
  StudyPlanName: string;
  Programme: string;
  Year: string;
  SelectedCourses: StudyPlanCourse[];
}

const defaultCourses = {
  4: [],
  5: []
};

const getPlan = async (id: string, controller?: AbortController) => {
  const response = await GET<StudyPlanResponse>(
    Endpoints.savePlan,
    new URLSearchParams({ StudyPlanId: id }),
    controller
  );

  // TODO: Handle no response?
  if (!response) {
    return {
      StudyPlanName: '',
      Programme: '',
      Year: '',
      IsReadOnly: false,
      courses: [],
      SelectedCourses: []
    };
  }

  const body = {
    Programme: response.Programme,
    Year: response.Year
  };

  const courses = await POST<API.CourseData[]>(Endpoints.courses, body, controller);

  return { ...response, courses };
};

const parseCourse = (selectedCourse: StudyPlanCourse, courses: API.CourseData[]) => {
  // This should not happen to be null, since a selected course should be in the course list.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const courseData = courses.find(course => course.course_code === selectedCourse.course_code)!;

  const selectedPeriod: API.Period = {
    start: selectedCourse.period_start,
    end: selectedCourse.period_end
  };

  // This is the data that represents a course in the Context.
  const course: CourseData.SelectedCourse = {
    course_code: selectedCourse.course_code,
    course_name: courseData.course_name_en,
    credits: courseData.credits,
    level: courseData.level,
    selectedYear: selectedCourse.study_year,
    selectedPeriod,
    periods: courseData.periods
  };

  return course;
};

function parseCourses(selectedCourses: StudyPlanCourse[], courses: API.CourseData[]) {
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

function StudyPlan() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourses | undefined>(undefined);
  const [filters, setFilters] = useState<Filters>({
    Programme: '',
    Year: ''
  });

  useEffect(() => {
    const controller = new AbortController();

    if (!id) return;

    getPlan(id, controller)
      .then(response => {
        const { IsReadOnly, StudyPlanName, Programme, Year, courses, SelectedCourses } = response;

        setIsReadOnly(IsReadOnly);
        setFilters({ Programme, Year });
        setName(StudyPlanName);
        setUrl(`${window.location.origin}/studyplan/${id}`);

        return {
          courses,
          selectedCourses: SelectedCourses
        };
      })
      .then(({ courses, selectedCourses }) => {
        const plan = parseCourses(selectedCourses, courses);
        setSelectedCourses(plan);
      })
      .then(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [id]);

  const initState: InitialState = {
    courses: selectedCourses ?? defaultCourses,
    readOnly: isReadOnly,
    name,
    url
  };

  if (loading) return <div>loading...</div>;
  else {
    return (
      <SelectedCoursesProvider initState={initState}>
        {isReadOnly ? <ReadOnly filters={filters} /> : <MainPage filters={filters} />}
      </SelectedCoursesProvider>
    );
  }
}

export default StudyPlan;
