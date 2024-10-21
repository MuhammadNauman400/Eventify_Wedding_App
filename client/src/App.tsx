import { CssBaseline, ThemeProvider } from '@mui/material'
import { CustomTheme, ThemeVariantsProps } from 'theme'
import { useMemo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home'
import AuthLayout from 'components/AuthLayout'
import Signup from 'pages/Signup'
import Login from 'pages/Login'
import CustomToast from 'components/Toast'
import ServiceList from 'pages/ServiceList'
import ViewService from 'pages/ViewService'
import PublicLayout from 'components/PublicLayout'
import CreateService from 'pages/CreateService'
import VendorServiceList from 'pages/VendorServiceList'
import FavItems from 'pages/FavItems'
import Contact from 'pages/Contact'
import CreateJob from 'pages/CreateJob'
import ViewJobs from 'pages/ViewJobs'
import MyJobs from 'pages/MyJobs'
import AccountSetting from 'pages/AccountSetting'
import Wedding from 'pages/Wedding'

function App() {
  const activeTheme = useMemo(() => CustomTheme(ThemeVariantsProps.light), [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/services/:id',
          element: <ServiceList />
        },
        {
          path: '/view-service/:id',
          element: <ViewService />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/services',
          element: <Wedding />
        }
      ]
    },

    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/create-service',
          element: <CreateService />
        },
        {
          path: '/my-jobs',
          element: <MyJobs />
        },
        {
          path: '/vendor-services',
          element: <VendorServiceList />
        },
        {
          path: '/fav-services',
          element: <FavItems />
        },
        {
          path: '/create-job',
          element: <CreateJob />
        },
        {
          path: '/view-jobs',
          element: <ViewJobs />
        },
        {
          path: '/profile',
          element: <AccountSetting />
        }
      ]
    }
  ])

  return (
    <ThemeProvider theme={activeTheme}>
      <CustomToast />
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
export default App
