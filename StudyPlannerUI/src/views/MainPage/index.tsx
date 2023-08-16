import ScrollArrow from './components/ScrollArrow';
import { Container, Wrapper } from './style';
import Courses from './components/Courses';
import HorizontalBarChart from './components/SelectedCourses/HorizontalBarChart';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';

function MainPage(): JSX.Element {
  return (
    <Container>
      <Wrapper>
        <Courses />
        <Row>
          <Col md={6}>
            <HorizontalBarChart year={4} />
          </Col>
          <Col md={6}>
            <HorizontalBarChart year={5} />
          </Col>
        </Row>
      </Wrapper>
      <ScrollArrow />
    </Container>
  );
}

export default MainPage;
