import ScrollArrow from './components/ScrollArrow';
import { Container, Wrapper } from './style';
import Courses from './components/Courses';
import SelectedCourses from './components/SelectedCourses/index';

function MainPage(): JSX.Element {
  return (
    <Container>
      <Wrapper>
        <Courses />
        <SelectedCourses />
      </Wrapper>
      <ScrollArrow />
    </Container>
  );
}

export default MainPage;
