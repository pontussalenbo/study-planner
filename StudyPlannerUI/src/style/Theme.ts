// theme.ts
export interface Theme {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    button: string;
    buttonBorder: string;
    buttonHover: string;
    header: string;
    table: string;
    tableBorder: string;
    inputBackground: string;
    inputText: string;
    boxShadow: string;
    selectBackground: string;
    selectText: string;
    alert: string;
    alertBorder: string;
    fulfilled: string;
    notFulfilled: string;
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
    buttonBorder: '#007bff',
    buttonHover: '#5F7ADBCC',
    header: '#1B2223',
    table: '#F4FEFD',
    tableBorder: '#1B2223',
    inputBackground: '#F4FEFD',
    inputText: '#1B2223',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    selectBackground: '#F4FEFD',
    selectText: '#1B2223',
    alert: '#c83232',
    alertBorder: '#bd2130',
    fulfilled: '#008705',
    notFulfilled: '#e49a9a'
};

export interface CustomTheme {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    background: string;
    onBackground: string;
    surface: string;
    onSurface: string;
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    inverseOnSurface: string;
    inverseSurface: string;
    inversePrimary: string;
    shadow: string;
    surfaceTint: string;
    outlineVariant: string;
    scrim: string;
    fulfilled: string;
}

export const pillsColors = [
    '#8B0000',
    '#006c4b',
    '#FFD700',
    '#800080',
    '#a5ccde',
    '#3d6373',
    '#ffb4ab',
    '#FFA500'
];

export const customDarkTheme: CustomTheme = {
    primary: '#0ee1a1',
    onPrimary: '#003825',
    primaryContainer: '#005138',
    onPrimaryContainer: '#4affbb',
    secondary: '#b4ccbd',
    onSecondary: '#1f352a',
    secondaryContainer: '#364b40',
    onSecondaryContainer: '#cfe9d9',
    tertiary: '#a5ccde',
    onTertiary: '#073543',
    tertiaryContainer: '#244c5b',
    onTertiaryContainer: '#c1e9fb',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    background: '#191c1a',
    onBackground: '#e1e3df',
    surface: '#191c1a',
    onSurface: '#e1e3df',
    surfaceVariant: '#404943',
    onSurfaceVariant: '#bfc9c1',
    outline: '#8a938c',
    inverseOnSurface: '#191c1a',
    inverseSurface: '#e1e3df',
    inversePrimary: '#006c4b',
    shadow: '#000000',
    surfaceTint: '#0ee1a1',
    outlineVariant: '#404943',
    scrim: '#000000',
    fulfilled: '#008705'
};

export const customLightTheme: CustomTheme = {
    primary: '#006c4b',
    onPrimary: '#ffffff',
    primaryContainer: '#4affbb',
    onPrimaryContainer: '#002114',
    secondary: '#4d6357',
    onSecondary: '#ffffff',
    secondaryContainer: '#cfe9d9',
    onSecondaryContainer: '#0a1f16',
    tertiary: '#3d6373',
    onTertiary: '#ffffff',
    tertiaryContainer: '#c1e9fb',
    onTertiaryContainer: '#001f29',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    background: '#fbfdf9',
    onBackground: '#191c1a',
    surface: '#fbfdf9',
    onSurface: '#191c1a',
    surfaceVariant: '#dbe5dd',
    onSurfaceVariant: '#404943',
    outline: '#707973',
    inverseOnSurface: '#eff1ed',
    inverseSurface: '#2e312f',
    inversePrimary: '#0ee1a1',
    shadow: '#000000',
    surfaceTint: '#006c4b',
    outlineVariant: '#bfc9c1',
    scrim: '#000000',
    fulfilled: '#008705'
};
