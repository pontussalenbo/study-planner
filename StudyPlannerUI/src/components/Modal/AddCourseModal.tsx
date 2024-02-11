/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useStudyplanContext } from 'hooks/CourseContext';

import { ContainedButton, OutlinedButton } from 'components/Button/Buttons';
import { FormInput } from 'components/Form';
import { FormContainer, FormRow } from 'components/Form/styles';
import { Select } from 'components/Select';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';

import { courseSchema } from './CourseSchema';
import Modal from './index';
import { ToastContainer } from './style';

interface ToastProps {
  onClick: () => void;
  show?: boolean;
}
// TODO: Refactor to reusable component
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

  //TODO: Refactor error handling to hook?
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

  const handleClose = () => {
    setSubmitSuccess(false);
    onClose();
  };

  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={handleClose}>
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
            step='0.5'
            value={course.credits}
            onChange={handleNumberChange}
            errorMsg={errors.credits}
            required
          />
          <Select
            options={LEVELS.map(level => ({ value: level, label: level }))}
            placeholder='Select Level'
            label='Level'
            value={course.level}
            onChange={handleLevelChange}
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
        <ContainedButton variant='primary' type='submit'>
          Add Course
        </ContainedButton>
      </FormContainer>
    </Modal>
  );
};

export default AddCourseModal;
