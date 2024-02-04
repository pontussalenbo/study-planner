/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */
import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudyplanProvider from 'hooks/CourseContext';
import ToastProvider from 'hooks/useToast';
import GlobalStyles from 'style/GlobalStyles';
import { customDarkTheme } from 'style/Theme';
import { ThemeProvider } from 'styled-components';

// import MainPage from 'views/MainPage';
// import StudyPlan from 'views/StudyPlan';
import Navbar from 'components/Navbar';

const MainPage = React.lazy(() => import('views/MainPage'));
const StudyPlan = React.lazy(() => import('views/StudyPlan'));

const SuspenseLayout = () => (
  <React.Suspense fallback={<div>LOADING...</div>}>
    <Outlet />
  </React.Suspense>
);

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customDarkTheme}>
      <GlobalStyles />
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <StudyplanProvider>
          <ToastProvider>
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
    </ThemeProvider>
  );
}
export default App;
