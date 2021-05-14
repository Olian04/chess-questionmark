import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MaterialButton,
  DialogContentText,
  TextField,
  Box,
  Button,
  Typography,
} from '@material-ui/core';

import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 10,
    },
    fill: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'relative',
      margin: theme.spacing(1),
      pointerEvents: 'none',
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      pointerEvents: 'auto',
    },
    visible: {
      visible: 'visible',
      opacity: 1,
    },
    hidden: {
      visible: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
  })
);

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
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<Partial<FieldValues>>({});
  const [isError, setIsError] = useState<boolean[]>([]);
  const [helperText, setHelperText] = useState<string[]>([]);

  if (isMobile) {
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
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <>
      <Box
        className={clsx(
          classes.container,
          props.open ? classes.visible : classes.hidden
        )}
      >
        <Box className={classes.fill}>
          <Box
            className={clsx(
              classes.modal,
              props.open ? classes.visible : classes.hidden
            )}
          >
            {props.dialogs.map((dialog, i) => (
              <div key={i}>
                {dialog.title ? (
                  <DialogTitle id="form-dialog-title">
                    {dialog.title}
                  </DialogTitle>
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
                      setFieldValues({
                        ...fieldValues,
                        [dialog.fieldName]: value,
                      });
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
          </Box>
        </Box>
      </Box>
      <Box
        onClick={props.onDiscard}
        className={clsx(
          classes.backdrop,
          props.open ? classes.visible : classes.hidden
        )}
      />
    </>
  );
};
