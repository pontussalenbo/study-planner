import styled from 'styled-components';
import Add from './icons/Add';

import { ButtonHTMLAttributes } from 'react';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme }) => theme.button};
  border-color: ${({ theme }) => theme.buttonBorder};
  min-width: 88px;
  padding: 8px 12px;
  padding-left 8px;
  padding-right: 12px;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
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

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover,
  &:focus {
    background-color: #0056b3;
    outline: none;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

type ButtonWithIconProps = React.ComponentProps<typeof Button>;

const StyledButtonWithIcon = ({ children, ...rest }: ButtonWithIconProps) => (
  <StyledButton {...rest}>
    <IconWrapper>
      <Add fill='white' />
    </IconWrapper>
    {children}
  </StyledButton>
);

export default StyledButtonWithIcon;
