import React from 'react';
import ReadOnlyView from './components/ReadOnlyView';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import HorizontalBarChart from 'components/Barchart';
import { Container, Wrapper } from 'views/MainPage/style';
import { Filters } from 'interfaces/Types';

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
