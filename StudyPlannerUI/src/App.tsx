import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from 'style/GlobalStyles';
import { customDarkTheme } from 'style/Theme';
import MainPage from 'views/MainPage';
import Navbar from 'components/Navbar';
import StudyPlan from 'views/StudyPlan';
import StudyplanProvider from 'hooks/CourseContext';
import ScrollArrow from 'components/ScrollArrow';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customDarkTheme}>
      <GlobalStyles />
      <Navbar />
      <StudyplanProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/studyplan/:id' element={<StudyPlan />} />
            <Route path='/' element={<MainPage />} />
            <Route path='*' element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </StudyplanProvider>
      <ScrollArrow />
    </ThemeProvider>
  );
}
export default App;
