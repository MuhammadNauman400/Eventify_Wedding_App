import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import { getAllCategoriesWithSubApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { createJobApi } from 'api/userApi'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useViewports } from 'helpers/viewports'

export interface CreateJobProps {
  title: string
  description: string
  priceFrom: number
  priceTo: number
  category: string
  address: string
  lat: number
  lng: number
}

const CreateJob = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const initialValues: CreateJobProps = {
    title: '',
    description: '',
    priceFrom: 0,
    priceTo: 0,
    category: '',
    address: '',
    lat: 0,
    lng: 0
  }

  const jobValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title must required.'),
    description: Yup.string().required('Description must required.'),
    category: Yup.string().required('Category must required.'),
    priceFrom: Yup.number().required('Min Price required.'),
    priceTo: Yup.number().required('Max Price required.'),
    address: Yup.string().required('Address must required.')
  })

  const handleSubmit = async (values: CreateJobProps) => {
    setLoading(true)
    try {
      await createJobApi({
        title: values.title,
        description: values.description,
        category: values.category,
        minPrice: values.priceFrom,
        maxPrice: values.priceTo,
        address: values.address,
        lat: values.lat,
        lng: values.lng
      })
      navigate('/my-jobs')
    } catch (err) {
      /* empty */
    }
    setLoading(false)
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategoriesWithSubApi()
      const options = response.data.categories.map((item: any) => {
        return { title: item.category.name, key: item.category.id }
      })
      setCategories(options)

      console.log('response', response)
    } catch (error) {
      /* empty */
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container maxWidth='md'>
      <Centered py={5}>
        <StyledBox width={isLaptop ? '100%' : '400px'}>
          <Grid container>
            {isLaptop && (
              <Grid item md={6}>
                <ImageBackground />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Centered pt={3} minHeight='80vh'>
                <Box p={4} maxWidth='450px' width='100%'>
                  <Typography variant='h4' color='primary' fontWeight='bold' textAlign='center'>
                    Welcome!
                  </Typography>
                  <Typography
                    variant={'body2'}
                    fontWeight='500'
                    color='#666'
                    textAlign='center'
                    mb={4}
                    mt={1}
                  >
                    Let's create a job
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={jobValidationSchema}
                  >
                    {({ submitForm, setFieldValue }) => {
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      const { ref: materialRef } = usePlacesWidget({
                        apiKey: 'AIzaSyBL4JbKL4SotWhSAnoYflXy9fnHrmT52Lg',
                        onPlaceSelected: place => {
                          const address = place.formatted_address
                          const lat = place.geometry.location.lat()
                          const lng = place.geometry.location.lng()
                          setFieldValue('address', address)
                          setFieldValue('lat', lat)
                          setFieldValue('lng', lng)
                        },
                        inputAutocompleteValue: 'country'
                      })
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='title' label={'Title'} />
                            <InputField name='description' label={'Description'} />
                            <SelectField name='category' label='Category' options={categories} />
                            <InputField name='priceFrom' type='number' label={'Starting Price'} />
                            <InputField
                              name='priceTo'
                              type='number'
                              label={'Maximum Price Limit'}
                            />
                            <TextField
                              label='Location'
                              fullWidth
                              color='secondary'
                              variant='outlined'
                              inputRef={materialRef}
                            />
                          </Flex>
                          <Box mt={4}>
                            <Button fullWidth size='large' variant='contained' onClick={submitForm}>
                              {loading ? (
                                <CircularProgress sx={{ color: '#fff' }} />
                              ) : (
                                <Typography
                                  variant={'subtitle2'}
                                  color='#fff'
                                  textTransform='capitalize'
                                  fontWeight='bold'
                                >
                                  Create Job
                                </Typography>
                              )}
                            </Button>
                          </Box>
                        </Form>
                      )
                    }}
                  </Formik>
                </Box>
              </Centered>
            </Grid>
          </Grid>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default CreateJob

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  minHeight: '70vh'
}))

const ImageBackground = styled('img')(() => ({
  backgroundImage:
    'url(https://freepixels.com/wp-content/uploads/Architecture/090223a6449-wood-house-construction-yard-new.jpg)',
  height: '100%',
  minHeight: '70vh',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))
