import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material'
import ItemCard from 'components/ItemCrad'
import { Centered } from 'components/design'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

interface ServiceImages {
  img1: string
  img2: string
  img3: string
  img4?: string
  img5?: string
}
export interface ServiceProps {
  id: number | string
  title: string
  location: string
  description: string
  phone: string
  email: string
  images: ServiceImages
}

const demoServiceData: ServiceProps[] = [
  {
    id: 1,
    title: 'Tech Conference',
    location: 'Convention Center',
    description: 'Explore the latest trends in technology.',
    phone: '+1 (123) 456-7890',
    email: 'john.doe@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=1',
      img2: 'https://source.unsplash.com/random/200x200?sig=2',
      img3: 'https://source.unsplash.com/random/200x200?sig=3',
      img4: 'https://source.unsplash.com/random/200x200?sig=4',
      img5: 'https://source.unsplash.com/random/200x200?sig=5'
    }
  },
  {
    id: 2,
    title: 'Art Exhibition',
    location: 'Art Gallery',
    description: 'Showcasing diverse artworks from local artists.',
    phone: '+1 (987) 654-3210',
    email: 'alice.smith@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=6',
      img2: 'https://source.unsplash.com/random/200x200?sig=7',
      img3: 'https://source.unsplash.com/random/200x200?sig=8'
    }
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    location: 'Co-working Space',
    description: 'Entrepreneurs pitch their innovative startup ideas.',
    phone: '+1 (555) 123-4567',
    email: 'ryan.patel@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=9',
      img2: 'https://source.unsplash.com/random/200x200?sig=10',
      img3: 'https://source.unsplash.com/random/200x200?sig=11'
    }
  },
  {
    id: 4,
    title: 'Science Symposium',
    location: 'Research Institute',
    description: 'Discover breakthroughs in scientific research.',
    phone: '+1 (111) 222-3333',
    email: 'emma.johnson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=12',
      img2: 'https://source.unsplash.com/random/200x200?sig=13',
      img3: 'https://source.unsplash.com/random/200x200?sig=14'
    }
  },
  {
    id: 5,
    title: 'Community Volunteer Day',
    location: 'Community Park',
    description: 'Join us for a day of community service and teamwork.',
    phone: '+1 (999) 888-7777',
    email: 'sarah.thompson@example.com',
    images: {
      img1: 'https://source.unsplash.com/random/200x200?sig=15',
      img2: 'https://source.unsplash.com/random/200x200?sig=16',
      img3: 'https://source.unsplash.com/random/200x200?sig=17'
    }
  }
]

const FavItems = () => {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const getAllEvents = async () => {
    try {
      // const response = await getAllServicesByCategoryApi()
      // setProperties(response.data)
      setServices(demoServiceData)
      // console.log('response', response)
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
        <Typography variant='subtitle1' fontWeight='600' mt={4}>
          {` 80 - Fav Item Found `}
        </Typography>
        {loading ? (
          <Centered mt={5}>
            <CircularProgress />
          </Centered>
        ) : (
          <Grid container spacing={3} mt={1}>
            {services.map(item => {
              return <ItemCard category={item} />
            })}
          </Grid>
        )}
      </Box>
    </Container>
  )
}

export default FavItems
