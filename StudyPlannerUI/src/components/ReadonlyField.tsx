/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import {
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend,
  LegendContent
} from './Select/style';

interface ReadonlyFieldProps {
  label: string;
  value: string;
}

export function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <SelectContainer isOpen={false} disabled>
      <SelectLabel isOpen={false}>{value}</SelectLabel>
      <StyledFieldset isOpen={false}>
        <StyledLegend hasValue>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
}
