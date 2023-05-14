import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import { Section } from 'components/Section';
import { Heading2 } from 'components/Typography/Heading2';
import HorizontalBarChart from './HorizontalBarChart';
import SelectedCoursesTable from './SelectedCourses';

function SelectedCourses() {
  return (
    <Section id='selectedCourses'>
      <Row>
        <Col md={6}>
          <Heading2>Fourth Year</Heading2>
          <SelectedCoursesTable year={4} />
          <HorizontalBarChart year={4} />
        </Col>
        <Col md={6}>
          <Heading2>Fifth Year</Heading2>
          <SelectedCoursesTable year={5} />
          <HorizontalBarChart year={5} />
        </Col>
      </Row>
    </Section>
  );
}

export default SelectedCourses;
