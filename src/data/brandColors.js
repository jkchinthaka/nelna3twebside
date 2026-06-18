/** Official Nelna Farm logo palette — single source of truth */
export const NELNA_GREEN = '#27743A'
export const NELNA_GREEN_LIGHT = '#46AF53'
export const NELNA_GREEN_DARK = '#0D3013'
export const NELNA_GOLD = '#D8C76B'
export const NELNA_WHITE = '#EBE9DA'
export const NELNA_DARK_BG = '#251B25'

/** Legacy aliases used across the codebase */
export const BRAND_GREEN = NELNA_GREEN
export const BRAND_GREEN_RGB = '39, 116, 58'

/** Light tints for surfaces on white/cream backgrounds */
export const BRAND_GREEN_TINT_50 = '#f0f6f1'
export const BRAND_GREEN_TINT_100 = '#e3efe6'
export const BRAND_GREEN_TINT_200 = '#c5dcc9'
export const BRAND_GREEN_TINT_300 = '#9fc4a8'

export const brandGreenScale = {
  DEFAULT: NELNA_GREEN,
  50: BRAND_GREEN_TINT_50,
  100: BRAND_GREEN_TINT_100,
  200: BRAND_GREEN_TINT_200,
  300: BRAND_GREEN_TINT_300,
  400: NELNA_GREEN_LIGHT,
  500: NELNA_GREEN,
  600: NELNA_GREEN,
  700: '#1f5c2e',
  800: '#164422',
  900: NELNA_GREEN_DARK,
  950: NELNA_GREEN_DARK,
}

export const nelnaGoldScale = {
  DEFAULT: NELNA_GOLD,
  50: '#faf8ef',
  100: '#f5f0dc',
  200: '#ebe3c0',
  300: '#e0d5a3',
  400: NELNA_GOLD,
  500: NELNA_GOLD,
  600: '#b8a855',
  700: '#968944',
  800: '#756b36',
  900: '#554e28',
}

export const nelnaPalette = {
  green: NELNA_GREEN,
  greenLight: NELNA_GREEN_LIGHT,
  greenDark: NELNA_GREEN_DARK,
  gold: NELNA_GOLD,
  white: NELNA_WHITE,
  darkBg: NELNA_DARK_BG,
}
