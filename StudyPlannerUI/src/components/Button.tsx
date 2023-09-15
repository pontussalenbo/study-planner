import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface StyledButtonProps {
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryContainer};
  color: ${({ theme }) => theme.onPrimaryContainer};
  border-color: ${({ theme }) => theme.onPrimaryContainer};

  min-width: 90px;
  font-size: 1em;
  padding: 8px 12px;
  border-radius: 4px;
  
  ${({ disabled, theme }) =>
    !disabled &&
    ` &:hover {
      background-color: ${theme.inversePrimary};
      color: ${theme.onSecondaryContainer};
      box-shadow: 0px 0px 3px 0px ${theme.shadow};
    }
    &:active {
      scale: 0.97;
      background-color: ${theme.onPrimary};
      color: ${theme.onSecondaryContainer};
    }`}
  }
 
  ${({ disabled, theme }) =>
    disabled &&
    `background-color: ${theme.surfaceVariant};
    opacity: 0.5; 
    color: ${theme.onSurfaceVariant};
    cursor: not-allowed;`}
`;

export const AlertButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.errorContainer};
  color: ${({ theme }) => theme.onErrorContainer};
  &:hover {
    background-color: ${({ theme }) => theme.errorContainer};
    color: ${({ theme }) => theme.onErrorContainer};
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  @media (max-width: 520px) {
    display: none;
  }
`;

interface IButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: boolean;
  rref?: React.Ref<HTMLButtonElement>;
}

const StyledButtonWithIcon = ({ children, icon, text = true, rref, ...rest }: IButtonWithIconProps) => (
  <StyledButton ref={rref} {...rest}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {text ? children : <Text>{children}</Text>}
  </StyledButton>
);

export default StyledButtonWithIcon;
