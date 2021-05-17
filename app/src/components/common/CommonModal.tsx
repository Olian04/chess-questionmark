import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { IModal } from '../../types/modal';
import { ContainedModal } from '../mobileframe/ContainedModal';

interface Props {
  handleClose: () => void;
  modal: IModal;
}

const ModalTitle = (props: Props) => {
  return (
    <DialogTitle onClick={props.handleClose}>{props.modal.title}</DialogTitle>
  );
};

const ModalAction = (props: Props) => {
  return (
    <DialogActions>
      <Button autoFocus onClick={props.handleClose}>
        Close
      </Button>
    </DialogActions>
  );
};

// Dry compliant
const ModalContent = (props: Props) => {
  return (
    <DialogContent dividers>
      {props.modal.content?.map((message, i) => (
        <Typography gutterBottom key={i}>
          {message}
        </Typography>
      ))}
    </DialogContent>
  );
};

export const CommonModal = (props: Props) => {
  if (isMobile) {
    return (
      <Dialog
        style={{ marginTop: 55, marginBottom: 55 }}
        onClose={props.handleClose}
        open={props.modal.open}
      >
        <ModalTitle {...props} />
        <ModalContent {...props} />
        <ModalAction {...props} />
      </Dialog>
    );
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <ContainedModal open={props.modal.open} onClose={props.handleClose}>
      <ModalTitle {...props} />
      <ModalContent {...props} />
      <ModalAction {...props} />
    </ContainedModal>
  );
};
