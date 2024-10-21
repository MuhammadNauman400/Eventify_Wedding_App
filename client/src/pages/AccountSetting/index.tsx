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
import { InputField } from 'components/InputField'
import { Flex } from 'components/design'
import { Formik } from 'formik'
import { useViewports } from 'helpers/viewports'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import { countries } from 'countries-list'
import * as Yup from 'yup'
import { SelectField } from 'components/SelectField'
import { usePlacesWidget } from 'react-google-autocomplete'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export interface AccountSettingProps {
  password: string
  email: string
  name: string
  address: {
    country: string
    city: string
  }
  role: string
  phone: string
}
const AccountSetting = () => {
  const { isLaptop } = useViewports()
  const [loading, setLoading] = useState(false)
  const { ref: materialRef } = usePlacesWidget({
    apiKey: 'AIzaSyBL4JbKL4SotWhSAnoYflXy9fnHrmT52Lg',
    onPlaceSelected: place => console.log(place),

    inputAutocompleteValue: 'country'
  })
  const initialValues: AccountSettingProps = {
    name: '',
    email: '',
    password: '',
    address: {
      country: '',
      city: ''
    },
    phone: '',
    role: 'buyer'
  }
  console.log('countries', countries)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, and be at least 8 characters long'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    address: Yup.object().shape({
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required')
    }),
    role: Yup.string().required('Role is required')
  })

  const handleSubmit = async (values: AccountSettingProps) => {}

  const { isMobile } = useViewports()

  return (
    <Container
      maxWidth='md'
      sx={{
        minHeight: 'calc(100vh - 100px)'
      }}
    >
      <StyledBox width='100%'>
        <Box p={4} width='100%'>
          <Typography variant='h4' color='#666666' fontWeight='bold' textAlign='center' py={3}>
            Profile Setting
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ submitForm, values }) => {
              return (
                <Form>
                  <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={6}>
                      <Flex gap={2} alignItems='center'>
                        <AccountCircleIcon
                          sx={{
                            fontSize: '145px',
                            color: '#666666'
                          }}
                        />
                        <Box>
                          <Typography variant='subtitle1' color='#555' fontWeight='800'>
                            Usama
                          </Typography>
                          <Typography variant='caption' color='#555' fontWeight='400'>
                            20 April 2000
                          </Typography>
                        </Box>
                      </Flex>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Flex flexDirection='column' gap={3} mt={2} justifyContent='center'>
                        <InputField name='firstName' label={'First Name'} />
                        <InputField name='lastName' label={'Last Name'} />
                      </Flex>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputField name='email' label={'Email'} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SelectField
                        name='role'
                        options={[
                          { title: 'Buyer', key: 'buyer' },
                          { title: 'Vendor', key: 'vendor' }
                        ]}
                        label='Role'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label='Location'
                        fullWidth
                        color='secondary'
                        variant='outlined'
                        inputRef={materialRef}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField name='password' type='password' label={'Password'} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputField
                        name='confirmPassword'
                        type='password'
                        label={'Confirm Password'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputField name='bio' type='text' label={'Bio'} multiline rows={5} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {values.role === 'vendor' && (
                        <InputField name='phone' label={'Phone Number'} />
                      )}
                    </Grid>
                  </Grid>

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
                          Update Info
                        </Typography>
                      )}
                    </Button>
                  </Box>
                </Form>
              )
            }}
          </Formik>
        </Box>
      </StyledBox>
    </Container>
  )
}

export default AccountSetting

const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  width: '100%',
  marginTop: '3rem'
}))
