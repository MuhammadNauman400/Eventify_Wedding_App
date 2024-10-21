import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { string } from 'yup'

type UserRole = 'buyer' | 'vendor' | ''

interface Address {
  country: string
  city: string
}

interface AccessToken {
  token: string
  expires: string
}

interface Tokens {
  accessToken: AccessToken
}

export interface AuthState {
  name: string
  email: string
  address: Address
  status: string
  role: UserRole
  id: string
  token: string
  isAuthenticated: boolean
  phone: string
}

interface AuthData {
  status: string
  user: AuthState
  tokens: Tokens
}
const initialState: AuthState = {
  name: '',
  email: '',
  address: {
    country: '',
    city: ''
  },
  role: '',
  status: '',
  id: '',
  token: '',
  isAuthenticated: false,
  phone: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      const { user, tokens, status } = action.payload
      state.id = user.id
      state.email = user.email
      state.name = user.name
      state.address = user.address
      state.token = tokens.accessToken.token
      state.role = user.role
      state.status = status
      state.isAuthenticated = true
      state.phone = user.role === 'vendor' ? user.phone : ''

    },
    logout: state => {
      state.id = ''
      state.email = ''
      state.name = ''
      state.address = {
        country: '',
        city: ''
      }
      state.token = ''
      state.role = ''
      state.status = ''
      state.isAuthenticated = false
    }
  }
})

export const { setUser, logout } = authSlice.actions
const AuthReducer = authSlice.reducer
export default AuthReducer
