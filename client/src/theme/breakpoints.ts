declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    mobile: true
    tablet: true
    xs: true
  }
}

export const breakpoints = {
  values: {
    xs: 300,
    sm: 600,
    md: 1000,
    lg: 1400,
    xl: 15232,
    tablet: 640,
    mobile: 500
  }
}
