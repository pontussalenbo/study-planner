import { ButtonHTMLAttributes } from 'react';
import { StyledButton, IconWrapper, Text, ButtonVariant } from './style';

export interface IButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  text?: boolean;
  rref?: React.Ref<HTMLButtonElement>;
}

const IconButton = ({
  children,
  icon,
  text = true,
  rref,
  variant = 'primary',
  ...rest
}: IButtonWithIconProps) => (
  <StyledButton ref={rref} variant={variant} {...rest}>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    {text ? <Text>{children}</Text> : children}
  </StyledButton>
);

export default IconButton;
