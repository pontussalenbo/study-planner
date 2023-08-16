import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Wrapper = styled.div`
  min-width: 350px;
  padding: 1rem;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;
