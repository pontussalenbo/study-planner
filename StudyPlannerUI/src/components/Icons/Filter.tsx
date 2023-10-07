/* eslint-disable max-len */
const FilterIcon = ({ width = 24, height = 24, fill = 'black' }) => (
  <svg
    width={width}
    height={height}
    xmlns='http://www.w3.org/2000/svg'
    fillRule='evenodd'
    clipRule='evenodd'
  >
    <path
      fill={fill}
      d='M22,2L22,4L14,4L14,2L22,2M10,9L2,9L2,7L10,7L10,9M18,16L10,16L10,14L18,14L18,16M6,23L14,23L14,21L6,21L6,23Z'
    />
  </svg>
);

export default FilterIcon;
