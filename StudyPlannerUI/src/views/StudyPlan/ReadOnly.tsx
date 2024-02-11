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
import { Container, Wrapper } from 'views/MainPage/style';

import HorizontalBarChart from 'components/Barchart';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';

import ReadOnlyView from './components/ReadOnlyView';

interface ReadOnlyProps {
  filters: Filters;
}

const ReadOnly: React.FC<ReadOnlyProps> = ({ filters }) => {
  return (
    <Container>
      <Wrapper>
        <ReadOnlyView filters={filters} />
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

export default ReadOnly;
