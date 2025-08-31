import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AlertColor } from '@mui/material/Alert'

export type AlertState = {
  open: boolean
  message: string
  severity: AlertColor
}

const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'info',
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{ message: string; severity?: AlertColor }>) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity || 'info'
    },
    showSuccess: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.severity = 'success'
    },
    showError: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.severity = 'error'
    },
    showWarning: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.severity = 'warning'
    },
    showInfo: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.severity = 'info'
    },
    closeAlert: (state) => {
      state.open = false
    },
  },
})

export const { showAlert, showSuccess, showError, showWarning, showInfo, closeAlert } = alertSlice.actions
export default alertSlice.reducer
