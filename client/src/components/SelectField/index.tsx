import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useField } from 'formik'
import { Tooltip, Typography } from '@mui/material'

interface Option {
  title: string
  key: string | number
}
interface SelectFieldProps {
  name: string
  options: Option[]
  toolTipTitle?: string
  defaultSelected?: string | number
  label: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  name,
  label,
  toolTipTitle,
  defaultSelected,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(name)

  return (
    <Tooltip title={toolTipTitle}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
          <Select
            fullWidth
            error={meta.error && meta.touched ? true : false}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label={label}
            {...field}
            {...props}
            onChange={onChange || field.onChange}
            name={field.name}
            value={field.value || defaultSelected || ''}
          >
            {options.map((data, i) => {
              return (
                <MenuItem key={i} value={data['key']}>
                  {data['title']}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        {meta.error && meta.touched && <Typography variant='error'>{meta.error}</Typography>}
      </Box>
    </Tooltip>
  )
}
