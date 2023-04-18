// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        text: string;
        background: string;
        toggleBorder: string;
        body: string;
        tableOddRow: string;
    }
}
