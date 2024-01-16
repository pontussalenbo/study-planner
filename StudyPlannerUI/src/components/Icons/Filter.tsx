/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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
