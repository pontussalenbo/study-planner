import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CtxType, MyContext } from 'hooks/CourseContext';
import Tooltip from 'components/Tooltip';
import StyledButtonWithIcon from 'components/Button';
import { GET, POST } from 'utils/fetch';
import { CREDITS_TOTAL_KEY, Endpoints, MASTERS_SUMMARY_NAME } from 'interfaces/API_Constants.d';
import { ReloadIcon } from 'components/icons';
import { GetStatsBar } from './styles';
import styled from 'styled-components';
import { ListContainer, NameCell, TableCell } from './InfiniteScroll.style';
import { TableRow } from './InfiniteScroll.style';
import { generateColors } from 'utils/rgbConverter';

interface Filters {
  Programme: string;
  Year: string;
}

interface ICreditsTable {
  filters: Filters;
}

// TODO: Move all styled components to separate files

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

const PillBox = styled.div`
  display: flex;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
  flex: 1 0 70%;
  align-self: center;
`;

const PillContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 0 30%; // This makes the pills take up at most 50% width
`;

interface CourseProps {
  name: string;
  code: string;
  masters: string[];
  colors: Map<string, string>;
}

const Course: React.FC<CourseProps> = ({ name, code, masters, colors }) => {
  return (
    <PillBox>
      <TextContainer>
        <p>{name}</p>
        <p>({code})</p>
      </TextContainer>
      <PillContainer>
        {masters.map((master, idx) => (
          <Pill key={idx} color={colors.get(master)}>
            {master.slice(0, 3)}
          </Pill>
        ))}
      </PillContainer>
    </PillBox>
  );
};
interface CourseContainerProps {
  courses: CourseData.SelectedCourse[];
  masters: API.MasterStatus[];
  colorMap: Map<string, string>;
}

// TODO: Move to utils
function toHex(num: number) {
  return Math.round(num * 255).toString(16);
}

const CourseContainer: React.FC<CourseContainerProps> = ({ courses, masters, colorMap }) => {
  const getCourseMasters = (course: CourseData.SelectedCourse) => {
    return masters
      .filter(
        master =>
          master.SelectedCourses.includes(course.course_code) && master.Master !== MASTERS_SUMMARY_NAME
      )
      .map(master => master.Master);
  };

  return (
    <>
      {Object.values(courses)
        .flat()
        .map(course => (
          <Course
            key={course.course_code}
            name={course.course_name}
            code={course.course_code}
            masters={getCourseMasters(course)}
            colors={colorMap}
          />
        ))}
    </>
  );
};

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

const FilledTableRow = styled(TableRow)<{ fulfilled: boolean }>`
  background-color: ${({ theme, fulfilled }) => (fulfilled ? theme.fulfilled : 'transparent')};
`;

const TwoColumnWrapper = styled.div`
  background-color: ${({ theme }) => theme.tertiary + toHex(0.2)}};
  border-radius: 10px;
  padding: 10px 20px;
  display: grid;
  grid-template-rows: repeat(7, auto); /* 7 items per column */
  grid-auto-columns: 1fr; /* Makes each new column take up the full width */
  grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
  grid-gap: 10px 5px; /* Gap between items */
`;

const BoldCell = styled(TableCell)`
  font-weight: bold;
`;

const BoldNameCell = styled(NameCell)`
  font-weight: bold;
`;

function CreditsTable({ filters }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<API.Masters[]>([]);

  const [classYear, setClassYear] = useState<string>('');
  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const getMasters = async () => {
    if (!classYear) return [];
    const params = {
      programme: filters?.Programme,
      year: classYear
    };
    const data = await GET<API.Masters[]>(Endpoints.masters, new URLSearchParams(params));
    return data;
  };

  useEffect(() => {
    const classSelected = filters.Year?.startsWith('H');
    if (classSelected) {
      setClassYear(filters.Year);
    }
  }, [filters]);

  useEffect(() => {
    getMasters().then(data => {
      setMasters(data);
    });
  }, [classYear]);

  useEffect(() => {
    if (buttonRef.current) {
      const height = buttonRef.current.offsetHeight;
      console.log('Button height:', height);
    }
  }, [buttonRef]);

  const colorMap = useMemo(() => {
    const colors = generateColors(masters.length);
    const colorMap: [string, string][] = masters.map((master, idx) => [master.master_code, colors[idx]]);
    return new Map(colorMap);
  }, [masters]);

  const { courses } = useContext(MyContext) as CtxType;

  const selectedCourses = useMemo(() => [...courses[4], ...courses[5]], [courses]);

  const getMasterStats = useCallback(async () => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    const body = {
      ...filters,
      selectedCourses: courseCodes
    };

    const data = await POST<API.MasterStatus[]>(Endpoints.masterCheck, body);
    return data;
  }, [filters, selectedCourses]);

  const handleUpdate = useCallback(async () => {
    const stats = await getMasterStats();
    setStats(stats);
  }, [getMasters, getMasterStats]);

  const sortMasters = (masters: API.Masters[]) => {
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

  const sortedMasters = useMemo(() => sortMasters(masters), [masters]);
  const enoughCourses = useMemo(() => selectedCourses.length >= 4, [courses]);
  const summary = useMemo(() => stats.find(master => master.Master === MASTERS_SUMMARY_NAME), [stats]);

  return (
    <>
      <GetStatsBar buttonHeight={buttonRef.current?.offsetHeight}>
        <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
          <StyledButtonWithIcon
            rref={buttonRef}
            disabled={!enoughCourses}
            onClick={handleUpdate}
            icon={<ReloadIcon fill='white' width='0.8rem' />}
          >
            Check Masters
          </StyledButtonWithIcon>
        </Tooltip>
      </GetStatsBar>
      <ListContainer>
        <Header />
        {sortedMasters.map(master => {
          const masterStat = stats.find(stat => stat.Master === master.master_code);

          if (masterStat) {
            const fulfilled = masterStat.RequirementsFulfilled;
            const totalCredits = masterStat.G1Credits + masterStat.G2Credits + masterStat.AdvancedCredits;
            if (totalCredits === 0) return null;
            return (
              <FilledTableRow fulfilled={fulfilled} key={master.master_code}>
                <NameCell>{master.master_name_en}</NameCell>
                <TableCell>
                  <Pill key={master.master_code} color={colorMap.get(master.master_code)}>
                    {master.master_code.slice(0, 3)}
                  </Pill>
                </TableCell>
                <TableCell>{masterStat?.G1Credits}</TableCell>
                <TableCell>{masterStat?.G2Credits}</TableCell>
                <TableCell>{masterStat?.AdvancedCredits}</TableCell>
                <TableCell>{totalCredits}</TableCell>
              </FilledTableRow>
            );
          }
        })}
        {summary && (
          <FilledTableRow fulfilled={false} key={summary.Master}>
            <BoldNameCell>{summary.Master}</BoldNameCell>
            <TableCell />
            <BoldCell>{summary.G1Credits}</BoldCell>
            <BoldCell>{summary?.G2Credits}</BoldCell>
            <BoldCell>{summary?.AdvancedCredits}</BoldCell>
            <BoldCell>{summary.AdvancedCredits}</BoldCell>
          </FilledTableRow>
        )}
      </ListContainer>
      <ListContainer></ListContainer>
      <TwoColumnWrapper>
        <CourseContainer courses={selectedCourses} masters={stats} colorMap={colorMap} />
      </TwoColumnWrapper>
    </>
  );
}

export default memo(CreditsTable);
