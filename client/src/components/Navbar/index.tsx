import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { useViewports } from 'helpers/viewports'
import { Centered, Flex } from 'components/design'
import { styled } from '@mui/system'
import Logo from 'assets/logoHeader.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'
import { AuthState, logout } from 'store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesWithSubApi, logoutUserApi } from 'api/userApi'
import { RootState } from 'store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button, Divider, Stack } from '@mui/material'
import SimpleMenu from 'components/Menu'

const gap = {
  mobile: 2,
  laptop: 4
}

export const Navbar = () => {
  const auth = useSelector<RootState, AuthState>(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isMobile } = useViewports()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(profileAnchorEl)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState(-1)
  const [categories, setCategories] = useState([])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setProfileAnchorEl(null)
  }

  const handleLogout = async () => {
    setProfileAnchorEl(null)
    logoutUserApi()
    dispatch(logout())
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategoriesWithSubApi()
      setCategories(response.data.categories)
      //console.log('response', response)
    } catch (error) {
      /* empty */
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Box maxWidth='100%'>
      <Wrapper>
        <Container maxWidth='lg'>
          <ContentBox>
            <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
                sx={{ margin: 0, padding: 0 }}
              >
                <MenuIcon sx={{ color: '#000' }} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <Box
                  sx={{
                    width: '100vw'
                  }}
                >
                  {categories
                    .filter(item => item.category.isMenu)
                    .map(item => {
                      return (
                        <MenuItem>
                          <SimpleMenu
                            name={item.category.name}
                            subcategories={item.subcategories}
                            img={item.category.icon}
                          />
                        </MenuItem>
                      )
                    })}
                  <MenuItem onClick={handleCloseNavMenu}>
                    <StyledLink to='/services'>
                      <Typography textAlign='center'>Dresses</Typography>
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <StyledLink to='/view-jobs'>
                      <Typography textAlign='center'>Jobs</Typography>
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <StyledLink to='/contact'>
                      <Typography textAlign='center'>Contact</Typography>
                    </StyledLink>
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
            <Flex
              alignItems='center'
              justifyContent='center'
              sx={{ display: { xs: 'none', md: 'block', height: '100%' } }}
            >
              <Centered onClick={() => setActiveTab(-1)}>
                <StyledLink to='/'>
                  {
                    // <StyledLogo src={Logo} />
                  }
                  <Typography variant='h4' fontWeight={'700'} color='#19B5BC'>
                    Eventify
                  </Typography>
                </StyledLink>
              </Centered>
            </Flex>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Flex
                flex={1}
                alignItems='center'
                justifyContent='space-between'
                gap={isMobile ? gap.mobile : gap.laptop}
              >
                <>
                  <Box></Box>
                  <Menu
                    id='basic-menu'
                    anchorEl={profileAnchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <StyledLink to='/create-job'>
                      <MenuItem onClick={handleClose}>
                        <Typography textAlign='center'>Create Job</Typography>
                      </MenuItem>
                    </StyledLink>

                    <StyledLink to='/my-jobs'>
                      <MenuItem onClick={handleClose}>
                        <Typography textAlign='center'>My Job</Typography>
                      </MenuItem>
                    </StyledLink>

                    {/* {auth.isAuthenticated && (
                      <StyledLink to='/fav-services'>
                        <MenuItem onClick={handleClose}>
                          <Typography textAlign='center'>Favorite</Typography>
                        </MenuItem>
                      </StyledLink>
                    )} */}
                    {auth.role === 'vendor' && (
                      <StyledLink to='/vendor-services'>
                        <MenuItem onClick={handleClose}>
                          <Typography textAlign='center'>Manage Services</Typography>
                        </MenuItem>
                      </StyledLink>
                    )}
                    <StyledLink to='/profile'>
                      <MenuItem onClick={handleClose}>
                        <Typography textAlign='center'>Profile Setting</Typography>
                      </MenuItem>
                    </StyledLink>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign='center'>Logout </Typography>

                      <LogoutIcon sx={{ color: '#000', marginLeft: '10px' }} />
                    </MenuItem>
                  </Menu>
                  <Box sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}>
                    <Flex gap={2}>
                      {categories
                        .filter(item => item.category.isMenu)
                        .map(item => {
                          return (
                            <SimpleMenu
                              name={item.category.name}
                              subcategories={item.subcategories}
                              img={item.category.icon}
                            />
                          )
                        })}

                      <StyledTypography
                        variant='body1'
                        fontWeight={500}
                        onClick={() => {
                          navigate('/services')
                        }}
                      >
                        Dresses
                      </StyledTypography>

                      <StyledTypography
                        variant='body1'
                        fontWeight={500}
                        onClick={() => {
                          navigate('/view-jobs')
                        }}
                      >
                        Jobs
                      </StyledTypography>
                      <StyledTypography
                        variant='body1'
                        fontWeight={500}
                        onClick={() => {
                          navigate('/contact')
                        }}
                      >
                        Contact Us
                      </StyledTypography>
                    </Flex>
                  </Box>
                  {auth.isAuthenticated ? (
                    <Flex alignItems='center' gap={2}>
                      <Box onClick={handleClick}>
                        <AccountCircleIcon
                          sx={{
                            color: '#000å',
                            fontSize: '35px',
                            cursor: 'pointer',
                            marginTop: '8px'
                          }}
                        />
                      </Box>

                      <Typography variant='body1' color='#000'>
                        {auth.name}
                      </Typography>
                    </Flex>
                  ) : (
                    <Stack
                      direction='row'
                      divider={<Divider orientation='vertical' flexItem />}
                      spacing={2}
                    >
                      <StyledLink to='/login'>
                        <Button variant='outlined'>Login</Button>
                      </StyledLink>
                      <StyledLink to='/signup'>
                        <Button variant='outlined'>Signup</Button>
                      </StyledLink>
                    </Stack>
                  )}
                </>
              </Flex>
            </Box>
          </ContentBox>
        </Container>
      </Wrapper>
      <Divider />
    </Box>
  )
}

export const ContentBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.5rem 0rem'
}))

export const CustomText = styled(Box)(({ theme }) => ({
  fontWeight: '600',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.hover
  }
}))

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#000'
}))

const Wrapper = styled(Box)(() => ({
  zIndex: 999,
  padding: '0rem .5rem'
}))

const StyledLogo = styled('img')(() => ({
  height: '100%'
}))

const StyledTypography = styled(Typography)(() => ({
  '&:hover': {
    color: '#19b5bc'
  }
}))
