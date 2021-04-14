import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface Props {
  winner: string;
  open: boolean;
  onClick: () => void;
}

export const EndOfGame = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onClick}>
      <DialogContent>
        <DialogContentText>winner is {props.winner}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClick}>Return to profile!</Button>
      </DialogActions>
    </Dialog>
  );
};
