import SelectedCoursesProvider, { InitialState } from 'hooks/CourseContext';
import MainPage from 'views/MainPage';
import ReadOnly from './ReadOnly';
import useFetchStudyPlan from 'hooks/usePreloadStudyPlan';

function StudyPlan() {
  const { loading, error, data } = useFetchStudyPlan();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div>loading...</div>;
  }

  const { isReadOnly, name, url, selectedCourses, filters } = data;

  const initState: InitialState = {
    selectedCourses,
    readOnly: isReadOnly,
    name,
    url
  };

  return (
    <SelectedCoursesProvider initState={initState}>
      {isReadOnly ? <ReadOnly filters={filters} /> : <MainPage filters={filters} />}
    </SelectedCoursesProvider>
  );
}

export default StudyPlan;
