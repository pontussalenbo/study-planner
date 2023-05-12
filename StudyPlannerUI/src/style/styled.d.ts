// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    button: string;
    buttonHover: string;
    header: string;
    table: string;
    tableBorder: string;
    inputBackground: string;
    inputText: string;
    boxShadow: string;
    selectBackground: string;
    selectText: string;
  }
}
