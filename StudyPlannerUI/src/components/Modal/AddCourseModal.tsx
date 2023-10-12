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

interface AddCourseModalProps {
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

interface CourseFormProps {
  course_code: string;
  course_name: string;
  credits: number;
  level: string;
  start: number;
  end: number;
}
/*
TODO: examine usability of this
type TValidators = {
  [x in keyof CourseFormProps]: (...args: any) => boolean;
};

const errorMsgs = {
  course_code: 'Course code is required',
  course_name: 'Course name is required',
  credits: 'Credits must be between 1 and 30',
  level: 'Level must be G1, G2 or A',
  start: {
    bound: 'Start period must be between 1 and 4',
    order: 'Start period must be before end period'
  },
  end: {
    bound: 'End period must be between 1 and 4',
    order: 'End period must be after start period'
  }
};

const validators: TValidators = {
  course_code: (value: string) => value.length > 0,
  course_name: (value: string) => value.length > 0,
  credits: (value: number) => value > 0 && value <= 30,
  level: (value: string) => value === 'G1' || value === 'G2' || value === 'A',
  start: (value: number, other: number) => value > 0 && value <= 4 && value <= other,
  end: (value: number, other: number) => value > 0 && value <= 4 && value >= other
};

const validateCourse = (course: CourseData.SelectedCourse) => {
  const errors: Partial<Record<keyof CourseFormProps, string>> = {};

  Object.entries(validators).forEach(([key, validator]) => {
    const value = course[key as keyof CourseData.SelectedCourse];
    const other = key === 'start' ? course.periods[0].end : course.periods[0].start;

    if (!validator(value, other)) {
      errors[key as keyof CourseFormProps] = errorMsgs[key as keyof CourseFormProps];
    }
  });


  return errors;
};
  */

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  const [course, setCourse] = useState<CourseData.SelectedCourse>(defaultCourse);
  const [addedCourse, setAddedCourse] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormProps, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
            errorMsg={errors.course_name}
            required
          />

          <FormInput
            label='Course Code'
            id='course_code'
            name='course_code'
            type='text'
            value={course.course_code}
            onChange={handleChange}
            errorMsg={errors.course_code}
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
            errorMsg={errors.credits}
            required
          />
          <FormInput
            label='Level'
            id='level'
            name='level'
            type='text'
            value={course.level}
            onChange={handleChange}
            errorMsg={errors.level}
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
            errorMsg={errors.start}
            required
          />
          <FormInput
            label='End Period'
            id='period_end'
            name='end'
            type='number'
            value={course.periods[0].end}
            onChange={handlePeriodChange}
            errorMsg={errors.end}
            required
          />
        </FormRow>
        <StyledButton variant='primary' type='submit'>
          Add Course
        </StyledButton>
      </FormContainer>
    </Modal>
  );
};

export default AddCourseModal;
