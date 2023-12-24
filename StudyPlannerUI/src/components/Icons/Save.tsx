/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/* eslint-disable max-len */
import IconProps from './IconProps';

const SaveIcon = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fillRule='evenodd'
    clipRule='evenodd'
    imageRendering='optimizeQuality'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    viewBox='0 0 512 511.52'
    width={props.size}
    height={props.size}
    fill={props.color}
    {...props}
  >
    <path
      fill='currentColor'
      stroke='currentColor'
      fillRule='nonzero'
      d='M36.75 0h438.5C495.55 0 512 16.82 512 37.03v437.46c0 20.19-16.47 37.03-36.75 37.03H98.28c-2.89 0-5.5-1.17-7.39-3.06L3.06 420.62A10.387 10.387 0 0 1 0 413.24V37.03C0 16.81 16.45 0 36.75 0zM174.5 447.79c-13.75 0-13.75-20.9 0-20.9h153.97c13.74 0 13.74 20.9 0 20.9H174.5zm0-64.38c-13.75 0-13.75-20.9 0-20.9h153.97c13.74 0 13.74 20.9 0 20.9H174.5zm209.51 106.91V350.25c0-16.78-13.87-30.64-30.65-30.64H149.6c-16.78 0-30.64 13.86-30.64 30.64v140.07h265.05zm20.89-140.07v140.37h70.35c8.85 0 15.85-7.37 15.85-16.13V37.03c0-8.78-6.99-16.13-15.85-16.13H404.9v170.17c0 28.31-23.23 51.55-51.54 51.55H149.6c-28.34 0-51.54-23.21-51.54-51.55V20.9H36.75c-8.87 0-15.85 7.34-15.85 16.13v371.88l77.16 77.16V350.25c0-28.32 23.22-51.54 51.54-51.54h203.76c28.22 0 51.54 23.32 51.54 51.54zm-20.89-159.18V20.9H118.96v170.17c0 16.8 13.85 30.65 30.64 30.65h203.76c16.77 0 30.65-13.88 30.65-30.65z'
    />
  </svg>
);
export default SaveIcon;
