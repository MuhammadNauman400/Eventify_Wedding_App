import { Box, Divider, Stack } from '@mui/material'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Centered } from './design'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import { useViewports } from 'helpers/viewports'

const Footer = () => {
  const { isMobile } = useViewports()
  const data1 = [
    'Wedding Venues',
    'Photographers',
    'Caterers',
    'Cakes',
    'DJs',
    'Hair',
    'Makeup',
    'Rentals',
    'Videographers'
  ]

  return (
    <Box mt={4} maxWidth='100vw'>
      <Divider />

      <Box pt={3}>
        <Container component='footer' maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h3' textAlign={isMobile ? 'center' : 'left'} fontWeight='bold'>
                Evetify
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} textAlign='right' justifyContent='space-between'>
              <Centered mt={isMobile ? 3 : 1} justifyContent={isMobile ? 'center' : 'flex-end'}>
                <Stack
                  direction='row'
                  divider={<Divider orientation='vertical' flexItem />}
                  spacing={2}
                >
                  <FacebookIcon />

                  <GitHubIcon />
                  <LinkedInIcon />

                  <EmailIcon />
                </Stack>
              </Centered>
            </Grid>
          </Grid>
          <Box py={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Centered flexDirection='column'>
                  <Box>
                    <Typography variant='h6' fontWeight='bold'>
                      Vendor
                    </Typography>
                    {data1.map(item => {
                      return (
                        <Typography variant='body2' my={1}>
                          {item}
                        </Typography>
                      )
                    })}
                  </Box>
                </Centered>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Centered flexDirection='column'>
                  <Box>
                    <Typography variant='h6' fontWeight='bold'>
                      Shops
                    </Typography>
                    {data1.map(item => {
                      return (
                        <Typography variant='body2' my={1}>
                          {item}
                        </Typography>
                      )
                    })}
                  </Box>
                </Centered>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Centered flexDirection='column'>
                  <Box>
                    <Typography variant='h6' fontWeight='bold'>
                      Wedding
                    </Typography>
                    {data1.map(item => {
                      return (
                        <Typography variant='body2' my={1}>
                          {item}
                        </Typography>
                      )
                    })}
                  </Box>
                </Centered>
              </Grid>
            </Grid>
          </Box>
          <Typography variant='body1' textAlign='center' mb={4}>
            © 2006 - 2024 The Knot Worldwide Inc.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
