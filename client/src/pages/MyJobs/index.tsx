import { Box, Container, Grid, CircularProgress } from '@mui/material'
import { Centered } from 'components/design'

import BuyerRequest from 'components/BuyerRequest'
import { getMyJobs } from 'api/userApi'
import { useEffect, useState } from 'react'

const MyJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getMyJobs()
      .then(response => {
        setLoading(false)
        setJobs(response.data.jobs?.results || [])
      })
      .catch(() => {})
  }, [])

  return (
    <Container maxWidth='lg'>
      <Box pt={5} minHeight='calc(100vh - 100px)'>
        <Grid container spacing={2} mt={2}>
          {loading ? (
            <Centered mt={5}>
              <CircularProgress />
            </Centered>
          ) : (
            jobs.map(job => {
              return (
                <Grid item xs={12} md={6}>
                  <BuyerRequest {...job} />
                </Grid>
              )
            })
          )}
        </Grid>
      </Box>
    </Container>
  )
}

export default MyJobs
