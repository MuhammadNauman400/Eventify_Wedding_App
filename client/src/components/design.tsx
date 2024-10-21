import { Box, BoxProps } from '@mui/material'

export const Flex: React.FC<BoxProps> = props => <Box display='flex' {...props} />

export const Centered: React.FC<BoxProps> = props => (
  <Flex justifyContent='center' alignItems='center' {...props} />
)
