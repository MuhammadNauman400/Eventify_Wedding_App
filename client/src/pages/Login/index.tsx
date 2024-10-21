import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { loginUserApi } from 'api/userApi'
import { InputField } from 'components/InputField'
import { Centered, Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Link, useNavigate } from 'react-router-dom'
import { setUser } from 'store/auth'
import * as Yup from 'yup'

export interface LoginProps {
  password: string
  email: string
}
const Login = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialValues: LoginProps = {
    password: '',
    email: ''
  }

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required.')
  })

  const handleSubmit = async (values: LoginProps) => {
    setLoading(true)
    try {
      const response = await loginUserApi(values)
      console.log('response', response)
      dispatch(setUser({ ...response.data }))
      navigate('/')
    } catch (error) {
      console.log('Login Error', error)
    }
    setLoading(false)
  }
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
                    Welcome Back!
                  </Typography>
                  <Typography variant={'subtitle2'} fontWeight='600' textAlign='center' my={3}>
                    Log in to your account
                  </Typography>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={loginValidationSchema}
                  >
                    {({ submitForm }) => {
                      return (
                        <Form>
                          <Flex flexDirection='column' gap={2}>
                            <InputField name='email' label={'Email'} />
                            <InputField name='password' type='password' label={'Password'} />
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
                                  Login
                                </Typography>
                              )}
                            </Button>
                          </Box>
                        </Form>
                      )
                    }}
                  </Formik>
                  <Typography variant={'body1'} color='secondary' mt={4} textAlign='center'>
                    Not a member yet? <StyledLink to='/signup'> Join now</StyledLink>
                  </Typography>
                </Box>
              </Centered>
            </Grid>
          </Grid>
        </StyledBox>
      </Centered>
    </Container>
  )
}

export default Login

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  minHeight: '70vh'
}))

const ImageBackground = styled('img')(() => ({
  backgroundImage: 'url(https://wallpapercave.com/wp/wp7488460.jpg)',
  height: '100%',
  minHeight: '70vh',
  width: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}))
