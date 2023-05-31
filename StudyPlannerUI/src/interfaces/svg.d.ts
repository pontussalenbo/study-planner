declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

    const content: {
        MyIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    };

    export default content;
}
