/* eslint-disable */

import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { useViewports } from 'helpers/viewports'
import { useEffect, useState } from 'react'
import { getAllCategoriesApi } from 'api/userApi'
import { Centered, Flex } from 'components/design'
import { Link } from 'react-router-dom'
import PopularService from 'components/PopularServices'
import BuyerRequest from 'components/BuyerRequest'
import Carousel from 'react-material-ui-carousel'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import * as API from 'api/userApi'

interface Category {
  name: string
  description: string
  icon: string
  slug: string
  parent: string
  id: string
}
const Home = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const getCategories = async () => {
    setLoading(true)
    try {
      const response = await getAllCategoriesApi({ sub: true })
      setCategories(response.data.categories)
      console.log('getAllCategoriesApi', response)
    } catch (error) {
      /* empty */
    }
    setLoading(false)
  }

  useEffect(() => {
    getCategories()
    API.getPopularJobs()
      .then(response => {
        const jobs = response.data.jobs?.results || []
        const crousalJobs = []
        for (let i = 0; i < jobs.length / 2; i++) {
          crousalJobs.push([jobs[i], jobs[i + 1]])
        }

        setJobs(crousalJobs)
      })
      .catch(() => {})
  }, [])

  const Forums = [
    {
      label: 'Wedding dress',
      text: 'Hello, This is going to be my 3rd marriage and I wanted input and what type of wedding dress to buy. Not sure If I want...',
      date: 'on February 2, 2024 at 12:18 PM',
      name: 'Kris'
    },
    {
      label: 'Wedding dress',
      text: 'Hello, This is going to be my 3rd marriage and I wanted input and what type of wedding dress to buy. Not sure If I want...',
      date: 'on February 2, 2024 at 12:18 PM',
      name: 'Kris'
    },
    {
      label: 'Wedding dress',
      text: 'Hello, This is going to be my 3rd marriage and I wanted input and what type of wedding dress to buy. Not sure If I want...',
      date: 'on February 2, 2024 at 12:18 PM',
      name: 'Kris'
    },
    {
      label: 'Wedding dress',
      text: 'Hello, This is going to be my 3rd marriage and I wanted input and what type of wedding dress to buy. Not sure If I want...',
      date: 'on February 2, 2024 at 12:18 PM',
      name: 'Kris'
    }
  ]

  const { isLaptop } = useViewports()
  return (
    <Box>
      {/* <Container maxWidth='lg'>
        <Grid container flexDirection={isLaptop ? 'row' : 'column-reverse'}>
          <Grid item xs={12} md={6}>
            <StyledBox isLaptop={isLaptop}>
              <Typography variant='h4' fontWeight='bold'>
                Let's find your wedding team
              </Typography>
              <Typography
                variant={isLaptop ? 'subtitle2' : 'body1'}
                my={2}
                fontWeight='400'
                maxWidth='450px'
                textAlign={isLaptop ? 'start' : 'center'}
              >
                Search over 250,000 local professionals with reviews, pricing, availability, and
                more
              </Typography>
              <TextField
                sx={{
                  marginTop: '1rem'
                }}
                variant='outlined'
                label='Search here.'
                InputProps={{
                  endAdornment: (
                    <IconButton size='large'>
                      <SearchIcon />
                    </IconButton>
                  )
                }}
              />
            </StyledBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageBackground isLaptop={isLaptop} />
          </Grid>
        </Grid>
      </Container> */}
      <Box position='relative'>
        <ImageBackground />
        <OverLay />
        <Container maxWidth='lg'>
          <StyledBox height='70vh'>
            <Typography variant='h3' color='#fff' fontWeight='bold' zIndex={9}>
              Let's find your wedding team
            </Typography>
            <Typography
              variant={isLaptop ? 'subtitle2' : 'body2'}
              color='#fff'
              zIndex={999}
              my={2}
              fontWeight='400'
              maxWidth={isLaptop ? '600px' : '320px'}
            >
              Search over 250,000 local professionals with reviews, pricing, availability, and more
            </Typography>
            {/* <TextField
              sx={{
                marginTop: '1rem',
                zIndex: 9,
                // maxWidth: '400px',
                maxWidth: isLaptop ? '400px' : '300px'
              }}
              color='warning'
              variant='outlined'
              focused
              label='Search here.'
              InputProps={{
                style: { color: '#ffff' },
                endAdornment: (
                  <IconButton size='large'>
                    <SearchIcon sx={{ color: '#ff9800' }} />
                  </IconButton>
                )
              }}
            /> */}
          </StyledBox>
        </Container>
      </Box>
      <Container maxWidth='lg'>
        <Box
          sx={{
            position: 'relative',
            bottom: 120
          }}
          zIndex={999}
        >
          {/* {isMobile ? (
            <Carousel
              autoPlay
              interval={3000}
              stopAutoPlayOnHover
              animation='slide'
              duration={800}
              indicators={false}
            >
              
            </Carousel>
          ) : ( */}
          <Carousel
            autoPlay
            interval={3000}
            stopAutoPlayOnHover
            animation='slide'
            duration={800}
            indicators={false}
          >
            {loading ? (
              <>
                <Centered mt={5}>
                  <CircularProgress />
                </Centered>
              </>
            ) : (
              jobs.map(jobs => {
                return (
                  <Box p={2}>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} md={6}>
                        <BuyerRequest {...jobs[0]} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <BuyerRequest {...jobs[1]} />
                      </Grid>
                    </Grid>
                  </Box>
                )
              })
            )}
          </Carousel>
          {/* // )} */}

          <Box>
            <Typography variant='h4' fontWeight='bold' mt={4}>
              Find every vendor you need
            </Typography>
            <Typography variant={isLaptop ? 'body1' : 'body2'} fontWeight='400' mt={2}>
              Connect with seasoned wedding pros to help bring your day to life.
            </Typography>
            {loading ? (
              <Centered mt={5}>
                <CircularProgress />
              </Centered>
            ) : (
              <Box pb={4}>
                <Grid container spacing={2} p={2} my={2}>
                  {categories.slice(0, 4).map(item => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} flex={1}>
                        <StyledLink
                          to={{
                            pathname: `services/${item.slug}`
                          }}
                          state={{
                            img: item.icon,
                            name: item.name
                          }}
                        >
                          <CardBox>
                            <Box position='relative'>
                              <StyledImg src={item.icon} alt='card img' />
                            </Box>

                            <Typography variant='subtitle2' fontWeight='bold' mt={3} pb={2}>
                              {item.name}
                            </Typography>
                            <Typography
                              variant={isLaptop ? 'body2' : 'body1'}
                              color='secondary'
                              fontWeight='400'
                            >
                              {item.description}
                            </Typography>
                          </CardBox>
                        </StyledLink>
                      </Grid>
                    )
                  })}
                </Grid>
                <Flex flexWrap='wrap'>
                  {categories.map(item => (
                    <StyledLink to={`services/${item.slug}`}>
                      <CategoryBlocks variant='body2'>{item.name}</CategoryBlocks>
                    </StyledLink>
                  ))}
                  <StyledLink to={`services/all`}>
                    <CategoryBlocks variant='body2'>View All</CategoryBlocks>
                  </StyledLink>
                </Flex>
              </Box>
            )}
          </Box>

          <PopularService />
          <Box px={3}>
            <Typography variant='subtitle1' fontWeight='700' mt={2}>
              Forums
            </Typography>
            <Typography variant='body1' color='#7777' fontWeight='500' mt={1}>
              Ask questions and get answers with support from other engaged couples.
            </Typography>
          </Box>
          <Grid container spacing={2} mt={1} px={2}>
            {Forums.map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.label} flex={1}>
                <Box>
                  <CardBox mr={3}>
                    <Typography variant='subtitle1' fontWeight='700'>
                      {item.label}
                    </Typography>
                    <Typography my={2} variant='body2' color='#666' fontWeight='400'>
                      {item.text}
                    </Typography>
                  </CardBox>
                  <Flex gap={2} alignItems='center' mt={3}>
                    <AccountCircleIcon
                      sx={{
                        fontSize: '55px',
                        color: '#666666'
                      }}
                    />
                    <Box>
                      <Typography variant='subtitle2' color='#555' fontWeight='600'>
                        {item.name}
                      </Typography>
                      <Typography variant='caption' color='#555' fontWeight='400'>
                        {item.date}
                      </Typography>
                    </Box>
                  </Flex>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box
        sx={{
          background: '#f8f8f8',
          padding: '3rem 0rem',
          marginTop: '3rem'
        }}
      >
        <Container>
          <Typography variant='h4' fontWeight='bold' textAlign='center'>
            Why us?
          </Typography>
          <Typography variant='body2' fontWeight='400' mt={2}>
            With the largest network of local wedding vendors, Evetify offers the most comprehensive
            wedding site out there. You will be able to find the best vendor for your budget and
            plan your wedding exactly the way you envisioned it. We make it simple to get the
            pricing, availability, and answers you need from wedding venues and wedding vendors
            across every town.
          </Typography>
          <Typography variant='body2' fontWeight='400' mt={2}>
            In addition to the wedding industry’s best and brightest wedding vendors, Evetify offers
            free, easy-to-use wedding planning tools like customizable wedding checklists to keep
            your tasks in order, wedding websites with designs made just for you and a comprehensive
            wedding registry for all your guests. You can stay on top of all the details while
            on-the-go with the Evetify app, which features a wedding countdown to your big day.
          </Typography>
          <Typography variant='body2' fontWeight='400' mt={2}>
            Meanwhile, our dedicated team of editors provides you with the very best wedding ideas
            and curated wedding photos filled with inspiration to help you choose between florists,
            cakes, photographers and wedding venues when you start planning the details. Evetify
            will help turn your vision into a reality!
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Home

const ImageBackground = styled('img')(() => ({
  backgroundImage:
    'url(https://res.cloudinary.com/chirptech123/image/upload/v1706113109/luxurious-dinner-hall-with-large-crystal-chandelier_vpx6la.jpg)',
  height: '70vh',
  position: 'absolute',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

const OverLay = styled(Box)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  top: 0,
  left: 0,
  width: '100%',
  height: '70vh',
  position: 'absolute',
  zIndex: 1
}))

export const CardBox = styled(Box)(() => ({
  padding: '.8rem',
  border: '1px solid #fff',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  borderRadius: '5px',
  height: '100%',
  cursor: 'pointer'
}))

export const StyledImg = styled('img')(() => ({
  height: '200px',
  width: '100%',
  borderRadius: '5px'
}))

const StyledBox = styled(Box)(() => ({
  // height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: 999
}))

const CategoryBlocks = styled(Typography)(() => ({
  border: '1px solid black',
  borderRadius: '5px',
  padding: '10px 20px',
  margin: '1rem .5rem 0rem .5rem',
  display: 'inline-block',
  cursor: 'pointer'
}))

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#000'
}))
