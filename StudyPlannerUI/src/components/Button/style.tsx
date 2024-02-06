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
interface StyledButtonProps {
  disabled?: boolean;
  variant: ButtonVariant;
  disableElevation?: boolean;
}

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

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  min-width: 64px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-color: ${({ theme }) => theme.onPrimaryContainer};
  font-size: 1em;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  padding: 6px 16px;
  appearance: none;
  -webkit-appearance: none;
  -webkit-text-decoration: none;

  & > svg {
    fill: ${({ theme }) => theme.onPrimaryContainer};
    width: 1em;
    height: 1em;
  }

  ${({ theme, variant }) => {
    const { background, color } = variantTokens[variant];
    return `
      background-color: ${theme[background]};
      color: ${theme[color]};
    `;
  }}

  ${({ disableElevation }) => !disableElevation && `box-shadow: ${boxShadowDefault};`}

  ${({ theme, disabled, disableElevation, variant }) => {
    if (disabled) {
      return `
        background-color: ${theme.surfaceVariant};
        opacity: 0.5;
        color: ${theme.onSurfaceVariant};
        cursor: not-allowed;
      `;
    }

    if (!disableElevation) {
      const { hover, active } = variantTokens[variant];
      return `
        &:hover {
          background-color: ${Tokens[hover.dark]};
          box-shadow: ${boxShadowHover};
        }

        &:active {
          scale: 0.97;
          background-color: ${Tokens[active.dark]};
          box-shadow: ${boxShadowActive};
        }
      `;
    }
  }}
`;

export const OutlinedButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  min-width: 64px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: transparent;
  border: 1px solid; // Adjust the border width as needed
  border-color: ${({ theme }) => theme.outline};
  font-size: 1em;
  padding: 6px 10px; // Adjusted padding to account for the border width
  border-radius: 4px;
  transition:
    background-color 0.3s,
    border-color 0.3s,
    color 0.3s; // Smooth transitions

  ${({ theme, variant }) => {
    const { color } = variantTokens[variant]; // Assuming variantTokens has color for outlined variant
    return `
      color: ${theme[color]};
    `;
  }}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05); // Slight background color on hover for better UX
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1); // Slightly darker background for active state
  }

  ${({ disabled, theme }) =>
    disabled &&
    `
    color: ${theme.onSurfaceVariant};
    border-color: ${theme.surfaceVariant};
    cursor: not-allowed;
    background-color: transparent;
  `}
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: inherit;
  & > svg {
    width: 0.8em;
    height: 0.8em;
  }
`;

export const Text = styled.span`
  text-wrap: nowrap;
  @media (max-width: 520px) {
    display: none;
  }
`;
