import { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    error: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    error?: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true
  }
}

export const typography: TypographyOptions = {
  fontFamily: 'Montserrat, sans-serif',
  h1: {
    fontSize: 50
  },
  h2: {
    fontSize: 42
  },
  h3: {
    fontSize: 36
  },
  h4: {
    fontSize: 30
  },
  h5: {
    fontSize: 24
  },
  h6: {
    fontSize: 20
  },
  subtitle1: {
    fontSize: 21
  },
  subtitle2: {
    fontSize: 18
  },
  body1: {
    fontSize: 16
  },
  body2: {
    fontSize: 14
  },
  button: {
    fontSize: 15
  },
  caption: {
    fontSize: 12
  },
  overline: {
    fontSize: 10
  },
  error: {
    fontSize: 14,
    color: 'red'
  }
}
