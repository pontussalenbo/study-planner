import SelectedCoursesProvider from 'hooks/CourseContext';
import MainPage from 'views/MainPage';
import ReadOnly from './ReadOnly';
import useFetchStudyPlan from 'hooks/usePreloadStudyPlan';
import { LoadedPlan, State } from 'reducers/courseContext';

function StudyPlan() {
  const { loading, error, data } = useFetchStudyPlan();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div>loading...</div>;
  }

  const { isReadOnly, name, url, selectedCourses, customCourses, filters, id } = data;

  const loadedPlan: LoadedPlan = {
    readOnly: isReadOnly,
    name,
    url
  };

  const sId = !isReadOnly ? id : '';
  const sIdReadOnly = isReadOnly ? id : '';

  const initState: State = {
    selectedCourses,
    customCourses,
    loaded: true,
    unsavedChanges: false,
    loadedPlan,
    urls: { sId, sIdReadOnly: sIdReadOnly }
  };

  return (
    <SelectedCoursesProvider initState={initState}>
      {isReadOnly ? <ReadOnly filters={filters} /> : <MainPage filters={filters} />}
    </SelectedCoursesProvider>
  );
}

export default StudyPlan;
