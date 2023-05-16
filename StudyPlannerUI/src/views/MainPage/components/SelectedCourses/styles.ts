import { StyledButton } from 'components/Button';
import styled from 'styled-components';

export const ArrowButton = styled.button`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
`;

export const ButtonIcon = styled.span`
  margin-right: 4px;
`;

export const RemoveButton = styled(StyledButton)`
  display: block;
  margin: 0 auto;
  background: #c83232;
`;

export const Wrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
