/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { FormEvent, useEffect, useState } from 'react';
import { FormInput } from 'components/Form';
import { FormContainer, FormRow } from 'components/Form/styles';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';
import { useStudyplanContext } from 'hooks/CourseContext';
import Modal from './index';
import styled from 'styled-components';
import { OutlinedButton, StyledButton } from 'components/Button/style';
import { courseSchema } from './CourseSchema';
import { Option, Select } from 'components/Select';

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
  courseCode: '',
  courseName: '',
  credits: 0,
  level: '',
  periods: [{ start: 0, end: 0 }],
  period: null,
  studyYear: 4
};

interface ErrorObject {
  code: string;
  message: string;
  path: Array<string | number>;
  [key: string]: any; // Additional properties depending on error type
}

const LEVELS = ['G1', 'G2', 'A'];

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  const [course, setCourse] = useState<CourseData.SelectedCourse>(defaultCourse);
  const [addedCourse, setAddedCourse] = useState<string>('');
  const [errors, setErrors] = useState<any>({
    courseCode: '',
    courseName: '',
    credits: '',
    level: '',
    periods: [{ start: '', end: '' }]
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const { addCourse, removeCustomCourse } = useStudyplanContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLevelChange = (value: string) => {
    setCourse(prev => ({
      ...prev,
      level: value
    }));
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = event.target;

    setCourse(prev => ({
      ...prev,
      periods: [{ ...prev.periods[0], [name]: valueAsNumber }]
    }));
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = event.target;

    setCourse(prev => ({
      ...prev,
      [name]: valueAsNumber
    }));
  };

  function convertErrorsToNestedObject(errorsArray: ErrorObject[]): Record<string, any> {
    const errors: Record<string, any> = {};

    errorsArray.forEach(error => {
      let current = errors;

      error.path.forEach((key, index) => {
        if (index === error.path.length - 1) {
          current[key] = error.message;
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    });

    return errors;
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validation = courseSchema.safeParse(course);

    if (!validation.success) {
      // reduce errors to an object with paths as keys and messages as values
      const errors = convertErrorsToNestedObject(validation.error.errors);
      setErrors(errors);
      return;
    }

    const customCourse: CourseData.SelectedCourse = {
      ...course,
      custom: true
    };

    addCourse(customCourse, course.studyYear, course.periods[0]);
    setSubmitSuccess(true);
    setAddedCourse(course.courseCode);
    setCourse(defaultCourse);
  };

  const handleUndo = () => {
    removeCustomCourse(addedCourse, 4);
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
            id='courseName'
            name='courseName'
            type='text'
            value={course.courseName}
            onChange={handleChange}
            errorMsg={errors.course_name}
            required
          />

          <FormInput
            label='Course Code'
            id='courseCode'
            name='courseCode'
            type='text'
            value={course.courseCode}
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
            onChange={handleNumberChange}
            errorMsg={errors.credits}
            required
          />
          <Select
            placeholder='Select Level'
            label='Level'
            value={course.level}
            onChange={handleLevelChange}
          >
            <Option value=''>Select</Option>
            {LEVELS.map(level => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        </FormRow>
        <FormRow>
          <FormInput
            label='Start Period'
            id='period_start'
            name='start'
            type='number'
            value={course.periods[0].start}
            onChange={handlePeriodChange}
            errorMsg={errors.periods[0].start}
            required
          />
          <FormInput
            label='End Period'
            id='period_end'
            name='end'
            type='number'
            value={course.periods[0].end}
            onChange={handlePeriodChange}
            errorMsg={errors.periods[0].end}
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
