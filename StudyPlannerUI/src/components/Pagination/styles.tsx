import styled, { css } from 'styled-components';

export const PaginationContainer = styled.ul`
  display: flex;
  list-style-type: none;
  width: 100%;
  justify-content: center;
`;

const arrowStyles = css`
  &:before {
    position: relative;
    content: '';
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border-right: 0.12em solid rgba(0, 0, 0, 0.87);
    border-top: 0.12em solid rgba(0, 0, 0, 0.87);
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
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;

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
      background-color: rgba(0, 0, 0, 0.08);
    `}

    &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`;

export const PaginationItemDots = styled(PaginationItem)`
  &:hover {
    background-color: transparent;
    cursor: default;
  }
`;
