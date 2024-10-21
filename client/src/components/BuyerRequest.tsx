import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Grid, Modal, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Flex } from './design'
import { useState } from 'react'
import { Formik } from 'formik'
import { Form } from 'react-router-dom'
import { InputField } from './InputField'
import * as Yup from 'yup'
import { contactJobProposal } from 'api/userApi'
import { openToaster } from 'store/toast'
import { useDispatch } from 'react-redux'

const BuyerRequest = (props: any) => {
  const initialLimit = 30
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [limit, setLimit] = useState(initialLimit)
  const [loading, setLoading] = useState(false)

  const handleToggleContent = () => {
    setLimit(prevLimit => (prevLimit === initialLimit ? Infinity : initialLimit))
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
  }
  const getContentPreview = (text: string) => {
    const words = text.split(' ')
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '')
  }

  const initialValues = {
    message:
      'Hey there! We love your work and are interested in learning more about your services for our wedding.',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  const loginValidationSchema = Yup.object().shape({
    message: Yup.string().required(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().required()
  })

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      const data = {
        jobId: props.id,
        message: values.message,
        firstname: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber
      }
      await contactJobProposal(data)
      dispatch(
        openToaster({
          type: 'success',
          message: 'Proposal email sent successfully'
        })
      )
    } catch (err) {
      dispatch(
        openToaster({
          type: 'error',
          message: 'Proposal email sent Fail'
        })
      )
    }
    setLoading(false)
  }
  return (
    <StyledBox>
      <Flex alignItems='center' justifyContent='space-between' gap={2}>
        <Flex gap={2} alignItems='center'>
          <AccountCircleIcon
            sx={{
              fontSize: '55px',
              color: '#666666'
            }}
          />
          <Box>
            <Typography variant='subtitle2' color='#555' fontWeight='600'>
              {props.createdBy.name}
            </Typography>
            <Typography variant='caption' color='#555' fontWeight='400'>
              {props.createdAt}
            </Typography>
          </Box>
        </Flex>
        <Flex flexDirection='column'>
          <Typography variant='body1' fontWeight='bold' color='#666' textAlign='center'>
            {props.category.name}
          </Typography>
          <Typography variant='caption' fontWeight='500' color='#666' textAlign='end'>
            {props.address}
          </Typography>
        </Flex>
      </Flex>
      <Typography variant='subtitle2' color='#444' fontWeight='700' mt={2}>
        {props.title}
      </Typography>
      <Typography variant='body2' color='#777' pb={2} pt={1}>
        {getContentPreview(props.description)}
        <Button color='primary' size='small' onClick={handleToggleContent}>
          {limit === initialLimit ? 'Read More' : 'Read Less'}
        </Button>
      </Typography>

      <Flex mt={2} gap={3} justifyContent='space-between'>
        <Box>
          <Typography variant='subtitle2' fontWeight='700' color='#666'>
            PKR {props.minPrice} - PKR {props.maxPrice}
          </Typography>
        </Box>
        <Button variant='contained' color='primary' onClick={handleOpen}>
          <Typography variant='body2' color='#fff'>
            Contact User
          </Typography>
        </Button>
      </Flex>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={loginValidationSchema}
            >
              {({ submitForm, errors }) => {
                console.log(errors)
                return (
                  <Form>
                    <Typography variant={'subtitle1'} fontWeight='700' my={1}>
                      Message vendor
                    </Typography>
                    <Typography variant={'body2'} fontWeight='400' mt={1} pb={3}>
                      Fill out the form below to request information.
                    </Typography>
                    <Flex flexDirection='column' gap={2}>
                      <InputField name='message' multiline={true} rows={5} label={'Message'} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <InputField name='firstName' label={'First Name'} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <InputField name='lastName' label={'Last Name'} />
                        </Grid>
                      </Grid>
                      <InputField name='email' label={'Email'} />
                      <InputField name='phoneNumber' label={'Phone number'} />
                    </Flex>
                    <Box mt={4}>
                      <Box pb={2}>
                        <Typography variant={'caption'} fontWeight='400'>
                          By clicking 'Send', I agree to Evetify Privacy Policy and Terms of use
                        </Typography>
                      </Box>
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
                            Send
                          </Typography>
                        )}
                      </Button>
                    </Box>
                  </Form>
                )
              }}
            </Formik>
          </Box>
        </Modal>
      </div>
    </StyledBox>
  )
}

export default BuyerRequest

export const StyledBox = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  padding: '1.5rem',
  borderRadius: '5px',
  background: '#fff'
}))

export const CustomTag = styled(Box)(() => ({
  padding: '.5rem 1rem',
  color: '#666666',
  fontSize: '1rem',
  borderRadius: '5px',
  display: 'inline-block',
  background: '#19b5bc'
}))
