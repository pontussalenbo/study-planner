import GlobalStyles from 'style/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { customTheme } from 'style/Theme';
import MainPage from 'views/MainPage';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyles />
      <MainPage />
    </ThemeProvider>
  );
}
export default App;
