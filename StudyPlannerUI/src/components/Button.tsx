import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme }) => theme.button};
  border-color: ${({ theme }) => theme.buttonBorder};
  width: max-content;
  height: max-content;
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

export const Button = styled.button`
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

const Text = styled.span`
  @media (max-width: 420px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

interface IButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: boolean;
}

const StyledButtonWithIcon = ({ children, icon, text = true, ...rest }: IButtonWithIconProps) => (
  <StyledButton {...rest}>
    <Container>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {text ? children : <Text>{children}</Text>}
    </Container>
  </StyledButton>
);

export default StyledButtonWithIcon;
