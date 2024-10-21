/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  TextField
} from '@mui/material'
import { styled } from '@mui/system'
import uploadToCloudinary from 'api/cloudnairy'
import { createNewServiceApi, getAllCategoriesWithSubApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'
import { openToaster } from 'store/toast'
import { usePlacesWidget } from 'react-google-autocomplete'

export interface CreateServiceProps {
  name: string
  category: string
  description: string
  subCategory: string
  faq1: string
  faqAnswer1: string
  faq2: string
  faqAnswer2: string
  address: string
  lat: number
  lng: number
}

const CreateService = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [allData, setAllData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [catLoading, setCatLoading] = useState(false)
  const dispatch = useDispatch()
  const [selectedFiles, setSelectedFiles] = useState([])
  const navigate = useNavigate()

  const initialValues: CreateServiceProps = {
    name: '',
    category: '',
    description: '',
    subCategory: '',
    faq1: '',
    faqAnswer1: '',
    faq2: '',
    faqAnswer2: '',
    address: '',
    lat: 0,
    lng: 0
  }

  // const CreateServiceValidationSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   category: Yup.string().required('category is required'),
  //   description: Yup.string().required('description is required'),
  //   subCategory: Yup.string().required('subCategory is required'),
  //   faq1: Yup.string().required('This field is required'),
  //   faqAnswer1: Yup.string().required('This field is required'),
  //   faq2: Yup.string().required('This field is required'),
  //   faqAnswer2: Yup.string().required('This field is required')
  // })

  const getCategories = async () => {
    setCatLoading(true)
    try {
      const response = await getAllCategoriesWithSubApi()
      setAllData(response.data.categories)
      const data = response.data.categories.map((item: any) => {
        return { title: item.category.name, key: item.category.id }
      })
      setCategories(data)
    } catch (error) {
      /* empty */
    }
    setCatLoading(false)
  }

  const subCategoryData = useMemo(() => {
    if (allData.length > 0 && selectedCategory !== '') {
      return allData.flatMap(item => {
        if (item.category.id === selectedCategory) {
          return item.subcategories.map((sub: any) => ({
            title: sub.name,
            key: sub.id
          }))
        }
        return []
      })
    }
    return []
  }, [allData, selectedCategory])

  const handleSubmit = async (values: CreateServiceProps) => {
    if (selectedFiles.length !== 0) {
      setLoading(true)
      try {
        const metaData = await Promise.all(
          selectedFiles.map(item => {
            return uploadToCloudinary(item)
          })
        )
        const formData = {
          name: values.name,
          description: values.description,
          images: metaData,
          category: values.category,
          subcategory: values.subCategory,
          location: {
            address: values.address,
            lat: values.lat,
            lng: values.lng
          },
          faqs: [
            {
              question: values.faq1,
              answer: values.faqAnswer2
            },
            {
              question: values.faq2,
              answer: values.faqAnswer2
            }
          ]
        }
        await createNewServiceApi(formData)
        navigate('/vendor-services')
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    } else {
      dispatch(
        openToaster({
          type: 'error',
          message: 'No Image uploaded'
        })
      )
      return
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const files = event.target.files

    // Validate the number of selected files
    if (files.length < 3 || files.length > 5) {
      dispatch(
        openToaster({
          type: 'error',
          message: 'file limit is between is 3 to 5'
        })
      )
      event.target.value = null // Clear the file input
    } else {
      setSelectedFiles(Array.from(files))
    }
  }

  // const handleValues = (values: any) => {
  //   // const subcategories = categories.filter(ct => {
  //   //   if (ct.category.id === values.category) {
  //   //     return ct.subcategories.map((sct: any) => {
  //   //       return {
  //   //         title: sct.name,
  //   //         key: sct.id
  //   //       }
  //   //     })
  //   //   }
  //   // })
  //   // setSubcategories(subcategories)
  // }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Container maxWidth='lg'>
      <Centered py={5}>
        <StyledBox width={isLaptop ? '100%' : '400px'} maxWidth='1200px'>
          <Grid container>
            {isLaptop && (
              <Grid item md={5}>
                <ImageBackground />
              </Grid>
            )}
            <Grid item xs={12} md={7}>
              <Centered minHeight='80vh'>
                <Box p={4} width='100%'>
                  <Typography
                    variant='h3'
                    color='primary'
                    fontWeight='bold'
                    textAlign='center'
                    pb={4}
                  >
                    Create your Service
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    // validationSchema={CreateServiceValidationSchema}
                  >
                    {({ submitForm, errors, handleChange, setFieldValue }) => {
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
                      console.log('errors', errors)
                      return (
                        <Form>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6} alignItems='space-between' flex={1}>
                              <InputField name='name' label={'Name'} />
                              <Box mt={2}>
                                <SelectField
                                  name='category'
                                  label='Category'
                                  options={categories}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    handleChange(event)
                                    setSelectedCategory(event.target.value)
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <InputField
                                name='description'
                                label={'Description'}
                                multiline
                                rows={4}
                              />
                            </Grid>
                          </Grid>

                          <Box mt={2}>
                            <input
                              style={{
                                width: '100%',
                                padding: '1rem',
                                margin: '.5rem 0rem',
                                border: '1px solid #000'
                              }}
                              type='file'
                              multiple
                              onChange={handleFileChange}
                              id='file-input'
                            />

                            {/* <Box>
                              <Typography variant='subtitle1'>
                                <strong>Selected Files:</strong>
                              </Typography>
                              <List>
                                {selectedFiles.map((file, index) => (
                                  <ListItem key={index}>
                                    <Typography variant='body1'>{file.name}</Typography>
                                  </ListItem>
                                ))}
                              </List>
                            </Box> */}
                          </Box>
                          <Flex flexDirection='column' gap={2}>
                            <Box>
                              {subCategoryData.length > 0 && (
                                <SelectField
                                  name='subCategory'
                                  label='Sub Category'
                                  options={subCategoryData}
                                />
                              )}
                            </Box>
                            <TextField
                              label='Location'
                              fullWidth
                              color='secondary'
                              variant='outlined'
                              inputRef={materialRef}
                            />
                            <InputField name='faq1' label={'Frequently Asked Question 1'} />
                            <InputField name='faqAnswer1' label={'Answer'} multiline rows={3} />
                            <InputField name='faq2' label={'Frequently Asked Question 2'} />
                            <InputField name='faqAnswer2' label={'Answer'} multiline rows={3} />
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
                                  Create Service
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

export default CreateService

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
