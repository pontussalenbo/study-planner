export const COLS = 12;
export const converter = 100;

const calcColWidth = (size?: number, fallback?: string): string => {
    if (!size) return fallback ?? '100%';
    const width = (size / COLS) * converter;
    return `${width}%`;
};

export default calcColWidth;
