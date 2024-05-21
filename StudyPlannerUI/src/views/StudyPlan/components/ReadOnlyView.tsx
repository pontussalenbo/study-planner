/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMasters, getMasterStats } from 'api/master';
import { useStudyplanContext } from 'hooks/CourseContext';
import type { Filters } from 'interfaces/Types';
import { generateColors } from 'utils/colors';

import StickyButton from 'components/Button/StickyButton';
import { CourseContainer } from 'components/CoursesWithMaster';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { FlexContainer } from 'components/Layout';
import MasterCheck from 'components/MasterCheck';
import SavePlanModal from 'components/Modal/SavePlanModal';
import { ReadonlyField } from 'components/ReadonlyField';
import SelectedCoursesTable from 'components/SelectedCourses/SelectedCourses';
import { FilterContainer } from 'components/style';
import { Heading2 } from 'components/Typography/Heading2';

import { TwoColumnWrapper } from './style';

interface CoursesProps {
  filters: Filters;
}

const ReadOnlyView: React.FC<CoursesProps> = ({ filters }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { loaded, courses, customCourses } = useStudyplanContext();

  const selectedCourses = [...courses[4], ...courses[5], ...customCourses[4], ...customCourses[5]];
  const courseCodes = selectedCourses.map(course => course.courseCode);
  const body = {
    ...filters,
    selectedCourses: courseCodes
  };

  const masterStats = useQuery({
    queryKey: ['masterStats', filters, selectedCourses],
    queryFn: () => getMasterStats(body),
    enabled: loaded
  });

  const mastersQuery = useQuery({
    queryKey: ['masters', filters],
    queryFn: () => getMasters(filters),
    enabled: loaded
  });

  const masters = mastersQuery.data ?? [];
  const stats = masterStats.data ?? [];

  const colorMap = useMemo(() => {
    const colors = generateColors(masters.length);
    const colorMap: [string, string][] = masters.map((master, idx) => [
      master.masterCode,
      colors[idx]
    ]);
    return new Map(colorMap);
  }, [mastersQuery.data]);

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

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
          <FlexContainer>
            <StickyButton variant='primary' onClick={handleModal}>
              Copy Plan
            </StickyButton>
            <SavePlanModal shouldCopy data={filters} isOpen={isModalOpen} onClose={handleModal} />
          </FlexContainer>
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
