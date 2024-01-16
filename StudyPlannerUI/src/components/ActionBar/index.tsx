import { useState } from 'react';
import IconButton from 'components/Button/Button';
import StickyButton from 'components/Button/StickyButton';
import ReloadIcon from 'components/Icons/Reload';
import SavePlanModal from 'components/Modal/SavePlanModal';
import { GetStatsBar } from 'components/Temp/styles';
import Tooltip from 'components/Tooltip';
import { useStudyplanContext } from 'hooks/CourseContext';
import { useToastContext } from 'hooks/useToast';
import { Filters } from 'interfaces/Types';

interface ActionBarProps {
  filters: Filters;
  updateMasterStats: () => void;
  selectedCourses: CourseData.SelectedCourse[];
}

function ActionBar({ filters, updateMasterStats, selectedCourses }: ActionBarProps) {
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
    <GetStatsBar>
      <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
        <IconButton
          disabled={!enoughCourses}
          onClick={updateMasterStats}
          icon={<ReloadIcon fill='white' width='0.8rem' />}
        >
          Check Masters
        </IconButton>
      </Tooltip>
      <StickyButton
        disabled={!enoughCourses}
        variant='primary'
        onClick={handleModal}
        icon={<ReloadIcon fill='white' width='0.8rem' />}
      >
        Save Plan
      </StickyButton>
      <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
    </GetStatsBar>
  );
}

export default ActionBar;
