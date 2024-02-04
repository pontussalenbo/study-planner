/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import React from 'react';
import { Filters } from 'interfaces/Types';

import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import SelectedCourses from 'components/SelectedCourses/SelectedCourses';
import { Heading2 } from 'components/Typography/Heading2';

import CourseContainer from './containers/CourseContainer';
import { Container, Wrapper } from './style';

const BarChart = React.lazy(() => import('components/Barchart'));

interface MainPageProps {
  filters?: Filters;
}

const MainPage: React.FC<MainPageProps> = ({ filters }) => {
  return (
    <Container>
      <Wrapper>
        <Row>
          <CourseContainer initFilters={filters} />
        </Row>

        <Row id='my-plan'>
          <Col xs={12} lg={6}>
            <Heading2>Fourth Year</Heading2>
            <SelectedCourses year={4} />
          </Col>

          <Col xs={12} lg={6}>
            <Heading2>Fifth Year</Heading2>
            <SelectedCourses year={5} />
          </Col>
        </Row>
        <Row id='graphs'>
          <Col width='100%' md={6}>
            <BarChart year={4} />
          </Col>
          <Col width='100%' md={6}>
            <BarChart year={5} />
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default MainPage;
