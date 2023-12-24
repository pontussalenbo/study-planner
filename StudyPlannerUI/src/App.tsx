/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from 'style/GlobalStyles';
import { customDarkTheme } from 'style/Theme';
import MainPage from 'views/MainPage';
import Navbar from 'components/Navbar';
import StudyPlan from 'views/StudyPlan';
import StudyplanProvider from 'hooks/CourseContext';
import ScrollArrow from 'components/ScrollArrow';
import ToastProvider from 'hooks/useToast';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customDarkTheme}>
      <GlobalStyles />
      <Navbar />
      <StudyplanProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/studyplan/:id' element={<StudyPlan />} />
              <Route path='/' element={<MainPage />} />
              <Route path='*' element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </StudyplanProvider>
      <ScrollArrow />
    </ThemeProvider>
  );
}
export default App;
