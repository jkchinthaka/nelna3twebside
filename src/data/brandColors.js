/** Official Nelna color system — single source of truth (strict palette only). */

export const NELNA_GREEN = '#27743A'
export const NELNA_GREEN_LIGHT = '#46AF53'
export const NELNA_GREEN_DARK = '#0D3013'
export const NELNA_GOLD = '#D8C76B'
export const NELNA_WHITE = '#FFFFFF'
export const NELNA_DARK_BG = '#251B25'

export const NELNA_GREEN_RGB = '39, 116, 58'
export const NELNA_GOLD_RGB = '216, 199, 107'
export const NELNA_DARK_RGB = '37, 27, 37'

export const NELNA_GREEN_SOFT = 'rgba(39, 116, 58, 0.08)'
export const NELNA_GOLD_SOFT = 'rgba(216, 199, 107, 0.18)'
export const NELNA_DARK_SOFT = 'rgba(37, 27, 37, 0.08)'

/** RGB tuples for rgba() in CSS / shadows */
export const NELNA_GREEN_DARK_RGB = '13, 48, 19'

/** Legacy aliases — map to approved tokens only */
export const BRAND_GREEN = NELNA_GREEN
export const BRAND_GREEN_RGB = NELNA_GREEN_RGB
export const BRAND_GREEN_TINT_50 = NELNA_GREEN_SOFT
export const BRAND_GREEN_TINT_100 = NELNA_GREEN_SOFT
export const BRAND_GREEN_TINT_200 = NELNA_GREEN_SOFT
export const BRAND_GREEN_TINT_300 = NELNA_GREEN_SOFT

export const nelnaColors = {
  green: NELNA_GREEN,
  greenLight: NELNA_GREEN_LIGHT,
  greenDark: NELNA_GREEN_DARK,
  gold: NELNA_GOLD,
  white: NELNA_WHITE,
  darkBg: NELNA_DARK_BG,
  greenSoft: NELNA_GREEN_SOFT,
  goldSoft: NELNA_GOLD_SOFT,
  darkSoft: NELNA_DARK_SOFT,
}

/** @deprecated Use nelnaColors */
export const nelnaPalette = nelnaColors

/** Tailwind scale — each step is an approved token or rgba derivative */
export const brandGreenScale = {
  DEFAULT: NELNA_GREEN,
  50: NELNA_GREEN_SOFT,
  100: NELNA_GREEN_SOFT,
  200: NELNA_GREEN_SOFT,
  300: NELNA_GREEN_SOFT,
  400: NELNA_GREEN,
  500: NELNA_GREEN,
  600: NELNA_GREEN,
  700: NELNA_GREEN_DARK,
  800: NELNA_GREEN_DARK,
  900: NELNA_GREEN_DARK,
  950: NELNA_GREEN_DARK,
  light: NELNA_GREEN_LIGHT,
  dark: NELNA_GREEN_DARK,
  soft: NELNA_GREEN_SOFT,
}

export const nelnaGoldScale = {
  DEFAULT: NELNA_GOLD,
  soft: NELNA_GOLD_SOFT,
}

export const nelnaDarkScale = {
  DEFAULT: NELNA_DARK_BG,
  soft: NELNA_DARK_SOFT,
}
