/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useEffect, useMemo, useState } from 'react';
import { getMasterStats, MasterStatsBody } from 'api/master';
import { useStudyplanContext } from 'hooks/CourseContext';
import { Filters } from 'interfaces/Types';
import { generateColors } from 'utils/colors';

import { CourseContainer } from 'components/CoursesWithMaster';
import { TwoColumnGrid } from 'components/Layout/style';
import MasterCheck from 'components/MasterCheck';

interface CreditsTableProps {
  masters: API.Master[];
  filters: Filters;
}

function CreditsTable({ masters, filters }: CreditsTableProps) {
  const { courses, customCourses } = useStudyplanContext();

  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  const selectedCourses = useMemo(
    () => [...courses[4], ...courses[5], ...customCourses[4], ...customCourses[5]],
    [courses, customCourses]
  );

  useEffect(() => {
    const signal = new AbortController();

    if (selectedCourses.length > 0) {
      const courseCodes = selectedCourses.map(course => course.courseCode);
      const body: MasterStatsBody = {
        selectedCourses: courseCodes,
        ...filters
      };
      getMasterStats(body, signal).then(setStats);
    }
  }, [selectedCourses]);

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
