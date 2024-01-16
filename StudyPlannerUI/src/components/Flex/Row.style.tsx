import styled from 'styled-components';

const Row = styled.div<{ gap?: number }>`
  gap: ${({ gap }) => gap || 0}px 0px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

export default Row;
