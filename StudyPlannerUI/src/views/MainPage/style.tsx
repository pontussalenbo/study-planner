import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Wrapper = styled.div`
  min-width: 350px;
  width: 100%;
  padding: 1rem;
  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;
