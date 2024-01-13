/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

export const breakpoints = {
    /** xs-breakpoint (0px) */
    xs: 0, // Extra small devices (portrait phones)
    /** sm-breakpoint (576px) */
    sm: 576, // Small devices (landscape phones)
    /** md-breakpoint (768px) */
    md: 768, // Medium devices (tablets)
    /** lg-breakpoint (992px) */
    lg: 992, // Large devices (desktops)
    /** xl-breakpoint (1200px) */
    xl: 1200 // Extra large devices (large desktops)
};

export const device = {
    /** xs-breakpoint (0px) */
    xs: `(min-width: ${breakpoints.xs}px)`,
    /** sm-breakpoint (576px) */
    sm: `(min-width: ${breakpoints.sm}px)`,
    /** md-breakpoint (768px) */
    md: `(min-width: ${breakpoints.md}px)`,
    /** lg-breakpoint (992px) */
    lg: `(min-width: ${breakpoints.lg}px)`,
    /** xl-breakpoint (1200px) */
    xl: `(min-width: ${breakpoints.xl}px)`
};

export const COLS = 12;
export const converter = 100;

export const calcColWidth = (size?: number, fallback?: string): string => {
    if (!size) return fallback ?? '100%';
    const width = (size / COLS) * converter;
    return `${width}%`;
};
