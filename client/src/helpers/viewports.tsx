import { useTheme, useMediaQuery } from '@mui/material'

interface Viewports {
  isMobile: boolean
  isLaptop: boolean
  isDesktop: boolean
}

export function useViewports(): Viewports {
  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'))
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'xl'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return {
    isMobile,
    isLaptop,
    isDesktop
  }
}
