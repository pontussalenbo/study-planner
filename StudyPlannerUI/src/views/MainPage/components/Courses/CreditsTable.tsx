import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyledCell, StyledHeader, StyledTable, StyledTableContainer, TableBody } from '../Table/Table.style';
import { CtxType, MyContext } from 'hooks/CourseContext';
import Tooltip from 'components/Tooltip';
import StyledButtonWithIcon from 'components/Button';
import { GET, POST } from 'utils/fetch';
import { CREDITS_TOTAL_KEY, Endpoints } from 'interfaces/API_Constants.d';
import { ReloadIcon } from 'components/icons';
import { GetStatsBar } from './styles';
import { ColoredTableRow } from '../styles';
import Row from 'components/Flex/Row.style';
import Col from 'components/Flex/Col.style';
import FlexContainer from 'components/Layout';
import styled from 'styled-components';

interface Filters {
  Programme: string;
  Year: string;
}

interface ICreditsTable {
  filters: Filters;
}

interface CourseProps {
  name: string;
  masters: string[];
}

const CourseName = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Pill = styled.div`
  background-color: ${({ theme }) => theme.tertiary};
  color: ${({ theme }) => theme.onTertiary}};
  padding: 4px 8px;
  border-radius: 6px;
  margin-right: 4px;
`;

const Course: React.FC<CourseProps> = ({ name, masters }) => (
  <FlexContainer margin='10px' gap='0.5em'>
    <CourseName>{name}</CourseName>
    {masters.map(master => (
      <Pill key={master}>{master}</Pill>
    ))}
  </FlexContainer>
);

interface CourseData {
  name: string;
  masters: string[];
}

interface CourseContainerProps {
  courses: CourseData[];
}

function toHex(num: number) {
  return Math.round(num * 255).toString(16);
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.tertiary + toHex(0.2)}};
  };
  border-radius: 10px;
  padding: 10px;
`;

const CourseContainer: React.FC<CourseContainerProps> = ({ courses }) => (
  <Container>
    {courses.map(course => (
      <Course key={course.name} name={course.name} masters={course.masters} />
    ))}
  </Container>
);

const mockData = [
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  },
  {
    name: 'Course B',
    masters: ['Master 3']
  },
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  },
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  },
  {
    name: 'Course A',
    masters: ['Master 1', 'Master 2']
  }
  // ... add more courses
];

function CreditsTable({ filters }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<API.Masters[]>([]);

  const [classYear, setClassYear] = useState<string>('');
  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  useEffect(() => {
    const classSelected = filters?.Year?.startsWith('H');
    if (classSelected) {
      setClassYear(filters.Year);
    }
  }, [filters]);

  const { courses } = useContext(MyContext) as CtxType;

  const selectedCourses = useMemo(() => [...courses[4], ...courses[5]], [courses]);

  const getMasters = useCallback(async () => {
    if (!classYear) return;
    const params = {
      programme: filters?.Programme,
      year: classYear
    };
    const data = await GET(Endpoints.masters, new URLSearchParams(params));
    return data;
  }, [classYear, filters]);

  const getMasterStats = useCallback(async () => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    const body = { ...filters, selectedCourses: courseCodes };
    const data = await POST(Endpoints.masterCheck, body);
    return data;
  }, [filters, selectedCourses]);

  const handleUpdate = useCallback(async () => {
    const [masters, stats] = await Promise.all([getMasters(), getMasterStats()]);
    setMasters(masters);
    setStats(stats);
  }, [getMasters, getMasterStats]);

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
    <>
      <GetStatsBar>
        <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
          <StyledButtonWithIcon
            disabled={!enoughCourses}
            onClick={handleUpdate}
            icon={<ReloadIcon fill='white' width='0.8rem' />}
          >
            Check Masters
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
              const masterStat = stats.find(stat => stat.Master === master.master_code) ?? null;
              const totalCredits = masterStat
                ? masterStat.G1Credits + masterStat.G2Credits + masterStat.AdvancedCredits
                : 0;
              if (!totalCredits) {
                return null;
              }
              return (
                <ColoredTableRow
                  fullfilled={masterStat ? masterStat.RequirementsFulfilled : false}
                  key={master.master_code}
                >
                  <StyledCell>{master.master_name_en}</StyledCell>
                  <StyledCell>{masterStat?.G1Credits}</StyledCell>
                  <StyledCell>{masterStat?.G2Credits}</StyledCell>
                  <StyledCell>{masterStat?.AdvancedCredits}</StyledCell>
                  <StyledCell>{totalCredits}</StyledCell>
                </ColoredTableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <Row>
        <Col xs={12}>
          <CourseContainer courses={mockData} />
        </Col>
      </Row>
    </>
  );
}

export default memo(CreditsTable);
