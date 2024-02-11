/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { useState } from 'react';

import { ContainedButton } from 'components/Button/Buttons';
import AddCourseModal from 'components/Modal/AddCourseModal';

function AddMissingCourse() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <ContainedButton onClick={() => setIsModalOpen(true)} variant='tertiary'>
        Missing course?
      </ContainedButton>
      <AddCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default AddMissingCourse;
