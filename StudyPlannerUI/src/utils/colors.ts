function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex: string) {
    const noColor = ['0', '0', '0'];
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || noColor;
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}

export function generateColors(n: number): string[] {
    const colors: string[] = [];
    const distance = 360 / n;

    for (let i = 0; i < n; i++) {
        const hue = Math.round(i * distance) % 360;
        let saturation = 60;
        let lightness = 75; // Default lightness set to 75%

        // Adjustments for common color blindness issues
        if ((hue >= 0 && hue <= 30) || (hue >= 330 && hue <= 360)) {
            // Red hues
            saturation = 45;
            lightness = 85; // Red hues tend to be brighter, so we'll set them at the higher end
        } else if (hue >= 60 && hue <= 180) {
            // Green hues
            saturation = 45;
            lightness = 80; // Green hues adjusted to mid-high range
        } else if (hue >= 180 && hue <= 300) {
            // Blue hues
            saturation = 70;
            lightness = 75; // Blue hues kept at default
        }

        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
}

export function floatToHex(num: number) {
    return Math.round(num * 255).toString(16);
}
