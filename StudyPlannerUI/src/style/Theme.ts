// theme.ts
export interface Theme {
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

export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#6B8096',
    background: '#363537',
    tableOddRow: '#EEE'
};
export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
    tableOddRow: '#262626'
};

export const customTheme: Theme = {
    primary: '#26292B',
    secondary: '#2E3239',
    accent: '#0EF6CC',
    text: '#F4FEFD',
    button: '#5F7ADB',
    buttonHover: '#5F7ADBCC',
    header: '#1B2223',
    table: '#F4FEFD',
    tableBorder: '#1B2223',
    inputBackground: '#F4FEFD',
    inputText: '#1B2223',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    selectBackground: '#F4FEFD',
    selectText: '#1B2223'
};
