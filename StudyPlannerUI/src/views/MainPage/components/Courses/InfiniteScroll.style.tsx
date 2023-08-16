import { Tokens } from 'style/tokens';
import styled from 'styled-components';

export const ListContainer = styled.div`
  height: 600px;
  width: 100%;
  overflow: auto;
  font-size: 14px;
  background-color: ${Tokens.neutralVariant20};
  color: ${({ theme }) => theme.inverseSurface};
  border-radius: 8px;
  padding: 8px;
`;

export const CourseRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const Column = styled.div<{ width?: string; textAlign?: string; mx?: string }>`
  text-align: ${({ textAlign }) => textAlign};
  ${({ width }) => `width: ${width}`};
  ${({ mx }) => `margin: 0px ${mx}`};
`;
