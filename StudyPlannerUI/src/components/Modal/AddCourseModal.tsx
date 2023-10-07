import { FormEvent, useEffect, useState } from 'react';
import { FormInput } from 'components/Form';
import { FormContainer, FormRow } from 'components/Form/styles';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';
import { useStudyplanContext } from 'hooks/CourseContext';
import Modal from './index';
import styled from 'styled-components';
import { OutlinedButton, StyledButton } from 'components/Button/style';

const ToastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color ${({ theme }) => theme.primaryContainer};
`;

interface ToastProps {
  onClick: () => void;
  show?: boolean;
}

const Toast: React.FC<ToastProps> = ({ onClick }) => {
  return (
    <ToastContainer>
      <Paragraph>Course added successfully!</Paragraph>
      <OutlinedButton variant='primary' onClick={onClick}>
        Undo
      </OutlinedButton>
    </ToastContainer>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultCourse: CourseData.SelectedCourse = {
  course_code: '',
  course_name: '',
  credits: 0,
  level: '',
  periods: [{ start: 0, end: 0 }],
  selectedPeriod: null,
  selectedYear: 4
};

const AddCourseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [course, setCourse] = useState<CourseData.SelectedCourse>(defaultCourse);
  const [addedCourse, setAddedCourse] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const { addCourse, removeCourse } = useStudyplanContext();

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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCourse(course, course.selectedYear, course.selectedPeriod);
    setSubmitSuccess(true);
    setAddedCourse(course.course_code);
    setCourse(defaultCourse);
  };

  const handleUndo = () => {
    removeCourse(addedCourse, 4);
    setSubmitSuccess(false);
  };

  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={onClose}>
      <Heading2>Did you not find your course?</Heading2>
      <Paragraph>
        Some courses are external or just not provided correctly, thus needed to be added manually.
      </Paragraph>
      <Paragraph>
        If you want to add a course, please fill in the form below and it will be added to your
        study plan.
      </Paragraph>
      {submitSuccess && <Toast onClick={handleUndo} />}
      <FormContainer onSubmit={handleFormSubmit}>
        <FormRow>
          <FormInput
            label='Course Name'
            id='course_name'
            name='course_name'
            type='text'
            value={course.course_name}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Course Code'
            id='course_code'
            name='course_code'
            type='text'
            value={course.course_code}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <FormInput
            label='Credits'
            id='credits'
            name='credits'
            type='number'
            value={course.credits}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Level'
            id='level'
            name='level'
            type='text'
            value={course.level}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <FormInput
            label='Start Period'
            id='period_start'
            name='start'
            type='number'
            value={course.periods[0].start}
            onChange={handlePeriodChange}
            required
          />
          <FormInput
            label='End Period'
            id='period_end'
            name='end'
            type='number'
            value={course.periods[0].end}
            onChange={handlePeriodChange}
            required
          />
        </FormRow>
        <FormRow>
          <StyledButton variant='primary' type='submit'>
            Add Course
          </StyledButton>
        </FormRow>
      </FormContainer>
    </Modal>
  );
};

export default AddCourseModal;
