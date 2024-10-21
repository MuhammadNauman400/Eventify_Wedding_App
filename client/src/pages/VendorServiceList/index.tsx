import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Centered } from 'components/design'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getMyServices } from 'api/userApi'

interface IFaq {
  question: string
  answer: string
}
export interface ServiceProps {
  id: number | string
  name: string
  description: string
  images: string[]
  category: string
  subcategory: string
  location: {
    address: string
    lat: number
    lng: number
  }
  createdBy: string
  faqs?: IFaq[]
  rating: number
  // images: ServiceImages
}

const MyService = ({ list = [] }: { list: any }) => {
  const navigate = useNavigate()
  const initialLimit = 30
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [limit, setLimit] = useState(initialLimit)

  const handleClick = (item: ServiceProps) => {
    navigate(`/view-service/${item.id}`)
  }

  const handleToggleContent = () => {
    setLimit(prevLimit => (prevLimit === initialLimit ? Infinity : initialLimit))
  }

  const getContentPreview = (text: string) => {
    const words = text.split(' ')
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '')
  }
  return list.map((item: any) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} flex={1}>
      <CardBox>
        <Centered>
          <StyledImg src={item.images[0]} alt='profile img' />
        </Centered>

        <Typography variant='subtitle1' pt={1} fontWeight='bold'>
          {item.name}
        </Typography>

        <Typography variant='body2' fontWeight='400' color='primary'>
          {item.location.address}
        </Typography>

        <Typography variant='body2' color='#777' pb={2} pt={1}>
          {getContentPreview(item.description)}
          <Button color='primary' size='small' onClick={handleToggleContent}>
            {limit === initialLimit ? 'Read More' : 'Read Less'}
          </Button>
        </Typography>

        <Button variant='outlined' color='primary' fullWidth onClick={() => handleClick(item)}>
          View More
        </Button>
      </CardBox>
    </Grid>
  ))
}

const VendorServiceList = () => {
  const [services, setServices] = useState<ServiceProps[]>([])

  const getAllEvents = async () => {
    try {
      const response = await getMyServices()
      const services = response.data.services.results
      setServices(services)
    } catch (error) {
      // console.log('error', error)
    }
  }

  useEffect(() => {
    getAllEvents()
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box mb={5}>
        <Grid container alignItems='center' mt={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' fontWeight='600'>
              My Services
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledLink to='/create-service'>
              <Button variant='outlined'>Add New Service</Button>
            </StyledLink>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
          <MyService list={services} />
        </Grid>

        {/* <Flex justifyContent='space-between' my={4}>
            <PaginationButton
              currentPage={currentPage}
              onChange={handleChange}
            />
          </Flex> */}
      </Box>
    </Container>
  )
}

export default VendorServiceList

export const CardBox = styled(Box)(() => ({
  display: 'grid',
  alignItems: 'center',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  padding: '.8rem',
  border: '1px solid #fff',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  height: '100%',
  flex: 1
}))

export const StyledImg = styled('img')(() => ({
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  height: '200px',
  width: '100%'
}))

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: '#000',
  display: 'flex',
  justifyContent: 'flex-end'
}))
