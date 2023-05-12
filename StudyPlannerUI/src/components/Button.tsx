import styled from 'styled-components';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme }) => theme.button};
  border-color: #007bff;
  padding: 8px 12px;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  padding: 6px 12px;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    border-color: #0062cc;
  }
  ${({ disabled }) =>
    disabled &&
    'opacity: 0.5; &:hover { background-color: #007bff; border-color: #007bff; }; cursor: not-allowed;'}
`;

export const AlertButton = styled(StyledButton)`
  background-color: #dc3545;
  border-color: #dc3545;
  &:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  font-size: 1em;
`;
