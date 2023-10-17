import { useMemo } from 'react';
import { generateColors } from 'utils/colors';
import MasterCheck from 'components/MasterCheck';
import { CourseContainer } from 'components/CoursesWithMaster';
import { useStudyplanContext } from 'hooks/CourseContext';
import { TwoColumnGrid } from 'components/Layout/Grid';

interface CreditsTableProps {
  masters: API.Master[];
  stats: API.MasterStatus[];
}

function CreditsTable({ masters, stats }: CreditsTableProps) {
  const { courses, customCourses } = useStudyplanContext();
  const selectedCourses = [...courses[4], ...courses[5], ...customCourses[4], ...customCourses[5]];

  /**
   * Generate a color for each master and memoize it
   * since it does not need to be recomputed.
   */
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
      <TwoColumnGrid>
        <CourseContainer courses={selectedCourses} masters={stats} colorMap={colorMap} />
      </TwoColumnGrid>
    </>
  );
}

export default CreditsTable;
