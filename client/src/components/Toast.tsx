import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { closeToaster } from 'store/toast'
import { RootState } from 'store'
import { Typography } from '@mui/material'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CustomToast: React.FC = () => {
  const dispatch = useDispatch()
  const toast = useSelector((state: RootState) => state.toast)
  console.log('toast', toast)
  const handleClose = () => {
    dispatch(closeToaster())
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [toast.open])

  return (
    <>
      {toast.open === true && (
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={toast.type} sx={{ width: '100%' }}>
              <Typography variant='body2' fontWeight='600' color='#fff'>
                {toast.message}
              </Typography>
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </>
  )
}

export default CustomToast
