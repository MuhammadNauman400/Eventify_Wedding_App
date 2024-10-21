import styled from '@emotion/styled'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { useViewports } from 'helpers/viewports'
import React from 'react'
import { Centered, Flex } from './design'
import { StyledLink } from 'pages/Home'
import { ClickAwayListener } from '@mui/base/ClickAwayListener'
import CloseIcon from '@mui/icons-material/Close'

interface subcategoriesProps {
  slug: string
  name: string
}
interface SimpleMenuProps {
  name: string
  img: string
  subcategories: subcategoriesProps[]
}

function SimpleMenu({ name, subcategories, img }: SimpleMenuProps) {
  const [open, setOpen] = React.useState(false)
  const { isMobile } = useViewports()
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Box onClick={handleClick}>
        <StyledTypography variant='body1' fontWeight='500'>
          {name}
        </StyledTypography>
      </Box>
      {open && (
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            sx={{
              width: '99.2vw',
              // padding: isMobile ? '1rem' : '2rem 1.5rem',
              position: 'absolute',
              top: 65,
              left: 0,
              zIndex: 999,
              background: '#fff'
            }}
          >
            <Divider />
            <Flex
              position='relative'
              top={20}
              right={40}
              justifyContent='flex-end'
              onClick={handleClose}
            >
              <CloseIcon
                sx={{
                  fontWeight: '1rem'
                }}
              />
            </Flex>
            <Container
              maxWidth='lg'
              sx={{
                padding: isMobile ? '1rem' : '2rem 1.5rem'
              }}
            >
              <Grid container spacing={2}>
                <Grid item sm={12} md={4}>
                  <Grid container spacing={2}>
                    {subcategories?.map(item => {
                      return (
                        <Grid item xs={12} md={6}>
                          <Flex
                            sx={{
                              alignItems: 'center'
                            }}
                          >
                            <Box
                              sx={{
                                padding: '4px',
                                background: '#000',
                                marginRight: '10px'
                              }}
                            />
                            <StyledLink to={`services/${item.slug}`} onClick={handleClose}>
                              <StyledTypography variant='body2'>{item.name}</StyledTypography>
                            </StyledLink>
                          </Flex>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                {!isMobile && (
                  <Grid item sm={12} md={4}>
                    <Centered mx={4}>
                      <StyledImg alt='no Img' src={img} />
                    </Centered>
                  </Grid>
                )}
                {!isMobile && (
                  <Grid item sm={12} md={4} px={2}>
                    <StyledBox>
                      <Flex alignItems='center' justifyContent='space-between'>
                        <Box pr={2}>
                          <Typography variant='body2' fontWeight='600'>
                            Destination Weddings
                          </Typography>
                          <Typography variant='caption' mt={1}>
                            Easily plan your international wedding.
                          </Typography>
                        </Box>
                        <StyledIcon src='https://www.WeddingWire.com/assets/img/logos/square-icon-guest.svg' />
                      </Flex>
                    </StyledBox>
                    <StyledBox mt={4}>
                      <Flex alignItems='center' justifyContent='space-between'>
                        <Box pr={2}>
                          <Typography variant='body2' fontWeight='600'>
                            Evetify for Guests
                          </Typography>
                          <Typography variant='caption' mt={1}>
                            Share with your guests to collect your wedding photos{' '}
                          </Typography>
                        </Box>
                        <StyledIcon src='https://www.WeddingWire.com/assets/img/logos/square-icon-guest.svg' />
                      </Flex>
                    </StyledBox>
                  </Grid>
                )}
              </Grid>
            </Container>
          </Box>
        </ClickAwayListener>
      )}
    </div>
  )
}

export default SimpleMenu

const StyledImg = styled('img')(() => ({
  borderRadius: '5px',
  borderTopRightRadius: '5px',
  height: '200px',
  width: '50%'
}))

const StyledIcon = styled('img')(() => ({
  borderRadius: '5px',
  borderTopRightRadius: '5px',
  height: '50px',
  width: '50px'
}))

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  padding: '1rem',
  width: '100%',
  borderRadius: '5px'
}))

const StyledTypography = styled(Typography)(() => ({
  '&:hover': {
    color: '#19b5bc'
  }
}))
