/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

const primaryTokens = {
    primary0: '#000000',
    primary10: '#002114',
    primary20: '#003825',
    primary25: '#00452e',
    primary30: '#005138',
    primary35: '#005f41',
    primary40: '#006c4b',
    primary50: '#00885f',
    primary60: '#00a575',
    primary70: '#00c38a',
    primary80: '#0fe1a1',
    primary90: '#4bffbc',
    primary95: '#bdffdd',
    primary98: '#e8fff0',
    primary99: '#f4fff6',
    primary100: '#ffffff'
} as const;

const secondaryTokens = {
    secondary0: '#000000',
    secondary10: '#0a1f16',
    secondary20: '#1f352a',
    secondary25: '#2a4035',
    secondary30: '#354b40',
    secondary35: '#41574b',
    secondary40: '#4d6357',
    secondary50: '#657c6f',
    secondary60: '#7e9688',
    secondary70: '#99b1a2',
    secondary80: '#b4ccbd',
    secondary90: '#cfe9d9',
    secondary95: '#ddf7e7',
    secondary98: '#e8fff0',
    secondary99: '#f4fff6',
    secondary100: '#ffffff'
} as const;

const tertiaryTokens = {
    tertiary0: '#000000',
    tertiary10: '#001f29',
    tertiary20: '#073543',
    tertiary25: '#17404f',
    tertiary30: '#244c5b',
    tertiary35: '#315767',
    tertiary40: '#3d6373',
    tertiary50: '#567c8d',
    tertiary60: '#7096a7',
    tertiary70: '#8ab1c2',
    tertiary80: '#a5ccde',
    tertiary90: '#c1e9fb',
    tertiary95: '#dff4ff',
    tertiary98: '#f3faff',
    tertiary99: '#fafcff',
    tertiary100: '#ffffff'
} as const;

const neutralTokens = {
    neutral0: '#000000',
    neutral10: '#191c1a',
    neutral20: '#2e312f',
    neutral25: '#393c3a',
    neutral30: '#444845',
    neutral35: '#505350',
    neutral40: '#5c5f5c',
    neutral50: '#757875',
    neutral60: '#8f918e',
    neutral70: '#a9aca8',
    neutral80: '#c5c7c3',
    neutral90: '#e1e3df',
    neutral95: '#eff1ed',
    neutral98: '#f8faf6',
    neutral99: '#fbfdf9',
    neutral100: '#ffffff'
} as const;

const neutralVariantTokens = {
    neutralVariant0: '#000000',
    neutralVariant10: '#151d19',
    neutralVariant20: '#2a322d',
    neutralVariant25: '#353d38',
    neutralVariant30: '#404943',
    neutralVariant35: '#4c554f',
    neutralVariant40: '#57605b',
    neutralVariant50: '#707973',
    neutralVariant60: '#8a938c',
    neutralVariant70: '#a4ada6',
    neutralVariant80: '#bfc9c1',
    neutralVariant90: '#dbe5dd',
    neutralVariant95: '#eaf3eb',
    neutralVariant98: '#f2fcf4',
    neutralVariant99: '#f5fff7',
    neutralVariant100: '#ffffff'
} as const;

const errorToken = {
    error0: '#000000',
    error10: '#410002',
    error20: '#690005',
    error25: '#7e0007',
    error30: '#93000a',
    error35: '#a80710',
    error40: '#ba1a1a',
    error50: '#de3730',
    error60: '#ff5449',
    error70: '#ff897d',
    error80: '#ffb4ab',
    error90: '#ffdad6',
    error95: '#ffedea',
    error98: '#fff8f7',
    error99: '#fffbff',
    error100: '#ffffff'
} as const;

export const Tokens = {
    ...primaryTokens,
    ...secondaryTokens,
    ...tertiaryTokens,
    ...neutralTokens,
    ...neutralVariantTokens,
    ...errorToken
};
