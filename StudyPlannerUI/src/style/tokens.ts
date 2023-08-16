const primaryTokens = {
    primary0: '#000000',
    primary10: '#00201f',
    primary20: '#003735',
    primary25: '#004341',
    primary30: '#00504d',
    primary35: '#005d5a',
    primary40: '#006a66',
    primary50: '#008581',
    primary60: '#00a29d',
    primary70: '#22beb9',
    primary80: '#4edad4',
    primary90: '#70f7f1',
    primary95: '#b0fffa',
    primary98: '#e3fffc',
    primary99: '#f2fffd',
    primary100: '#ffffff'
} as const;

const secondaryTokens = {
    secondary0: '#000000',
    secondary10: '#051f1e',
    secondary20: '#1b3533',
    secondary25: '#27403e',
    secondary30: '#324b4a',
    secondary35: '#3e5755',
    secondary40: '#4a6361',
    secondary50: '#627c7a',
    secondary60: '#7b9694',
    secondary70: '#95b1ae',
    secondary80: '#b0ccc9',
    secondary90: '#cce8e5',
    secondary95: '#daf6f4',
    secondary98: '#e3fffc',
    secondary99: '#f2fffd',
    secondary100: '#ffffff'
} as const;

const tertiaryTokens = {
    tertiary0: '#000000',
    tertiary10: '#011d35',
    tertiary20: '#1a324b',
    tertiary25: '#253d56',
    tertiary30: '#314862',
    tertiary35: '#3d546f',
    tertiary40: '#49607b',
    tertiary50: '#627995',
    tertiary60: '#7b93b0',
    tertiary70: '#96adcb',
    tertiary80: '#b1c9e8',
    tertiary90: '#d1e4ff',
    tertiary95: '#e9f1ff',
    tertiary98: '#f8f9ff',
    tertiary99: '#fdfcff',
    tertiary100: '#ffffff'
} as const;
const neutralTokens = {
    neutral0: '#000000',
    neutral10: '#191c1c',
    neutral20: '#2d3131',
    neutral25: '#383c3c',
    neutral30: '#444747',
    neutral35: '#4f5352',
    neutral40: '#5b5f5e',
    neutral50: '#747877',
    neutral60: '#8e9190',
    neutral70: '#a9acab',
    neutral80: '#c4c7c6',
    neutral90: '#e0e3e2',
    neutral95: '#eff1f0',
    neutral98: '#f7faf9',
    neutral99: '#fafdfb',
    neutral100: '#ffffff'
} as const;
const neutralVariantTokens = {
    neutralVariant0: '#000000',
    neutralVariant10: '#141d1d',
    neutralVariant20: '#293231',
    neutralVariant25: '#343d3c',
    neutralVariant30: '#3f4948',
    neutralVariant35: '#4a5453',
    neutralVariant40: '#56605f',
    neutralVariant50: '#6f7978',
    neutralVariant60: '#889391',
    neutralVariant70: '#a3adac',
    neutralVariant80: '#bec9c7',
    neutralVariant90: '#dae5e3',
    neutralVariant95: '#e8f3f1',
    neutralVariant98: '#f1fcfa',
    neutralVariant99: '#f4fefd',
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
