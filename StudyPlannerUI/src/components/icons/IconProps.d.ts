/**
 * Interface for SVG IconProps
 */
export default interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    color?: string;
    size?: string | number;
}
