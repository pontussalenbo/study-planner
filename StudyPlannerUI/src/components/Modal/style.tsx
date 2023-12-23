import styled from 'styled-components';
import { Tokens } from 'style/tokens';

export const ModalDialog = styled.dialog`
  background: ${Tokens.neutral20};
  color: ${({ theme }) => theme.onBackground};
  max-width: 600px;
  width: min-content;
  min-width: 400px;
  padding: 2rem;
  border: 0;
  border-radius: 0.5rem;
  position: fixed; // Use fixed positioning to position relative to the viewport
  top: 50%; // Start from the middle of the viewport
  left: 50%; // Start from the middle of the viewport
  transform: translate(-50%, -50%); // This ensures the dialog is perfectly centered
  box-shadow: hsl(0 0% 0% / 10%) 0 0 0.5rem 0.25rem;

  &::backdrop {
    background: hsl(0 0% 0% / 50%);
  }
`;

export const CloseButton = styled.button`
  color: ${({ theme }) => theme.onBackground};
  font-size: 0.75em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;

  & > svg {
    fill: ${Tokens.neutral50};
  }

  &:hover {
    cursor: pointer;
    & > svg {
      fill: ${Tokens.neutral70};
    }
  }

  &:active {
    & > svg {
      fill: ${Tokens.neutral60};
    }
    scale: 0.95;
  }
`;
