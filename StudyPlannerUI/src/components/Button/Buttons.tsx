/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { CustomTheme } from 'style/Theme';
import { Tokens } from 'style/tokens';
import styled from 'styled-components';

type Token = keyof typeof Tokens;
type ThemeColor = keyof CustomTheme;
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error';
interface Tokens {
  light: Token;
  dark: Token;
}

interface Colors {
  background: ThemeColor;
  color: ThemeColor;
  hover: Tokens;
  active: Tokens;
}

type ButtonColors = {
  [variant in ButtonVariant]: Colors;
};

interface BaseButtonProps {
  color?: string;
  size?: keyof typeof buttonSizes;
  disableElevation?: boolean;
  variant: ButtonVariant;
}

export const variantTokens: ButtonColors = {
  primary: {
    background: 'primaryContainer',
    color: 'onPrimaryContainer',
    hover: {
      light: 'primary60',
      dark: 'primary25'
    },
    active: {
      light: 'primary50',
      dark: 'primary30'
    }
  },
  secondary: {
    background: 'secondaryContainer',
    color: 'onSecondaryContainer',
    hover: {
      light: 'secondary60',
      dark: 'secondary25'
    },
    active: {
      light: 'secondary50',
      dark: 'secondary30'
    }
  },
  tertiary: {
    background: 'tertiaryContainer',
    color: 'onTertiaryContainer',
    hover: {
      light: 'tertiary60',
      dark: 'tertiary25'
    },
    active: {
      light: 'tertiary50',
      dark: 'tertiary30'
    }
  },
  error: {
    background: 'errorContainer',
    color: 'onErrorContainer',
    hover: {
      light: 'error60',
      dark: 'error25'
    },
    active: {
      light: 'error50',
      dark: 'error30'
    }
  }
};

// TODO: IMPLEMENT LIGHT THEME ? Maybe not
export const getColors = (variant: ButtonVariant, theme: CustomTheme) => {
  const { background, color, hover, active } = variantTokens[variant];

  return {
    background: theme[background],
    color: theme[color],
    hover: hover.dark,
    active: active.dark
  };
};

export const boxShadowDefault = `
  0px 3px 1px -2px rgba(0, 0, 0, 0.12),
  0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 1px 5px 0px rgba(0, 0, 0, 0.2);
`;

export const boxShadowHover = `
  0px 2px 4px -1px rgba(0,0,0,0.2),
  0px 4px 5px 0px rgba(0,0,0,0.14),
  0px 1px 10px 0px rgba(0,0,0,0.12);
`;

export const boxShadowActive = `
  0px 5px 5px -3px rgba(0,0,0,0.2),
  0px 8px 10px 1px rgba(0,0,0,0.14),
  0px 3px 14px 2px rgba(0,0,0,0.12);
`;

const buttonSizes = {
  small: '0.8125rem',
  medium: '0.875rem',
  large: '0.9375rem'
};

const paddings = {
  small: '4px 10px',
  medium: '6px 16px',
  large: '8px 22px'
};

const ButtonBase = styled.button<BaseButtonProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  font-size: ${({ size }) => buttonSizes[size || 'medium']};
  padding: ${({ size }) => paddings[size || 'medium']};
  border-radius: 4px;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  appearance: none;
  -webkit-appearance: none;
  -webkit-text-decoration: none;
  background: none;
  color: ${({ color }) => color || 'inherit'};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ disableElevation }) => !disableElevation && `box-shadow: ${boxShadowDefault};`}
  ${({ variant }) => {
    const { hover, active } = variantTokens[variant];
    return `
    &:hover {
      background-color: ${Tokens[hover.dark]};
    }

    &:active {
      scale: 0.97;
      background-color: ${Tokens[active.dark]};
    }
    `;
  }}
  ${({ disableElevation, disabled }) => {
    if (disabled || disableElevation) {
      return 'box-shadow: none; &:hover { box-shadow: none; }; &:active { box-shadow: none;}';
    }
  }}

  background-color: ${({ color, theme, variant }) => color || getColors(variant, theme).background};
`;

export const TextButton = styled(ButtonBase);

export const ContainedButton = styled(ButtonBase)`
  &:hover {
    box-shadow: ${boxShadowHover};
  }

  &:active {
    box-shadow: ${boxShadowActive};
  }
`;

export const OutlinedButton = styled(ButtonBase)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.outline};
`;

export const IconButton = styled.button<{
  color?: string;
  size?: keyof typeof buttonSizes;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 8px;
  border-radius: 50%;
  font-size: ${({ size }) => buttonSizes[size || 'medium']};
  background: none;
  color: ${({ color }) => color || 'inherit'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
