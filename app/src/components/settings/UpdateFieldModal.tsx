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

type FieldValues = {
  name?: string;
  email?: string;
  phone?: string;
  team?: string;
  avatar?: string;
  password?: string;
  newPassword?: string;
};

export interface DialogProps {
  fieldType: 'text' | 'password';
  fieldName: keyof FieldValues;
  hint: string;
  title?: string;
  description?: string;
  defaultValue?: string;
  validate?: (value: string) => string | null;
}

interface Props {
  open: boolean;
  dialogs: DialogProps[];
  onSave: (value: Partial<FieldValues>) => void;
  onDiscard: () => void;
}

export const UpdateFieldModal = (props: Props) => {
  const [fieldValues, setFieldValues] = useState<Partial<FieldValues>>({});
  const [isError, setIsError] = useState<boolean[]>([]);
  const [helperText, setHelperText] = useState<string[]>([]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onDiscard}
      aria-labelledby="form-dialog-title"
    >
      {props.dialogs.map((dialog, i) => (
        <div key={i}>
          {dialog.title ? (
            <DialogTitle id="form-dialog-title">{dialog.title}</DialogTitle>
          ) : null}
          <DialogContent>
            {dialog.description ? (
              <DialogContentText>{dialog.description}</DialogContentText>
            ) : null}
            <TextField
              autoFocus
              margin="dense"
              label={dialog.hint}
              variant="outlined"
              color="secondary"
              type={dialog.fieldType}
              fullWidth
              error={isError[i]}
              helperText={helperText[i]}
              defaultValue={dialog.defaultValue}
              onChange={(ev) => {
                const value = ev.target.value;
                const validationError =
                  dialog.validate && dialog.validate(value);
                if (typeof validationError === 'string') {
                  setIsError((curr) => {
                    curr[i] = true;
                    return curr;
                  });
                  setHelperText((curr) => {
                    curr[i] = validationError;
                    return curr;
                  });
                }
                setFieldValues({ ...fieldValues, [dialog.fieldName]: value });
                setIsError((curr) => {
                  curr[i] = false;
                  return curr;
                });
                setHelperText((curr) => {
                  delete curr[i];
                  return curr;
                });
              }}
            />
          </DialogContent>
        </div>
      ))}
      <DialogActions>
        <MaterialButton onClick={props.onDiscard}>Cancel</MaterialButton>
        <MaterialButton
          onClick={() => {
            if (isError.some((v) => v === true)) return;
            props.onSave(fieldValues);
          }}
        >
          Save
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
};
