import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { showAlert, showSuccess, showError, showWarning, showInfo, closeAlert } from '../store/alertSlice'
import type { AlertColor } from '@mui/material/Alert'

export const useAlertActions = () => {
  const dispatch = useDispatch<AppDispatch>()

  return {
    showAlert: (message: string, severity?: AlertColor) =>
      dispatch(showAlert({ message, severity })),
    showSuccess: (message: string) => dispatch(showSuccess(message)),
    showError: (message: string) => dispatch(showError(message)),
    showWarning: (message: string) => dispatch(showWarning(message)),
    showInfo: (message: string) => dispatch(showInfo(message)),
    closeAlert: () => dispatch(closeAlert()),
  }
}

export const useAlertState = () => {
  return useSelector((state: RootState) => state.alert)
}
