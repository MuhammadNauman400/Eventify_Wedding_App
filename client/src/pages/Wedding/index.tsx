import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal
} from 'react'

import styled from '@emotion/styled'
import { Box, Breadcrumbs, Container, Divider, Grid, Typography } from '@mui/material'

import * as API from 'api/userApi'
import { Link } from 'react-router-dom'
import { StyledLink } from 'components/Navbar'

const Wedding = () => {
  const [category, setCategory] = useState(null)
  const [services, setServices] = useState([])

  const getCategories = async () => {
    try {
      const response = await API.getAllCategoriesWithSubApi()
      const categories = response.data.categories

      const category = categories
        .filter((item: { category: { name: string } }) => item.category.name === 'Dresses')
        .shift()
      setCategory(category)
      //console.log('response', response)
    } catch (error) {
      /* empty */
    }
  }

  const getServices = async () => {
    try {
      const response = await API.getQueryServicesByCategory(category.category.slug)
      const data = response.data.services.results
      setServices(data)
    } catch (err) {
      /* ERROR */
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (category) {
      getServices()
    }
  }, [category])

  const data = ['a', 'b', 'c', 'd', 'e', 'f']
  return (
    <Box>
      <Container
        sx={{
          padding: '1rem'
        }}
      >
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography variant='body2'>Weddings</Typography>
          <Typography variant='body2'>Wedding Dresses</Typography>
        </Breadcrumbs>
      </Container>
      <Divider />
      <Container
        sx={{
          padding: '1rem'
        }}
      >
        <Typography pt={3} textAlign='center' variant='h4' fontWeight='bold'>
          Wedding Dress Photos
        </Typography>
        <Typography py={4} textAlign='center' variant='body1' color='#666'>
          Whether you’re looking for lace or satin, floor-length or short, off-the-shoulder or
          strapless, Evetify has over 8,000 wedding dresses to choose from. You can search for
          styles in every silhouette, including mermaid, ball gown, a-line and more. Search for
          beach or vintage-inspired wedding dresses and beyond. Evetify lists wedding dresses from
          more than 100 designers and wedding dress prices ranging from less than PKR7000 to over
          PKR50,000.
        </Typography>
        <Divider>WEDDING DRESSES BY DESIGNER</Divider>
        <Grid container spacing={4} mt={1}>
          {category
            ? category.subcategories.map(
                (
                  subcategory: {
                    icon: string
                    name:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                    slug: string
                  },
                  index: { toString: () => Key }
                ) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={2.2}
                      xl={2}
                      key={index.toString()}
                      flex={1}
                    >
                      <StyledLink to={subcategory.slug}>
                        <Box position='relative'>
                          <ImageBackground height='210px' src={subcategory.icon} />
                          <OverLay height='210px' />
                          <Container maxWidth='lg'>
                            <StyledBox height='210px'>
                              <Typography
                                variant='body2'
                                color='#fff'
                                textAlign='center'
                                fontWeight='600'
                                zIndex={9}
                              >
                                {subcategory.name}
                              </Typography>
                            </StyledBox>
                          </Container>
                        </Box>
                      </StyledLink>
                    </Grid>
                  )
                }
              )
            : null}
        </Grid>
      </Container>
      <Box py={4}>
        <Divider />
      </Box>
      <Container>
        <Grid container spacing={4} mt={1}>
          {services.map(item => {
            console.log(item.name)
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item} flex={1}>
                <Box position='relative'>
                  <ImageBackground height='300px' src={item.images[0]} />
                  <OverLay height='300px' />
                  <Container maxWidth='lg'>
                    <StyledBox height='300px'>
                      <Typography
                        variant='body2'
                        color='#fff'
                        textAlign='center'
                        fontWeight='600'
                        zIndex={9}
                      >
                        {item.name}
                      </Typography>
                    </StyledBox>
                  </Container>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Wedding

const ImageBackground = styled('img')(() => ({
  backgroundImage:
    'url(https://res.cloudinary.com/chirptech123/image/upload/v1706113109/luxurious-dinner-hall-with-large-crystal-chandelier_vpx6la.jpg)',
  position: 'absolute',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '5px'
}))

const OverLay = styled(Box)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  top: 0,
  left: 0,
  width: '100%',
  position: 'absolute',
  zIndex: 1,
  borderRadius: '5px'
}))

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: 999
}))
