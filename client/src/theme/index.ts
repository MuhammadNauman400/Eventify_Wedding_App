import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { darkModePalette, lightModePalette } from './palette'
import { typography } from './typography'
import { spacing } from './spacing'
import { breakpoints } from './breakpoints'
import { transitions } from './transitions'

export enum ThemeVariantsProps {
  light = 'light',
  dark = 'dark'
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export const CustomTheme = (mode: ThemeVariantsProps) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightModePalette : darkModePalette)
    },
    typography,
    spacing,
    breakpoints,
    transitions
  })
  return responsiveFontSizes(theme)
}
