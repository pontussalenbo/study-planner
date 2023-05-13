import GlobalStyles from 'style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { customTheme } from 'style/Theme';
import MainPage from 'views/MainPage';
import SelectedCoursesProvider from 'hooks/CourseContext';

function App(): JSX.Element {
  return (
    <SelectedCoursesProvider>
      <ThemeProvider theme={customTheme}>
        <GlobalStyles />
        <MainPage />
      </ThemeProvider>
    </SelectedCoursesProvider>
  );
}
export default App;
