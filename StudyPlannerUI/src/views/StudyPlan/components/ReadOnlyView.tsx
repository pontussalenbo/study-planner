import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Col from 'components/Flex/Col.style';
import Row from 'components/Flex/Row.style';
import IconButton from 'components/Button/Button';
import ReloadIcon from 'components/Icons/Reload';
import Tooltip from 'components/Tooltip';
import type { Filters } from 'interfaces/Types';
import { Heading2 } from 'components/Typography/Heading2';
import { FilterContainer, GetStatsBar } from 'components/Temp/styles';
import SelectedCoursesTable from 'components/SelectedCourses/SelectedCourses';
import { floatToHex, generateColors } from 'utils/colors';
import { Endpoints } from 'interfaces/API_Constants.d';
import { GET, POST } from 'utils/fetch';
import MasterCheck from 'components/MasterCheck';
import { CourseContainer } from 'components/CoursesWithMaster';
import {
  LegendContent,
  SelectContainer,
  SelectLabel,
  StyledFieldset,
  StyledLegend
} from 'components/Select/style';
import StickyButton from 'components/Button/StickyButton';
import SavePlanModal from 'components/Modal/SavePlanModal';
import { useStudyplanContext } from 'hooks/CourseContext';

// TODO: REFRACTOR THIS TO A NEW COMPONENT
const TwoColumnWrapper = styled.div`
  background-color: ${({ theme }) => theme.tertiary + floatToHex(0.2)};
  border-radius: 10px;
  padding: 10px 20px;
  display: grid;
  grid-template-rows: repeat(7, auto); /* 7 items per column */
  grid-auto-columns: 1fr; /* Makes each new column take up the full width */
  grid-auto-flow: column; /* Makes items flow into new columns after the 8th item */
  grid-gap: 10px 5px; /* Gap between items */
`;

interface ReadonlyFieldProps {
  label: string;
  value: string;
}

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <SelectContainer isOpen={false} disabled>
      <SelectLabel isOpen={false}>{value}</SelectLabel>
      <StyledFieldset isOpen={false}>
        <StyledLegend hasValue>
          <LegendContent>{label}</LegendContent>
        </StyledLegend>
      </StyledFieldset>
    </SelectContainer>
  );
}

// ! END TODO
interface CoursesProps {
  filters: Filters;
}

const ReadOnlyView: React.FC<CoursesProps> = ({ filters }) => {
  const [masters, setMasters] = useState<API.Master[]>([]);
  const [stats, setStats] = useState<API.MasterStatus[]>([]);

  const { loaded, courses } = useStudyplanContext();

  const selectedCourses = [...courses[4], ...courses[5]];

  const getMasterStats = async (signal?: AbortController) => {
    const courseCodes = selectedCourses.map(course => course.course_code);
    const body = {
      ...filters,
      selectedCourses: courseCodes
    };

    const data = await POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
    return data;
  };

  useEffect(() => {
    const signal = new AbortController();

    if (!loaded) {
      return;
    }
    getMasterStats(signal).then(data => {
      setStats(data);
    });
  }, [loaded]);

  useEffect(() => {
    const signal = new AbortController();
    const getMasters = async () => {
      const params = {
        programme: filters.Programme,
        year: filters.Year
      };
      const data = await GET<API.Master[]>(Endpoints.masters, new URLSearchParams(params), signal);
      return data;
    };

    getMasters().then(data => {
      setMasters(data);
    });

    return () => {
      signal.abort();
    };
  }, [filters]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleUpdate = async () => {
    const stats = await getMasterStats();
    setStats(stats);
  };

  const enoughCourses = selectedCourses.length >= 4;

  const colorMap = useMemo(() => {
    const colors = generateColors(masters.length);
    const colorMap: [string, string][] = masters.map((master, idx) => [
      master.master_code,
      colors[idx]
    ]);
    return new Map(colorMap);
  }, [masters]);

  return (
    <>
      <Row>
        <Col xs={12} id='courses'>
          <Heading2>Select Programme</Heading2>
          <FilterContainer>
            <ReadonlyField label='Programme' value={filters.Programme} />
            <ReadonlyField label='Year' value={filters.Year} />
          </FilterContainer>
        </Col>
      </Row>
      <Row gap={10}>
        <Col xs={12}>
          {/** TODO: Refactor to separate component */}
          <GetStatsBar>
            <Tooltip enabled={!enoughCourses} text='Needs atleast 4 courses'>
              <IconButton
                rref={buttonRef}
                disabled={!enoughCourses}
                onClick={handleUpdate}
                icon={<ReloadIcon fill='white' width='0.8rem' />}
              >
                Check Masters
              </IconButton>
            </Tooltip>
            <StickyButton
              variant='secondary'
              onClick={handleModal}
              icon={<ReloadIcon fill='white' width='0.8rem' />}
            >
              Save Plan
            </StickyButton>
            <SavePlanModal data={filters} isOpen={isModalOpen} onClose={handleModal} />
          </GetStatsBar>
        </Col>
        <Col xs={12} lg={6} id='master-check'>
          <MasterCheck masters={masters} stats={stats} colorMap={colorMap} />
        </Col>
        <Col xs={12} lg={6}>
          <TwoColumnWrapper>
            <CourseContainer courses={selectedCourses} masters={stats} colorMap={colorMap} />
          </TwoColumnWrapper>
        </Col>
      </Row>
      <Row id='my-plan' gap={10}>
        <Col xs={12} lg={6}>
          <Heading2>Fourth Year</Heading2>
          <SelectedCoursesTable year={4} />
        </Col>
        <Col xs={12} lg={6}>
          <Heading2>Fifth Year</Heading2>
          <SelectedCoursesTable year={5} />
        </Col>
      </Row>
    </>
  );
};

export default ReadOnlyView;
