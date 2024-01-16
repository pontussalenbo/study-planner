/**
 * This file is used to define event types for the application.
 * This is done to avoid extensive use of the 'any' type and long type definitions.
 */
import type React from 'react';

declare module 'react' {
    export type ChangeEvent<T extends HTMLElement> = React.ChangeEvent<T>;
}
