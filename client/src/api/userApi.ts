import axiosInstance from 'api'
import { LoginProps } from 'pages/Login'
import { SignupProps } from 'pages/Signup'
import { store } from 'store'
import { IContactUsMessage } from 'utils/interfaces'

export const URL = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/register',
  LOGOUT: 'auth/logout',
  GET_CATEGORIES: '/categories',
  POST_SERVICE: '/marketplace/service',
  GET_SERVICES: '/marketplace/services',
  GET_SERVICE_MY_SERVICES: '/marketplace/services/my',
  GET_POPULAR_SERVICES: '/marketplace/services/popular',
  GET_QUERY_SERVICES: '/marketplace/services/query',
  GET_SERVICE_DETAIL: '/marketplace/services',
  ADD_SERVICE_REVIEW: '/marketplace/services',
  POST_JOB: '/jobs',
  GET_JOBS: '/jobs',
  POPULAR_JOBS: '/jobs/latest',
  QUERY_JOBS: '/jobs/query',
  CONTACT_US: '/email/contact-us',
  SUBMIT_JOB_PROPOSAL: '/email/job-proposal',
  SUBMIT_REQUEST_PRICING: '/email/request-pricing'
}

export const loginUserApi = (userData: LoginProps) => {
  let axiosConfig = {
    method: 'post',
    url: URL.LOGIN,
    data: userData
  }
  return axiosInstance(axiosConfig)
}

export const signupUserApi = (userData: SignupProps) => {
  let axiosConfig = {
    method: 'post',
    url: URL.SIGNUP,
    data: userData
  }
  return axiosInstance(axiosConfig)
}

export const logoutUserApi = () => {
  let axiosConfig = {
    method: 'post',
    url: URL.LOGOUT,
    data: {
      accessToken: store.getState().auth.token
    }
  }
  return axiosInstance(axiosConfig)
}

export const getServiceDetailApi = (id: number | string) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_SERVICES}/${id}`
  }
  return axiosInstance(axiosConfig)
}

export const getAllCategoriesApi = ({ parent = '', sub = false }) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_CATEGORIES}?parent=${parent}&sub=${sub}`
  }
  return axiosInstance(axiosConfig)
}

export const getAllCategoriesWithSubApi = () => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_CATEGORIES}/all`
  }
  return axiosInstance(axiosConfig)
}

// services
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNewServiceApi = (data: any) => {
  let axiosConfig = {
    method: 'post',
    url: URL.POST_SERVICE,
    data
  }
  return axiosInstance(axiosConfig)
}

export const getMyServices = () => {
  let axiosConfig = {
    method: 'get',
    url: URL.GET_SERVICE_MY_SERVICES
  }
  return axiosInstance(axiosConfig)
}

export const getPopularServices = () => {
  let axiosConfig = {
    method: 'get',
    url: URL.GET_POPULAR_SERVICES
  }
  return axiosInstance(axiosConfig)
}

export const getQueryServices = (subcategorySlug: string) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_QUERY_SERVICES}?subcategory=${subcategorySlug}`
  }
  return axiosInstance(axiosConfig)
}

export const getQueryServicesByCategory = (categorySlug: string) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_QUERY_SERVICES}?category=${categorySlug}`
  }
  return axiosInstance(axiosConfig)
}
export const addServiceReview = (review: any, serviceId: string) => {
  let axiosConfig = {
    method: 'post',
    url: `${URL.ADD_SERVICE_REVIEW}/${serviceId}/review`,
    data: review
  }
  return axiosInstance(axiosConfig)
}

export const getServiceDetail = (serviceId: string) => {
  let axiosConfig = {
    method: 'get',
    url: `${URL.GET_SERVICE_DETAIL}/${serviceId}/details`
  }
  return axiosInstance(axiosConfig)
}

export const createJobApi = (data: unknown) => {
  const config = {
    method: 'post',
    url: URL.POST_JOB,
    data
  }
  return axiosInstance(config)
}

export const getMyJobs = () => {
  const config = {
    mathod: 'get',
    url: URL.GET_JOBS
  }
  return axiosInstance(config)
}

export const getPopularJobs = () => {
  const config = {
    method: 'get',
    url: URL.POPULAR_JOBS
  }
  return axiosInstance(config)
}

export const queryJobs = () => {
  const config = {
    method: 'get',
    url: URL.QUERY_JOBS
  }
  return axiosInstance(config)
}

// contact us
export const contactUs = (data: IContactUsMessage) => {
  const config = {
    method: 'post',
    url: URL.CONTACT_US,
    data: data
  }
  return axiosInstance(config)
}

export const contactJobProposal = (data: any) => {
  const config = {
    method: 'post',
    url: URL.SUBMIT_JOB_PROPOSAL,
    data
  }
  return axiosInstance(config)
}

export const contactRequestPricing = (data: any) => {
  const config = {
    method: 'post',
    url: URL.SUBMIT_REQUEST_PRICING,
    data
  }
  return axiosInstance(config)
}
