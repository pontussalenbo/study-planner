import styled from 'styled-components';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme }) => theme.button};
  border-color: ${({ theme }) => theme.buttonBorder};
  min-width: 88px;
  padding: 8px 12px;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  padding: 6px 12px;
  &:hover {
    filter: brightness(1.2);
    // border-color: #0062cc;
  }
  ${({ disabled }) => disabled && 'opacity: 0.5; cursor: not-allowed;'}
`;

export const AlertButton = styled(StyledButton)`
  background-color: #dc3545;
  border-color: #dc3545;
  &:hover {
    border-color: #bd2130;
  }
  font-size: 1em;
`;
