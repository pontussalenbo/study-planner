import React, { useState } from 'react';
import { useStudyplanContext } from 'hooks/CourseContext';
import { useToastContext } from 'hooks/useToast';
import { Filters } from 'interfaces/Types';

import StickyButton from 'components/Button/StickyButton';
import ReloadIcon from 'components/Icons/Reload';
import FlexContainer from 'components/Layout';
import SavePlanModal from 'components/Modal/SavePlanModal';
import { FilterContainer } from 'components/Temp/styles';

import CreditsTable from './Courses/CreditsTable';

interface CreditsProps {
  filters: Filters;
  masters: API.Master[];
  enoughCourses: boolean;
}

const Credits: React.FC<CreditsProps> = ({ filters, masters, enoughCourses }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toastDispatch = useToastContext();
  const { loaded, loadedPlan, savePlan, urls } = useStudyplanContext();

  const handleModal = () => {
    if (urls.sId || (loaded && !loadedPlan.readOnly)) {
      savePlan(filters).then(() => {
        toastDispatch.showToast('Plan saved!', 'success', 3);
      });
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  return (
    <FlexContainer
      width='100%'
      direction='column'
      style={{ flexBasis: '45%', gridRow: '3/4', marginTop: '0.85rem' }}
    >
      <FilterContainer>
        <StickyButton
          disabled={!enoughCourses}
          variant='primary'
          onClick={handleModal}
          icon={<ReloadIcon fill='white' width='0.8rem' />}
        >
          Save Plan
        </StickyButton>
        <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
      </FilterContainer>

      <CreditsTable filters={filters} masters={masters} />
    </FlexContainer>
  );
};

export default Credits;
