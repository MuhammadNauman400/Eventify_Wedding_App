import { Box, styled, Theme, Typography } from '@mui/material'
import { useViewports } from 'helpers/viewports'

type BadgeColor = 'APPROVED' | 'REJECTED' | 'PENDING' | 'NOT_SUBMITTED' | ''
interface BadgeProps {
  title: string
  color: BadgeColor
}

export const CustomBadge: React.FC<BadgeProps> = ({ title, color }) => {
  const { isDesktop } = useViewports()
  return (
    <StyledBox color={color} isDesktop={isDesktop}>
      <Typography variant={'body2'} color='white'>
        {title}
      </Typography>
    </StyledBox>
  )
}

interface StyledBoxProps {
  color: BadgeColor
  theme?: Theme
  isDesktop: boolean
}
const StyledBox = styled(Box)<StyledBoxProps>(({ theme, color, isDesktop }) => ({
  display: 'inline-block',
  padding: isDesktop ? `${theme.spacing(1)} ${theme.spacing(2)}` : '5px 9px',
  color: '#fff',
  border: ` 1px solid ${theme.palette.primary}`,
  borderRadius: theme.shape.borderRadius,
  fontWeight: 400,
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  zIndex: 20,
  backgroundColor: getColorBackgroundColor(color)
}))

const getColorBackgroundColor = (color: BadgeColor) => {
  switch (color) {
    case 'APPROVED':
      return '#34c38f'
    case 'REJECTED':
      return '#F44336'
    case 'PENDING':
      return '#FFC107'
    default:
      return '#000'
  }
}
