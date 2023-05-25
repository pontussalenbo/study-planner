interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: string;
  strokeWidth?: number;
}

const SvgComponent = (props: SVGProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon'
    viewBox='0 0 512 512'
    width={'0.8em'}
    height={'0.8em'}
    {...props}
  >
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={50}
      d='M256 112v288m144-144H112'
    />
  </svg>
);
export default SvgComponent;
