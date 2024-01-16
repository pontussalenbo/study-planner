import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ListContainer = styled.div`
  max-height: 650px;
  width: 100%;
  overflow: auto;
  font-size: 14px;
  background-color: ${Tokens.neutralVariant20};
  color: ${({ theme }) => theme.inverseSurface};
  border-radius: 8px;
  padding: 0px 8px;
  margin-bottom: 1rem;
`;
