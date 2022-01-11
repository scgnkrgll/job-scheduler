import React from "react"
import { FormControl, MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { FormInputProps } from "./FormInputTypes"

interface FormInputDropdownProps extends FormInputProps {
  options: { label: string; value: string | number }[]
}

export const FormInputDropdown: React.FC<FormInputDropdownProps> = ({ name, control, label, options, disabled }) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <FormControl fullWidth variant="standard">
      <Controller
        render={({ field: { onChange, value }, fieldState: { invalid, isTouched, isDirty, error } }) => {
          return (
            <TextField
              select
              label={label}
              onChange={onChange}
              value={value}
              disabled={disabled}
              error={!!error}
              helperText={error?.message}
            >
              {generateSingleOptions()}
            </TextField>
          )
        }}
        control={control}
        name={name}
      />
    </FormControl>
  )
}
