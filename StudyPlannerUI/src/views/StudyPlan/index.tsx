/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import SelectedCoursesProvider from 'hooks/CourseContext';
import useFetchStudyPlan, { Data } from 'hooks/usePreloadStudyPlan';
import { LoadedPlan, State } from 'reducers/courseContext';
import MainPage from 'views/MainPage';

import Pencil from 'components/Icons/Spinner';

import ReadOnly from './ReadOnly';

const parseResponse = (response: Data) => {
  const { isReadOnly, name, url, selectedCourses, customCourses, filters, id } = response;

  const loadedPlan: LoadedPlan = {
    readOnly: isReadOnly,
    name,
    url
  };

  const sId = !isReadOnly ? id : '';
  const sIdReadOnly = isReadOnly ? id : '';

  const initState: State = {
    filters,
    selectedCourses,
    customCourses,
    loaded: true,
    unsavedChanges: false,
    loadedPlan,
    urls: { sId, sIdReadOnly: sIdReadOnly }
  };

  return initState;
};

const StudyPlan = () => {
  const { loading, error, data } = useFetchStudyPlan();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <Pencil />;
  }

  const initState = parseResponse(data);

  return (
    <SelectedCoursesProvider initState={initState}>
      {data.isReadOnly ? <ReadOnly filters={initState.filters} /> : <MainPage />}
    </SelectedCoursesProvider>
  );
};

export default StudyPlan;
