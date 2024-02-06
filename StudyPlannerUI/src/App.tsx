/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudyplanProvider from 'hooks/CourseContext';
import ToastProvider from 'hooks/useToast';
import { State, STUDYPLAN_STORAGE_KEY } from 'reducers/courseContext';
import GlobalStyles from 'style/GlobalStyles';
import { customDarkTheme } from 'style/Theme';
import { ThemeProvider } from 'styled-components';

import BetaBanner from 'components/BetaBanner';
import { OutlinedButton, StyledButton } from 'components/Button/style';
import Pencil from 'components/Icons/Spinner';
import { FlexContainer } from 'components/Layout';
import Modal from 'components/Modal';
import Navbar from 'components/Navbar';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';

const MainPage = React.lazy(() => import('views/MainPage'));
const StudyPlan = React.lazy(() => import('views/StudyPlan'));

const SuspenseLayout = () => (
  <React.Suspense fallback={<Pencil />}>
    <Outlet />
  </React.Suspense>
);

const initialState: State = {
  filters: { programme: '', year: '' },
  selectedCourses: { 4: [], 5: [] },
  loaded: false,
  loadedPlan: { readOnly: false, name: '', url: '' },
  unsavedChanges: false,
  urls: { sId: '', sIdReadOnly: '' },
  customCourses: { 4: [], 5: [] }
};

const queryClient = new QueryClient();

function App(): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);
  const [initState, setInitState] = useState<State>(initialState);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(STUDYPLAN_STORAGE_KEY) || 'null');

    if (savedData) {
      setInitState(savedData);
      setShowDialog(true);
    }
  }, []);

  const handleDialog = (accept: boolean) => {
    setShowDialog(false);
    if (!accept) {
      setInitState(initialState);
    }
  };

  if (showDialog && location.pathname === '/') {
    return (
      <ThemeProvider theme={customDarkTheme}>
        <GlobalStyles />
        <Modal hasCloseBtn={false} isOpen={showDialog}>
          <Heading2>It seems like you didn&apos;t save your previous Study Plan.</Heading2>
          <Paragraph>Would you like to restore it and continue where you left?</Paragraph>
          <FlexContainer gap='10px'>
            <StyledButton variant='primary' onClick={() => handleDialog(true)}>
              Yes
            </StyledButton>
            <OutlinedButton variant='secondary' onClick={() => handleDialog(false)}>
              No
            </OutlinedButton>
          </FlexContainer>
        </Modal>
      </ThemeProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StudyplanProvider initState={initState}>
        <ToastProvider>
          <Navbar />
          <BetaBanner />
          <BrowserRouter>
            <Routes>
              <Route element={<SuspenseLayout />}>
                <Route path='/studyplan/:id' element={<StudyPlan />} />
                <Route path='/' element={<MainPage />} />
                <Route path='*' element={<MainPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </StudyplanProvider>
    </QueryClientProvider>
  );
}
export default App;
