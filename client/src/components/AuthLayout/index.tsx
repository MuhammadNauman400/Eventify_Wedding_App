import { Box } from '@mui/material'
import Footer from 'components/Footer'
import { Navbar } from 'components/Navbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { RootState } from 'store'
import { AuthState, logout } from 'store/auth'

const Layout = () => {
  const state = useSelector<RootState, AuthState>(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.isAuthenticated) {
      dispatch(logout)
      navigate('/login')
    }
  }, [state.isAuthenticated, dispatch, navigate])

  return (
    <Box
      sx={{
        background: '#fff',
        maxWidth: '100vw',
        height: '100%',
        minHeight: '100vh',
    
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default Layout
