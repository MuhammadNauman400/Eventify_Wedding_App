import { Box } from '@mui/material'
import Footer from 'components/Footer'
import { Navbar } from 'components/Navbar'
import { Outlet } from 'react-router'

const PublicLayout = () => {
  return (
    <Box
      sx={{
        background: '#fff',
        maxWidth: '100vw',
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default PublicLayout
