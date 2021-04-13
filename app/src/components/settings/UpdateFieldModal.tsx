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
  dialogs: Array<{
    title: string;
    fieldName: string;
    description: string;
    defaultValue: string;
    hint: string;
  }>;
  onSave: (value: {}) => void;
  onDiscard: () => void;
}

export const UpdateFieldModal = (props: Props) => {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState({});
  const [isError, setIsError] = useState(false);

  return (
    <Dialog
      open={props.open}
      onClose={props.onDiscard}
      aria-labelledby="form-dialog-title"
    >
      {props.dialogs.map((dialog, i) => (
        <div key={i}>
          <DialogTitle id="form-dialog-title">{dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialog.description}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label={dialog.hint}
              variant="outlined"
              color="secondary"
              fullWidth
              error={isError}
              defaultValue={dialog.defaultValue}
              onChange={(ev) => {
                const value = ev.target.value;
                setFieldValues({ ...fieldValues, [dialog.fieldName]: value });
                setIsError(false);
              }}
            />
          </DialogContent>
        </div>
      ))}
      <DialogActions>
        <MaterialButton onClick={props.onDiscard}>Cancel</MaterialButton>
        <MaterialButton
          onClick={() => {
            props.onSave(fieldValues);
          }}
        >
          Save
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
};
