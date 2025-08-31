import React from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAlertState, useAlertActions } from '../hooks/useAlertRedux'

const GlobalAlert: React.FC = () => {
  const alert = useAlertState()
  const { closeAlert } = useAlertActions()

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={closeAlert} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalAlert
