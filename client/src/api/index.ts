import axios from 'axios'
import { store } from 'store'
import { logout } from 'store/auth'
import { openToaster } from 'store/toast'

const BASE_URL = 'https://em-api-ca838e34c99a.herokuapp.com/api'
//const BASE_URL = 'http://localhost:8000/api'

const getToken = () => store.getState().auth.token

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // Authorization: getToken()
  }
})
//axiosInstance.defaults.headers.common['Authorization'] = getToken()

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = config.params || {}
    config.headers.Authorization = getToken()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function async(response) {
    return response
  },
  function (error) {
    store.dispatch(
      openToaster({
        type: 'error',
        message: error.response
          ? error.response.data.message
          : 'Something went wrong. Contact support team'
      })
    )

    console.log(error.response.data.statusCode, error.response.data.statusCode === 401)
    if (error.response.data.statusCode === 401) {
      logout()
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
