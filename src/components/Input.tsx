import React from 'react'
import TextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

type Props = TextFieldProps

const TextInput: React.FC<Props> = ({ fullWidth = true, variant = 'outlined', ...rest }) => {
  return <TextField fullWidth={fullWidth} variant={variant} {...rest} />
}

const PasswordInput: React.FC<TextFieldProps> = (props) => {
  const [show, setShow] = React.useState(false)

  return (
    <TextField
      {...props}
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShow((s) => !s)}
              edge="end"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export { TextInput, PasswordInput }
