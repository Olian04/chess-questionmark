import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MaterialButton,
  DialogContentText,
  TextField,
  Box,
} from '@material-ui/core';
import { isMobile } from 'react-device-detect';

import { ContainedUpdateModal } from '../mobileframe/ContainedUpdateModal';

export interface FieldValues {
  name: string;
  email: string;
  phone: string;
  team: string;
  avatar: string;
  password: string;
  newPassword: string;
}

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

interface ExtraProps extends Props {
  fieldValues: Partial<FieldValues>;
  setFieldValues: Dispatch<SetStateAction<Partial<FieldValues>>>;
  isError: boolean[];
  setIsError: Dispatch<SetStateAction<boolean[]>>;
  helperText: string[];
  setHelperText: Dispatch<SetStateAction<string[]>>;
  hasChanges: boolean;
  setHasChanges: Dispatch<SetStateAction<boolean>>;
}

const ModalContent = (props: ExtraProps) => {
  return (
    <>
      {props.dialogs.map((dialog, i) => (
        <div key={dialog.title}>
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
              error={props.isError[i]}
              helperText={props.helperText[i]}
              defaultValue={dialog.defaultValue}
              onChange={(ev) => {
                const value = ev.target.value;
                const validationError =
                  dialog.validate && dialog.validate(value);
                if (typeof validationError === 'string') {
                  props.setIsError((curr) => {
                    curr[i] = true;
                    return curr;
                  });
                  props.setHelperText((curr) => {
                    curr[i] = validationError;
                    return curr;
                  });
                }
                props.setHasChanges(true);
                props.setFieldValues({
                  ...props.fieldValues,
                  [dialog.fieldName]: value,
                });
                props.setIsError((curr) => {
                  curr[i] = false;
                  return curr;
                });
                props.setHelperText((curr) => {
                  delete curr[i];
                  return curr;
                });
              }}
            />
          </DialogContent>
        </div>
      ))}
      <DialogActions>
        <MaterialButton
          onClick={() => {
            props.setHasChanges(false);
            props.onDiscard();

            // Reset for the next time this modal is reused
            props.setFieldValues({});
            props.setIsError([]);
            props.setHelperText([]);
          }}
        >
          Cancel
        </MaterialButton>
        <MaterialButton
          disabled={!props.hasChanges}
          onClick={() => {
            if (props.isError.some((v) => v === true)) return;
            props.onSave(props.fieldValues);

            // Reset for the next time this modal is reused
            props.setFieldValues({});
            props.setIsError([]);
            props.setHelperText([]);
          }}
        >
          Save
        </MaterialButton>
      </DialogActions>
    </>
  );
};

export const UpdateFieldModal = (props: Props) => {
  const [fieldValues, setFieldValues] = useState<Partial<FieldValues>>({});
  const [isError, setIsError] = useState<boolean[]>([]);
  const [helperText, setHelperText] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const handleMobileDiscard = () => {
    setHasChanges(false);
    props.onDiscard();

    // Reset for the next time this modal is reused
    setFieldValues({});
    setIsError([]);
    setHelperText([]);
  };

  const extraProps = {
    fieldValues,
    setFieldValues,
    isError,
    setIsError,
    helperText,
    setHelperText,
    setHasChanges,
    hasChanges,
  };

  if (isMobile) {
    return (
      <Dialog
        open={props.open}
        onClose={() => {
          setHasChanges(false);
          props.onDiscard();
        }}
        aria-labelledby="form-dialog-title"
      >
        <ModalContent {...props} {...extraProps} />
      </Dialog>
    );
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <ContainedUpdateModal open={props.open} onClose={handleMobileDiscard}>
      <ModalContent {...props} {...extraProps} />
    </ContainedUpdateModal>
  );
};
