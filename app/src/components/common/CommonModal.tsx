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

const ModalContent = (props: Props) => {
  return (
    <>
      <DialogTitle onClick={props.handleClose}>{props.modal.title}</DialogTitle>
      <DialogContent dividers>
        {props.modal.content?.map((message, i) => (
          <Typography gutterBottom key={i}>
            {message}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.handleClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export const CommonModal = (props: Props) => {
  if (isMobile) {
    return (
      <Dialog onClose={props.handleClose} open={props.modal.open}>
        <ModalContent {...props} />
      </Dialog>
    );
  }
  /* When client is seen from browser, we don't want the modal to be
   * filling the whole view, but only the mobileframe
   */
  return (
    <ContainedModal open={props.modal.open} onClose={props.handleClose}>
      <ModalContent {...props} />
    </ContainedModal>
  );
};
