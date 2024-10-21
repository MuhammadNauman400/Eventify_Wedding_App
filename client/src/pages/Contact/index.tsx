import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Form } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { InputField } from 'components/InputField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import * as Yup from 'yup'
import ContactImg from 'assets/Contact.png'

import { IContactUsMessage } from 'utils/interfaces'
import { openToaster } from 'store/toast'
import * as API from 'api/userApi'

const Contact = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const initialValues = {
    subject: '',
    username: '',
    email: '',
    message: ''
  }

  const handleSubmit = async (values: IContactUsMessage, { resetForm }: { resetForm: any }) => {
    setLoading(true)
    try {
      await API.contactUs(values)
      resetForm()
      dispatch(
        openToaster({
          type: 'success',
          message: 'Conact email sent successfully'
        })
      )
    } catch (err) {
      /* error */
      openToaster({
        type: 'error',
        message: err.message
      })
    }
    setLoading(false)
  }
  const validationSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    username: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    message: Yup.string().required('Message is required')
  })
  return (
    <Container maxWidth='md'>
      <Centered py={5}>
        <StyledBox width={isLaptop ? '100%' : '400px'}>
          <Grid container>
            {isLaptop && (
              <Grid item md={6}>
                <ImageBackground src={ContactImg} />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Centered pt={3} minHeight='80vh'>
                <Box p={4} maxWidth='450px' width='100%'>
                  <Typography variant='h3' color='primary' fontWeight='bold' textAlign='center'>
                    Send us message
                  </Typography>
                  <Typography
                    variant={'body2'}
                    fontWeight='500'
                    color='#666'
                    textAlign='center'
                    mb={5}
                    mt={1}
                  >
                    we would love to hear
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ submitForm }) => {
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='username' label={'Full Name'} />
                            <InputField name='subject' label={'Subject'} />

                            <InputField name='email' label={'Email'} />

                            <InputField multiline rows={10} name='message' label={'Message'} />
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
                                  Send Message
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

export default Contact

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  minHeight: '70vh'
}))

const ImageBackground = styled('img')(() => ({
  height: '100%',
  minHeight: '70vh',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))
