/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

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
      master.masterCode,
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
