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
