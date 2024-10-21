import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ToasterType = 'success' | 'info' | 'warning' | 'error'

export interface ToasterState {
  open: boolean
  type: ToasterType
  message: string
}

const initialState: ToasterState = {
  open: false,
  type: 'success',
  message: ''
}

const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    closeToaster(state) {
      state.open = false
      state.type = 'success'
      state.message = ''
    },
    openToaster(state, action: PayloadAction<{ type: ToasterType; message: string }>) {
      state.open = true
      state.type = action.payload.type
      state.message = action.payload.message
    }
  }
})

const toastReducer = toasterSlice.reducer
export default toastReducer
export const { openToaster, closeToaster } = toasterSlice.actions
