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
