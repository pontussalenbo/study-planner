import React, { useRef, useState } from 'react';
import IconButton, { StyledButton } from 'components/Button/Button';
import QMark from 'components/Icons/Qmark';
import styled from 'styled-components';
import Modal from 'components/Modal';
import { useStudyplanContext } from 'hooks/CourseContext';
import FlexContainer from 'components/Layout';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & + & {
    margin-top: 1rem;
  }

  label,
  input,
  select,
  button {
    width: 100%;
    display: block;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [course, setCourse] = useState<CourseData.SelectedCourse>({
    course_code: '',
    course_name: '',
    credits: 0,
    level: '',
    periods: [{ start: -1, end: -1 }],
    selectedPeriod: null,
    selectedYear: 4
  });
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  const { addCourse } = useStudyplanContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = event.target;
    setCourse(prev => ({
      ...prev,
      periods: [{ ...prev.periods[0], [name]: valueAsNumber }]
    }));
  };

  const handleFormSubmit = () => {
    addCourse(course, course.selectedYear, course.selectedPeriod);
    setSubmitSuccess(true);
  };

  return (
    <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <Heading2>Did you not find your course?</Heading2>
      <Paragraph>
        Some courses are external or just not provided correctly, thus needed to be added manually.
      </Paragraph>
      <Paragraph>
        If you want to add a course, please fill in the form below and it will be added to your
        study plan.
      </Paragraph>
      <form onSubmit={handleFormSubmit}>
        <FlexContainer align='flex-end' gap='10px'>
          <FormRow>
            <label htmlFor='name'>Course name</label>
            <input
              ref={focusInputRef}
              id='course_code'
              name='course_code'
              type='text'
              value={course.course_code}
              onChange={handleChange}
              required
            />
          </FormRow>
          <FormRow>
            <label htmlFor='name'>Course name</label>
            <input
              ref={focusInputRef}
              id='course_name'
              name='course_name'
              type='text'
              value={course.course_name}
              onChange={handleChange}
              required
            />
          </FormRow>
        </FlexContainer>
        <FormRow>
          <label htmlFor='name'>Credits</label>
          <input
            ref={focusInputRef}
            id='credits'
            name='credits'
            type='number'
            value={course.credits}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <label htmlFor='name'>Level</label>
          <input
            ref={focusInputRef}
            id='level'
            name='level'
            type='text'
            value={course.level}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FlexContainer align='flex-end' gap='10px'>
          <FormRow>
            <label htmlFor='name'>Period Start</label>
            <input
              ref={focusInputRef}
              id='period_start'
              name='start'
              type='text'
              value={course.periods[0].start}
              onChange={handlePeriodChange}
              required
            />
          </FormRow>
          <FormRow>
            <label htmlFor='name'>Period End</label>
            <input
              ref={focusInputRef}
              id='period_end'
              name='end'
              type='text'
              value={course.periods[0].end}
              onChange={handlePeriodChange}
              required
            />
          </FormRow>
        </FlexContainer>
        <FormRow>
          <StyledButton variant='primary' type='submit'>
            Add Course
          </StyledButton>
        </FormRow>
      </form>
    </Modal>
  );
};

function AddCourse() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        onClick={() => setIsModalOpen(true)}
        variant='tertiary'
        text
        icon={<QMark size='0.8rem' />}
      >
        Missing course
      </IconButton>
      <AddCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default AddCourse;
