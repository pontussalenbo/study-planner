import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GET } from 'utils/fetch';
import { Endpoints } from 'interfaces/API_Constants.d';
import { floatToHex, generateColors } from 'utils/colors';
import MasterCheck from 'components/MasterCheck';
import { CourseContainer } from 'components/CoursesWithMaster';
import { useStudyplanContext } from 'hooks/CourseContext';

interface Filters {
  Programme: string;
  Year: string;
}

interface ICreditsTable {
  filters: Filters;
  stats: API.MasterStatus[];
}

const TwoColumnWrapper = styled.div`
  background-color: ${({ theme }) => theme.tertiary + floatToHex(0.2)}};
  border-radius: 10px;
  padding: 10px 20px;
  display: grid;
  grid-template-rows: repeat(7, auto); /* 7 items per column */
  grid-auto-columns: 1fr; /* Makes each new column take up the full width */
  grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
  grid-gap: 10px 5px; /* Gap between items */
`;

function CreditsTable({ filters, stats }: ICreditsTable): JSX.Element {
  const [masters, setMasters] = useState<API.Master[]>([]);
  const [classYear, setClassYear] = useState<string>('');

  const { courses } = useStudyplanContext();
  const selectedCourses = [...courses[4], ...courses[5]];

  useEffect(() => {
    const classSelected = filters.Year?.startsWith('H');
    if (classSelected) {
      setClassYear(filters.Year);
    }
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();
    const getMasters = async () => {
      const params = {
        programme: filters?.Programme,
        year: classYear
      };
      const data = await GET<API.Master[]>(
        Endpoints.masters,
        new URLSearchParams(params),
        controller
      );
      return data;
    };

    if (classYear) {
      getMasters().then(data => {
        setMasters(data);
      });
    }
    return () => controller.abort();
  }, [classYear]);

  const colorMap = useMemo(() => {
    const colors = generateColors(masters.length);
    const colorMap: [string, string][] = masters.map((master, idx) => [
      master.master_code,
      colors[idx]
    ]);
    return new Map(colorMap);
  }, [masters]);

  return (
    <>
      <MasterCheck masters={masters} stats={stats} colorMap={colorMap} />
      <TwoColumnWrapper>
        <CourseContainer courses={selectedCourses} masters={stats} colorMap={colorMap} />
      </TwoColumnWrapper>
    </>
  );
}

export default CreditsTable;
