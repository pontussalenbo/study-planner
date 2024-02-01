/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useMemo } from 'react';
import { CREDITS_TOTAL_KEY, MASTERS_SUMMARY_NAME } from 'api/constants';
import styled from 'styled-components';

import {
  BoldCell,
  BoldNameCell,
  FilledTableRow,
  NameCell,
  TableCell,
  TableRow
} from 'components/Table/style';

import { ListContainer } from '../views/MainPage/components/Courses/style';
// TODO: remove?
const Pill = styled.div<{ color?: string }>`
  background-color: ${({ theme, color }) => color || theme.tertiary};
  color: ${({ theme }) => theme.onTertiary}};
  height: 24px;
  max-width: 60px;
  border-radius: 8px 8px 8px 8px;
  padding: 5px 12px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.85em;
  font-weight: 500;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface MasterCheckProps {
  masters: API.Master[];
  stats: API.MasterStatus[];
  colorMap: Map<string, string>;
}

const MasterCheck: React.FC<MasterCheckProps> = ({ masters, stats, colorMap }) => {
  const totalCredits = (summary: API.MasterStatus) => {
    return summary.g1Credits + summary.g2Credits + summary.advancedCredits;
  };

  /** Because Andreas can't answer with summary capitalized ;) */
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /**
   * Sort masters alphabetically, but put "General" at the end
   * @param masters masters to sort
   * @returns sorted list of masters
   */
  const sortMasters = (masters: API.Master[]) => {
    const sortedMasters = [...masters];

    sortedMasters.sort((a, b) => {
      // "General" should be placed at the end
      if (a.masterName_en === CREDITS_TOTAL_KEY) {
        return 1;
      }
      if (b.masterName_en === CREDITS_TOTAL_KEY) {
        return -1;
      }
      // Sort alphabetically
      return a.masterName_en.localeCompare(b.masterName_en);
    });

    return sortedMasters;
  };

  /** Cache the sorted masters, so that we dont sort them on each re-render */
  const sortedMasters = useMemo(() => sortMasters(masters), [masters]);

  const summary = stats.find(master => master.master === MASTERS_SUMMARY_NAME);
  return (
    <>
      <ListContainer>
        <TableRow header>
          <NameCell>Specialisation</NameCell>
          <TableCell>Code</TableCell>
          <TableCell>G1</TableCell>
          <TableCell>G2</TableCell>
          <TableCell>A</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
        {sortedMasters.map(master => {
          const masterStat = stats.find(stat => stat.master === master.masterCode);

          if (!masterStat) {
            return null;
          }

          const fulfilled = masterStat.requirementsFulfilled;
          const total = totalCredits(masterStat);
          const color = colorMap.get(master.masterCode);

          if (total > 0) {
            return (
              <FilledTableRow fulfilled={fulfilled} key={master.masterCode}>
                <NameCell>{master.masterName_en}</NameCell>
                <TableCell>
                  {master.masterCode !== CREDITS_TOTAL_KEY.toLowerCase() && (
                    <Pill key={master.masterCode} color={color}>
                      {master.masterCode.slice(0, 3)}
                    </Pill>
                  )}
                </TableCell>
                <TableCell>{masterStat.g1Credits}</TableCell>
                <TableCell>{masterStat.g2Credits}</TableCell>
                <TableCell>{masterStat.advancedCredits}</TableCell>
                <TableCell>{total}</TableCell>
              </FilledTableRow>
            );
          }
        })}
        {summary && (
          <TableRow key={summary.master}>
            <BoldNameCell>{capitalizeFirstLetter(summary.master)}</BoldNameCell>
            <TableCell />
            <BoldCell>{summary.g1Credits}</BoldCell>
            <BoldCell>{summary.g2Credits}</BoldCell>
            <BoldCell>{summary.advancedCredits}</BoldCell>
            <BoldCell>{totalCredits(summary)}</BoldCell>
          </TableRow>
        )}
      </ListContainer>
    </>
  );
};

export default MasterCheck;
