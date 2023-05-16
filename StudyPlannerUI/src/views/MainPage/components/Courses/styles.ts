import { StyledButton } from 'components/Button';
import styled from 'styled-components';
import { device } from 'utils/breakpoints';

export const StatsButton = styled(StyledButton)`
  margin-bottom: 10px;
`;

export const FilterContainer = styled.div`
  display: flex;
  width: max-content;
`;

export const StatsWrapper = styled.div`
  @media (${device.lg}) {
    margin-top: -65px;
  }
`;

export const Select = styled.select`
  min-width: max-content;
`;

export const GetStatsBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 10px;
`;
