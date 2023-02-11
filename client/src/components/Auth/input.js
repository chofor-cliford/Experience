import React from 'react';
import {  Visibility, VisibilityOff } from '@material-ui/icons';
import { InputAdornment, IconButton, TextField, Grid } from '@material-ui/core';

const Input = ({half, name, handleChange, label, autoFocus, type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={{
          endAdornment:( 
            name === 'password' &&
            <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword}>
                    {type === 'password'? <Visibility />: <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )}}
    />
    </Grid>
  )
}

export default Input;