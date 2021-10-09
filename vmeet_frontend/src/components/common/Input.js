import React from 'react';
import { TextField, Grid } from '@material-ui/core';

const Input = ({ name, handleChange, label, autoFocus, type }) => (
  <Grid item xs={12} sm={12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
  </Grid>
);

export default Input;