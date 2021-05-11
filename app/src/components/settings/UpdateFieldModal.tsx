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
import { User } from '../../types/User';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fill: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      position: 'relative',
      margin: theme.spacing(1),
    },
    modal: {
      backgroundColor: theme.palette.background.paper,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
    },
    visible: {
      visible: 'visible',
      opacity: 1,
      pointerEvents: 'auto',
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
};

interface Props {
  open: boolean;
  dialogs: Array<{
    title: string;
    fieldName: keyof FieldValues;
    description: string;
    defaultValue: string;
    hint: string;
  }>;
  onSave: (value: Partial<FieldValues>) => void;
  onDiscard: () => void;
}

export const UpdateFieldModal = (props: Props) => {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<Partial<FieldValues>>({});
  const [isError, setIsError] = useState(false);

  if (isMobile) {
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
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <Box
      className={clsx(
        classes.backdrop,
        props.open ? classes.visible : classes.hidden
      )}
      onClick={props.onDiscard}
    >
      <Box className={classes.fill}>
        <Box className={classes.modal}>
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
                    setFieldValues({
                      ...fieldValues,
                      [dialog.fieldName]: value,
                    });
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
        </Box>
      </Box>
    </Box>
  );
};
