/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Container, Wrapper } from './style';
import Courses from './components/Courses';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Filters } from 'interfaces/Types';
import HorizontalBarChart from 'components/Barchart';

interface MainPageProps {
  filters?: Filters;
}

const MainPage: React.FC<MainPageProps> = ({ filters }) => {
  return (
    <Container>
      <Wrapper>
        <Courses initFilters={filters} />
        <Row id='graphs'>
          <Col md={6}>
            <HorizontalBarChart year={4} />
          </Col>
          <Col md={6}>
            <HorizontalBarChart year={5} />
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default MainPage;
