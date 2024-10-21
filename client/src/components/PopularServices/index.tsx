import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import ItemCard from 'components/ItemCrad'
import { Centered } from 'components/design'
import { useEffect, useState } from 'react'
import * as API from 'api/userApi'

export interface ServiceProps {
  id: number | string
  name: string
  location: {
    address: string
    lat: number
    lng: number
  }
  description: string
  email: string
  images: string[]
  phone?: string
  rating: number
}

const PopularService = () => {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [loading, setLoading] = useState(false)

  // const { id } = useParams()

  const getAllEvents = async () => {
    try {
      const response = await API.getPopularServices()
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
        <Typography variant='h4' fontWeight='600' mt={4}>
          Popular Services
        </Typography>
        {loading ? (
          <Centered mt={5}>
            <CircularProgress />
          </Centered>
        ) : (
          <Grid container spacing={3} mt={1}>
            {services.slice(0, 4).map(item => {
              return <ItemCard category={item} />
            })}
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default PopularService
