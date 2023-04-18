export const breakpoints = {
    xs: 0, // Extra small devices (portrait phones)
    sm: 576, // Small devices (landscape phones)
    md: 768, // Medium devices (tablets)
    lg: 992, // Large devices (desktops)
    xl: 1200 // Extra large devices (large desktops)
};

export const device = {
    /** xs-breakpoint */
    xs: `(min-width: ${breakpoints.xs})`,
    /** sm-breakpoint */
    sm: `(min-width: ${breakpoints.sm})`,
    /** md-breakpoint */
    md: `(min-width: ${breakpoints.md})`,
    /** lg-breakpoint */
    lg: `(min-width: ${breakpoints.lg})`,
    /** xl-breakpoint */
    xl: `(min-width: ${breakpoints.xl})`
};
