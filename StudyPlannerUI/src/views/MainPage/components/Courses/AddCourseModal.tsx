import { useState } from 'react';
import IconButton from 'components/Button/Button';
import QMark from 'components/Icons/Qmark';
import AddCourseModal from 'components/Modal/AddCourseModal';

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
