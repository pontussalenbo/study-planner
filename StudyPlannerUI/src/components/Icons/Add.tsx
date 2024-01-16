/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  size?: string;
  strokeWidth?: number;
}

const AddIcon = (props: SVGProps) => (
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
export default AddIcon;
