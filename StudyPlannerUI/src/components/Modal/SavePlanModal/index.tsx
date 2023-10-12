import { useState, useEffect, useRef, ChangeEvent, FC } from 'react';
import Modal from 'components/Modal';
import { Heading2 } from 'components/Typography/Heading2';
import { Paragraph } from 'components/Typography/Paragraph';
import { Filters } from 'interfaces/Types';
import { useStudyplanContext } from 'hooks/CourseContext';
import CopyButton from './CopyButton';
import { FormContainer, FormRow } from 'components/Form/styles';
import { FormInput } from 'components/Form';
import { StyledButton } from 'components/Button/style';
import { savePlan } from 'api/studyplan';
import { Endpoints } from 'api/constants';

interface SavePlanModalProps {
  isOpen: boolean;
  data: Filters;
  onClose: () => void;
}

interface URLS {
  sId: string;
  sIdReadOnly: string;
}
const SavePlanModal: FC<SavePlanModalProps> = ({ data, isOpen, onClose }) => {
  const [planName, setPlanName] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [urls, setUrls] = useState<URLS | null>(null);

  const { courses, loaded, loadedPlan, setUrls: setContextUrls } = useStudyplanContext();

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const wasOpened = useRef(false);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setPlanName(value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    submitData().then(() => setPlanName(''));
  };

  const copyToClipboard = (url = '') => {
    navigator?.clipboard?.writeText(url);
  };

  const parseCourses = (courses: CourseData.SelectedCourse[]) => {
    return courses.map(course => ({
      course_code: course.course_code,
      period_start: course.periods[0].start,
      period_end: course.periods[0].end,
      study_year: course.selectedYear
    }));
  };

  const submitData = async () => {
    // convert courses to an array of object with year and course_code
    const yearFour = parseCourses(courses[4]);
    const yearFive = parseCourses(courses[5]);
    const SelectedCourses = [...yearFour, ...yearFive];

    const { Programme, Year } = data;
    const body = {
      StudyPlanName: planName,
      Programme,
      Year,
      SelectedCourses
    };

    try {
      const response = await savePlan(body);

      const BASE_URL = window.location.origin + Endpoints.studyPlan;
      const urls = {
        sId: BASE_URL + '/' + response.StudyPlanId,
        sIdReadOnly: BASE_URL + '/' + response.StudyPlanReadOnlyId
      };

      setSubmitSuccess(true);
      setUrls(urls);
      setContextUrls(urls);
    } catch (error) {
      setSubmitSuccess(false);
      // TODO: Handle error
    }
  };

  const shouldShowModal = (!loaded && !submitSuccess) || (loadedPlan.readOnly && !submitSuccess);

  const handleClose = () => {
    wasOpened.current = true;
    onClose();
  };

  if (!shouldShowModal && wasOpened.current) {
    return null;
  }

  return (
    <Modal hasCloseBtn isOpen={isOpen} onClose={handleClose}>
      {!submitSuccess ? (
        <>
          <Heading2>Save your study plan</Heading2>
          <Paragraph>
            Saving your studyplan will allow you to share or edit your studyplan in the future. Feel
            free to give it a name so that you and your friends can easily identify your study plan.
          </Paragraph>
          <Paragraph>
            <strong>Note:</strong> Your study plan will be saved anonymously and will not be
            connected to any account or such.
          </Paragraph>
          <FormContainer onSubmit={handleSubmit}>
            <FormRow>
              <FormInput
                placeholder='Enter study plan name'
                label='Plan name'
                type='string'
                id='name'
                name='name'
                value={planName}
                onChange={handleInputChange}
                required
              />
              <StyledButton variant='primary' type='submit'>
                Save plan
              </StyledButton>
            </FormRow>
          </FormContainer>
        </>
      ) : (
        <>
          <Heading2>Study plan saved!</Heading2>
          <Paragraph>
            Save the Editable link for future use and ability to edit your study plan.
          </Paragraph>
          <FormRow>
            <FormInput readOnly type='text' label='Editable Link' value={urls?.sId} />
            <CopyButton onClick={() => copyToClipboard(urls?.sId)} />
          </FormRow>
          <Paragraph>
            Share your study plan with others by sharing the read only link below.
          </Paragraph>
          <FormRow>
            <FormInput readOnly type='text' label='Read only Link' value={urls?.sIdReadOnly} />
            <CopyButton onClick={() => copyToClipboard(urls?.sIdReadOnly)} />
          </FormRow>
        </>
      )}
    </Modal>
  );
};

export default SavePlanModal;
