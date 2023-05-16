import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from '../Table/Table.style';
import { BASE_URL } from 'utils/URL';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { CtxType, MyContext } from 'hooks/CourseContext';
import { GetStatsBar, StatsButton, StatsWrapper } from './styles';
import Tooltip from 'components/Tooltip';
import { Select } from 'components/Select';
import { StyledButton } from 'components/Button';

interface Filters {
  Programme: string;
  Year: string;
}

interface IMaster {
  master_code: string;
  master_name_en: string;
  master_name_sv: string;
}

interface MasterResp {
  Master: string;
  AdvancedCredits: number;
  G1Credits: number;
  G2Credits: number;
  RequirementsFulfilled: boolean;
}

interface ICreditsTable {
  filters: Filters;
}

function CreditsTable({ filters }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<IMaster[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  const [clazz, setClazz] = useState<string>('');
  const [stats, setStats] = useState<MasterResp[]>([]);

  useEffect(() => {
    fetch(BASE_URL + '/general/class_years')
      .then(resp => resp.json())
      .then(data => setClasses(data));
  }, []);

  useEffect(() => {
    if (filters.Year.startsWith('H')) {
      setClazz(filters.Year);
    }
  }, [filters]);

  const { courses } = useContext(MyContext) as CtxType;

  const selectedCourses = useMemo(() => [...courses[4], ...courses[5]], [courses]);

  const getMasters = async () => {
    const query = '?programme=' + filters.Programme + '&year=' + clazz;
    fetch(BASE_URL + '/general/masters' + query)
      .then(resp => resp.json())
      .then(data => setMasters(data));
  };

  const getMasterStats = async () => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    fetch(BASE_URL + '/masters', {
      body: JSON.stringify({ ...filters, selectedCourses: courseCodes }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(resp => resp.json().then(data => setStats(data)));
  };

  const handleUpdate = () => {
    getMasters().then(() => getMasterStats());
  };

  const sortMasters = (masters: IMaster[]): IMaster[] => {
    const sortedMasters = [...masters];

    sortedMasters.sort((a, b) => {
      if (a.master_name_en === 'General') {
        return 1; // "General" should be placed at the end
      } else if (b.master_name_en === 'General') {
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
          <StyledButton disabled={!enoughCourses || !clazz} onClick={handleUpdate}>
            Get stats
          </StyledButton>
        </Tooltip>
        <Select value={clazz} onChange={e => setClazz(e.target.value)} label='Class'>
          <option value='' disabled>
            Select
          </option>

          {classes.map(classYear => (
            <option key={classYear} value={classYear}>
              {classYear}
            </option>
          ))}
        </Select>
      </GetStatsBar>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledHeader>Specialization</StyledHeader>
              <StyledHeader>G1</StyledHeader>
              <StyledHeader>G2</StyledHeader>
              <StyledHeader>A</StyledHeader>
              <StyledHeader>Total</StyledHeader>
            </tr>
          </thead>
          <TableBody>
            {sortedMasters.map(master => {
              const x = stats.find(stat => stat.Master === master.master_code) ?? null;
              const totalCredits = x ? x.G1Credits + x.G2Credits + x.AdvancedCredits : 0;
              if (!totalCredits) {
                return null;
              }
              return (
                <tr key={master.master_code}>
                  <StyledCell>{master.master_name_en}</StyledCell>
                  <StyledCell>{x?.G1Credits}</StyledCell>
                  <StyledCell>{x?.G2Credits}</StyledCell>
                  <StyledCell>{x?.AdvancedCredits}</StyledCell>
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
