import React from 'react';
import {
  BaseTextFieldProps,
  TextField as BaseTextField,
} from '@material-ui/core';

export const RoundedTextField = (props: BaseTextFieldProps) => {
  return (
    <BaseTextField
      {...props}
      InputProps={{
        disableUnderline: true,
      }}
      style={{ borderRadius: 7, overflow: 'hidden' }}
    />
  );
};
