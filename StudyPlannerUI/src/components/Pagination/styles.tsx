import styled, { css } from 'styled-components';

export const PaginationContainer = styled.ul`
  display: flex;
  list-style-type: none;
  width: auto;
  justify-content: center;
`;

const arrowStyles = css`
  &:before {
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid ${({ theme }) => theme.outline};
    border-top: 0.12em solid ${({ theme }) => theme.outline};
  }
`;

export const ArrowLeft = styled.div`
  ${arrowStyles}
  transform: rotate(-135deg) translate(-50%);
`;

export const ArrowRight = styled.div`
  ${arrowStyles}
  transform: rotate(45deg);
`;

export const PaginationItem = styled.li<{ disabled?: boolean; selected?: boolean }>`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: white;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  color: ${({ theme }) => theme.onBackground};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;

      &:hover {
        background-color: transparent;
        cursor: default;
      }
    `}

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.secondaryContainer};
    `}

    &:hover {
    background-color: ${({ theme }) => theme.secondary};
    cursor: pointer;
  }
`;

export const PaginationItemDots = styled(PaginationItem)`
  &:hover {
    background-color: transparent;
    cursor: default;
  }
`;

export const PageNumber = styled.a`
  color: ${({ theme }) => theme.onBackground};
  text-decoration: none;
`;
