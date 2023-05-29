import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from '../Table/Table.style';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { CtxType, MyContext } from 'hooks/CourseContext';
import { GetStatsBar, StatsWrapper } from './styles';
import Tooltip from 'components/Tooltip';
import StyledButtonWithIcon from 'components/Button';
import { GET, POST } from 'utils/fetch';
import { CREDITS_TOTAL_KEY, Endpoints } from 'interfaces/API_Constants.d';

interface Filters {
  Programme: string;
  Year: string;
}

interface ICreditsTable {
  filters: Filters;
}

function CreditsTable({ filters }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<API.Masters[]>([]);

  const [classYear, setClassYear] = useState<string>('');
  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  useEffect(() => {
    const classSelected = filters.Year.startsWith('H');
    if (classSelected) {
      setClassYear(filters.Year);
    }
  }, [filters]);

  const { courses } = useContext(MyContext) as CtxType;

  const selectedCourses = useMemo(() => [...courses[4], ...courses[5]], [courses]);

  const getMasters = async () => {
    const params = {
      programme: filters.Programme,
      year: classYear
    };
    const data = await GET(Endpoints.masters, new URLSearchParams(params));
    setMasters(data);
  };

  const getMasterStats = async () => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    const body = { ...filters, selectedCourses: courseCodes };
    POST(Endpoints.masterCheck, body).then(data => setStats(data));
  };

  const handleUpdate = () => {
    getMasters().then(() => getMasterStats());
  };

  const sortMasters = (masters: API.Masters[]) => {
    const sortedMasters = [...masters];

    sortedMasters.sort((a, b) => {
      if (a.master_name_en === CREDITS_TOTAL_KEY) {
        return 1; // "General" should be placed at the end
      } else if (b.master_name_en === CREDITS_TOTAL_KEY) {
        return -1; // "General" should be placed at the end
      } else {
        return a.master_name_en.localeCompare(b.master_name_en); // Sort alphabetically
      }
    });

    return sortedMasters;
  };

  const sortedMasters = useMemo(() => sortMasters(masters), [masters]);

  const enoughCourses = useMemo(() => selectedCourses.length >= 4, [courses]);

  return (
    <StatsWrapper>
      <GetStatsBar>
        <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
          <StyledButtonWithIcon disabled={!enoughCourses} onClick={handleUpdate}>
            Get stats
          </StyledButtonWithIcon>
        </Tooltip>
      </GetStatsBar>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledHeader>Specialisation</StyledHeader>
              <StyledHeader>G1</StyledHeader>
              <StyledHeader>G2</StyledHeader>
              <StyledHeader>A</StyledHeader>
              <StyledHeader>Total</StyledHeader>
            </tr>
          </thead>
          <TableBody>
            {sortedMasters.map(master => {
              const masterStat =
                stats.find(stat => stat.Master === master.master_code) ?? null;
              const totalCredits = masterStat
                ? masterStat.G1Credits + masterStat.G2Credits + masterStat.AdvancedCredits
                : 0;
              if (!totalCredits) {
                return null;
              }
              return (
                <tr key={master.master_code}>
                  <StyledCell>{master.master_name_en}</StyledCell>
                  <StyledCell>{masterStat?.G1Credits}</StyledCell>
                  <StyledCell>{masterStat?.G2Credits}</StyledCell>
                  <StyledCell>{masterStat?.AdvancedCredits}</StyledCell>
                  <StyledCell>{totalCredits}</StyledCell>
                </tr>
              );
            })}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StatsWrapper>
  );
}

export default memo(CreditsTable);
