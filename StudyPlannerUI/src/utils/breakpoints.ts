export const sizes = {
    mobileS: '320px',
    mobileL: '600px',
    tablet: '900px',
    laptop: '1200px',
    desktop: '1536px'
};

export const device = {
    /** xs-breakpoint */
    mobileS: `(min-width: ${sizes.mobileS})`,
    /** sm-breakpoint */
    mobileL: `(min-width: ${sizes.mobileL})`,
    /** md-breakpoint */
    tablet: `(min-width: ${sizes.tablet})`,
    /** lg-breakpoint */
    laptop: `(min-width: ${sizes.laptop})`,
    /** xl-breakpoint */
    desktop: `(min-width: ${sizes.desktop})`
};
