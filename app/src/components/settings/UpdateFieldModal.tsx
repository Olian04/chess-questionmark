import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MaterialButton,
  DialogContentText,
  TextField,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  open: boolean;
  title: string;
  description: string;
  hint: string;
  value?: string;
  onSave: (value: string) => void;
  onDiscard: () => void;
}

export const UpdateFieldModal = (props: Props) => {
  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState('');
  const [isError, setIsError] = useState(false);

  return (
    <Dialog
      open={props.open}
      onClose={props.onDiscard}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={props.hint}
          variant="outlined"
          color="secondary"
          fullWidth
          error={isError}
          defaultValue={props.value}
          onChange={(ev) => {
            const value = ev.target.value;
            setFieldValue(value);
            setIsError(false);
          }}
        />
      </DialogContent>
      <DialogActions>
        <MaterialButton onClick={props.onDiscard}>Cancel</MaterialButton>
        <MaterialButton
          onClick={() => {
            if (fieldValue.trim().length === 0) {
              setIsError(true);
              return;
            }
            props.onSave(fieldValue);
          }}
        >
          Save
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
};
