import { StyledButton } from 'components/Button';
import {
  StyledCell,
  StyledHeader,
  StyledTable,
  StyledTableContainer,
  TableBody
} from './Table.style';
import { BASE_URL } from 'utils/URL';
import { useEffect, useState } from 'react';

const MOCK = [
  {
    code: 'mai',
    name: 'maskinintelligens',
    G1: 15,
    G2: 15,
    A: 15
  },
  {
    code: 'pv',
    name: 'programvara',
    G1: 15,
    G2: 15,
    A: 15
  }
];

interface ICreditsTable {
  courses: CourseData.SelectedCourse[];
  filters: {
    Programme: string;
    Year: string;
  };
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

function CreditsTable({ courses, filters }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<IMaster[]>([]);
  const [stats, setStats] = useState<MasterResp[]>([]);

  useEffect(() => {
    if (!filters.Programme) return;

    fetch(BASE_URL + '/general/masters' + '?programme=' + filters.Programme)
      .then(resp => resp.json())
      .then(data => setMasters(data));
  }, [filters.Programme]);

  const handleUpdate = () => {
    const selectedCourses = courses.map(course => course.course_code);
    fetch(BASE_URL + '/masters', {
      body: JSON.stringify({ ...filters, selectedCourses }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(resp => resp.json().then(data => setStats(data)));
  };

  return (
    <>
      <StyledButton
        style={{ marginBottom: '5px' }}
        disabled={courses.length < 4}
        onClick={handleUpdate}
      >
        Get stats
      </StyledButton>
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
            {masters.map(master => {
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
    </>
  );
}

export default CreditsTable;
