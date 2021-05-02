import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../state/modal';

export const CommonModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };
  return (
    <Dialog onClose={handleClose} open={modal.open}>
      <DialogTitle onClick={handleClose}>{modal.title}</DialogTitle>
      <DialogContent dividers>
        {modal.content?.map((message, i) => (
          <Typography gutterBottom key={i}>
            {message}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
