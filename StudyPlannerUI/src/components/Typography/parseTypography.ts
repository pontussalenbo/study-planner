import { typography } from 'style/typography';

type TypographyType = keyof typeof typography;
type Size = 'small' | 'medium' | 'large';

export const parseTypographyProps = (t: TypographyType, size: Size) => {
    const { fontFamilyName, fontFamilyStyle, fontWeight, fontSize, lineHeight, letterSpacing } =
        typography[t][size];

    return `
    font-family: ${fontFamilyName}, ${fontFamilyStyle};
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
  `;
};
