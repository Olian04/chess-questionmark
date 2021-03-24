import React from 'react';
import { TextFieldProps, TextField as BaseTextField } from '@material-ui/core';

export const RoundedTextField = (props: TextFieldProps) => {
  return (
    <BaseTextField
      InputProps={{
        disableUnderline: true,
      }}
      style={{ borderRadius: 7, overflow: 'hidden' }}
      {...props}
    />
  );
};
