/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { ButtonHTMLAttributes } from 'react';

import { ButtonVariant, IconWrapper, StyledButton, Text } from './style';

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
