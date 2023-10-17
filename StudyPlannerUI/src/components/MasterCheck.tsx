import { useMemo } from 'react';
import styled from 'styled-components';
import { ListContainer } from '../views/MainPage/components/Courses/InfiniteScroll.style';
import { CREDITS_TOTAL_KEY, MASTERS_SUMMARY_NAME } from 'api/constants';
import {
  TableRow,
  NameCell,
  TableCell,
  FilledTableRow,
  BoldNameCell,
  BoldCell
} from 'components/Table/style';

const Header: React.FC = () => {
  return (
    <TableRow header>
      <NameCell>Specialisation</NameCell>
      <TableCell>Code</TableCell>
      <TableCell>G1</TableCell>
      <TableCell>G2</TableCell>
      <TableCell>A</TableCell>
      <TableCell>Total</TableCell>
    </TableRow>
  );
};

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
    return summary.G1Credits + summary.G2Credits + summary.AdvancedCredits;
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
      if (a.master_name_en === CREDITS_TOTAL_KEY) {
        return 1;
      }
      if (b.master_name_en === CREDITS_TOTAL_KEY) {
        return -1;
      }
      // Sort alphabetically
      return a.master_name_en.localeCompare(b.master_name_en);
    });

    return sortedMasters;
  };

  /** Cache the sorted masters, so that we dont sort them on each re-render */
  const sortedMasters = useMemo(() => sortMasters(masters), [masters]);

  const summary = stats.find(master => master.Master === MASTERS_SUMMARY_NAME);
  return (
    <>
      <ListContainer>
        <Header />
        {sortedMasters.map(master => {
          const masterStat = stats.find(stat => stat.Master === master.master_code);

          if (!masterStat) {
            return null;
          }

          const fulfilled = masterStat.RequirementsFulfilled;
          const total = totalCredits(masterStat);
          const color = colorMap.get(master.master_code);

          if (total > 0) {
            return (
              <FilledTableRow fulfilled={fulfilled} key={master.master_code}>
                <NameCell>{master.master_name_en}</NameCell>
                <TableCell>
                  {master.master_code !== CREDITS_TOTAL_KEY.toLowerCase() && (
                    <Pill key={master.master_code} color={color}>
                      {master.master_code.slice(0, 3)}
                    </Pill>
                  )}
                </TableCell>
                <TableCell>{masterStat.G1Credits}</TableCell>
                <TableCell>{masterStat.G2Credits}</TableCell>
                <TableCell>{masterStat.AdvancedCredits}</TableCell>
                <TableCell>{total}</TableCell>
              </FilledTableRow>
            );
          }
        })}
        {summary && (
          <TableRow key={summary.Master}>
            <BoldNameCell>{capitalizeFirstLetter(summary.Master)}</BoldNameCell>
            <TableCell />
            <BoldCell>{summary.G1Credits}</BoldCell>
            <BoldCell>{summary.G2Credits}</BoldCell>
            <BoldCell>{summary.AdvancedCredits}</BoldCell>
            <BoldCell>{totalCredits(summary)}</BoldCell>
          </TableRow>
        )}
      </ListContainer>
    </>
  );
};

export default MasterCheck;
