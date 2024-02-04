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
import { useStudyplanContext } from 'hooks/CourseContext';
import { useToastContext } from 'hooks/useToast';
import { Filters } from 'interfaces/Types';

import StickyButton from 'components/Button/StickyButton';
import { FlexContainer } from 'components/Layout';
import SavePlanModal from 'components/Modal/SavePlanModal';

interface ActionBarProps {
  filters: Filters;
  updateMasterStats: () => void;
  selectedCourses: CourseData.SelectedCourse[];
}

function ActionBar({ filters, selectedCourses }: ActionBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { urls, savePlan, loaded } = useStudyplanContext();
  const toastDispatch = useToastContext();

  const handleModal = () => {
    if (urls.sId || loaded) {
      savePlan(filters).then(() => {
        toastDispatch.showToast('Plan saved!', 'success', 3);
      });
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  const enoughCourses = selectedCourses.length >= 4;

  return (
    <FlexContainer>
      <StickyButton disabled={!enoughCourses} variant='primary' onClick={handleModal}>
        Save Plan
      </StickyButton>
      <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
    </FlexContainer>
  );
}

export default ActionBar;
