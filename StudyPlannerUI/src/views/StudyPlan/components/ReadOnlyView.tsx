/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useEffect, useMemo, useState } from 'react';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import IconButton from 'components/Button/Button';
import ReloadIcon from 'components/Icons/Reload';
import Tooltip from 'components/Tooltip';
import type { Filters } from 'interfaces/Types';
import { Heading2 } from 'components/Typography/Heading2';
import { FilterContainer, GetStatsBar } from 'components/Temp/styles';
import SelectedCoursesTable from 'components/SelectedCourses/SelectedCourses';
import { generateColors } from 'utils/colors';
import MasterCheck from 'components/MasterCheck';
import { CourseContainer } from 'components/CoursesWithMaster';
import StickyButton from 'components/Button/StickyButton';
import SavePlanModal from 'components/Modal/SavePlanModal';
import { useStudyplanContext } from 'hooks/CourseContext';
import { TwoColumnWrapper } from './style';
import { ReadonlyField } from 'components/ReadonlyField';
import { getMasterStats, getMasters } from 'api/master';

interface CoursesProps {
  filters: Filters;
}

const ReadOnlyView: React.FC<CoursesProps> = ({ filters }) => {
  const [masters, setMasters] = useState<API.Master[]>([]);
  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  const { loaded, courses, customCourses } = useStudyplanContext();

  const selectedCourses = [...courses[4], ...courses[5], ...customCourses[4], ...customCourses[5]];

  const updateMasterStats = async (signal?: AbortController) => {
    const courseCodes = selectedCourses.map(course => course.courseCode);
    const body = {
      ...filters,
      selectedCourses: courseCodes
    };
    return getMasterStats(body, signal);
  };

  useEffect(() => {
    const signal = new AbortController();

    if (!loaded) {
      return;
    }

    updateMasterStats(signal).then(data => {
      setStats(data);
    });
  }, [loaded]);

  useEffect(() => {
    const signal = new AbortController();

    const params = {
      programme: filters.programme,
      year: filters.year
    };

    getMasters(params, signal).then(data => {
      setMasters(data);
    });

    return () => {
      signal.abort();
    };
  }, [filters]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleUpdate = () => {
    updateMasterStats().then(stats => setStats(stats));
  };

  const enoughCourses = selectedCourses.length >= 4;

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
      <Row>
        <Col xs={12} id='courses'>
          <Heading2>Select Programme</Heading2>
          <FilterContainer>
            <ReadonlyField label='Programme' value={filters.programme} />
            <ReadonlyField label='Year' value={filters.year} />
          </FilterContainer>
        </Col>
      </Row>
      <Row gap={10}>
        <Col xs={12}>
          {/** TODO: Refactor to separate component */}
          <GetStatsBar>
            <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
              <IconButton
                disabled={!enoughCourses}
                onClick={handleUpdate}
                icon={<ReloadIcon fill='white' width='0.8rem' />}
              >
                Check Masters
              </IconButton>
            </Tooltip>
            <StickyButton
              variant='secondary'
              onClick={handleModal}
              icon={<ReloadIcon fill='white' width='0.8rem' />}
            >
              Copy Plan
            </StickyButton>
            <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
          </GetStatsBar>
        </Col>
        <Col xs={12} lg={6} id='master-check'>
          <MasterCheck masters={masters} stats={stats} colorMap={colorMap} />
        </Col>
        <Col xs={12} lg={6}>
          <TwoColumnWrapper>
            <CourseContainer courses={selectedCourses} masters={stats} colorMap={colorMap} />
          </TwoColumnWrapper>
        </Col>
      </Row>
      <Row id='my-plan' gap={10}>
        <Col xs={12} lg={6}>
          <Heading2>Fourth Year</Heading2>
          <SelectedCoursesTable year={4} />
        </Col>
        <Col xs={12} lg={6}>
          <Heading2>Fifth Year</Heading2>
          <SelectedCoursesTable year={5} />
        </Col>
      </Row>
    </>
  );
};

export default ReadOnlyView;
