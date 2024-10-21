import { useField } from 'formik'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { Box, Typography } from '@mui/material'

interface InputFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  label: string
  toolTipTitle?: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, toolTipTitle, ...props }) => {
  const [field, meta] = useField(props.name)

  return (
    <Tooltip title={toolTipTitle || ''} arrow disableInteractive placement='top'>
      <Box>
        <TextField
          fullWidth
          error={!!meta.error && meta.touched}
          autoComplete='false'
          id='outlined-basic'
          label={label}
          {...field}
          {...props}
          variant='outlined'
          type={props.type || 'string'}
          autoCorrect='false'
        />
        {meta.error && meta.touched && <Typography variant='error'>{meta.error}</Typography>}
      </Box>
    </Tooltip>
  )
}
