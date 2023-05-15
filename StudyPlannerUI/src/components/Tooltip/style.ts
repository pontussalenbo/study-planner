import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

interface TooltipProps {
  left: string;
  show: boolean;
}

export const TooltipText = styled.span<TooltipProps>`
  visibility: hidden;
  width: max-content;
  max-width: 200px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 135%;
  // left: ${props => `calc(${props.left} - 15px)`};
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  ${(props: { show: boolean }) =>
        props.show &&
    `
    visibility: visible;
    opacity: 1;
  `}
`;

export const TooltipTrigger = styled.span`
  cursor: pointer;
`;
