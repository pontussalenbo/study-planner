import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Wrapper = styled.div`
  margin: 0 2rem;
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;
